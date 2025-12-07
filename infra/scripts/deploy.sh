#!/bin/bash
set -e

echo "=========================================="
echo "🚀 deploy via SSM"
echo "=========================================="

# Validar variáveis necessárias
if [ -z "$EC2_INSTANCE_ID" ]; then
  echo "❌ Erro: EC2_INSTANCE_ID não está definida"
  exit 1
fi

if [ -z "$AWS_REGION" ]; then
  echo "❌ Erro: AWS_REGION não está definida"
  exit 1
fi

if [ -z "$AWS_ACCOUNT_ID" ]; then
  echo "❌ Erro: AWS_ACCOUNT_ID não está definida"
  exit 1
fi

echo "📍 Instance ID: $EC2_INSTANCE_ID"
echo "🌎 Região: $AWS_REGION"
echo "📦 Account ID: $AWS_ACCOUNT_ID"
echo ""

# Enviar comando via SSM
echo "📡 Envio de comando de deploy..."

COMMAND_ID=$(aws ssm send-command \
  --instance-ids "$EC2_INSTANCE_ID" \
  --document-name "AWS-RunShellScript" \
  --parameters 'commands=[
    "echo \"========================================\"",
    "echo \"📦 Atualizaçao da aplicação...\"",
    "echo \"========================================\"",
    "cd /home/ec2-user/app || exit 1",
    "echo \"🔐 Login no ECR...\"",
    "aws ecr get-login-password --region '"$AWS_REGION"' | docker login --username AWS --password-stdin '"$AWS_ACCOUNT_ID"'.dkr.ecr.'"$AWS_REGION"'.amazonaws.com",
    "echo \"⬇️ Novas imagens...\"",
    "export AWS_ACCOUNT_ID='"$AWS_ACCOUNT_ID"'",
    "export AWS_REGION='"$AWS_REGION"'",
    "sudo docker-compose pull --ignore-pull-failures",
    "echo \" Parando e removendo containers antigos...\"",
    "sudo docker-compose down --remove-orphans",
    "echo \"🔄 Reinicio de containers...\"",
    "sudo docker-compose up -d --force-recreate",
    "echo \"🧹 Limpeza de imagens antigas...\"",
    "sudo docker image prune -f",
    "echo \"========================================\"",
    "echo \"✅ Deploy concluído com sucesso!\"",
    "echo \"========================================\"",
    "sudo docker ps"
  ]' \
  --comment "Deploy automático via CodeBuild" \
  --region "$AWS_REGION" \
  --output text \
  --query "Command.CommandId")

if [ -z "$COMMAND_ID" ]; then
  echo "❌ Erro ao enviar comando SSM"
  exit 1
fi

echo "✅ Comando SSM enviado: $COMMAND_ID"
echo ""


echo "⏳ Aguardando execução na EC2..."
aws ssm wait command-executed \
  --command-id "$COMMAND_ID" \
  --instance-id "$EC2_INSTANCE_ID" \
  --region "$AWS_REGION" \
  2>/dev/null || true


sleep 5


echo ""
echo "=========================================="
echo "📋 Resultado da execução:"
echo "=========================================="

STATUS=$(aws ssm get-command-invocation \
  --command-id "$COMMAND_ID" \
  --instance-id "$EC2_INSTANCE_ID" \
  --region "$AWS_REGION" \
  --query "Status" \
  --output text)

OUTPUT=$(aws ssm get-command-invocation \
  --command-id "$COMMAND_ID" \
  --instance-id "$EC2_INSTANCE_ID" \
  --region "$AWS_REGION" \
  --query "StandardOutputContent" \
  --output text)

ERROR=$(aws ssm get-command-invocation \
  --command-id "$COMMAND_ID" \
  --instance-id "$EC2_INSTANCE_ID" \
  --region "$AWS_REGION" \
  --query "StandardErrorContent" \
  --output text)

echo "$OUTPUT"

if [ "$STATUS" == "Success" ]; then
  echo ""
  echo "=========================================="
  echo "✅ Deploy executado com sucesso!"
  echo "=========================================="
  exit 0
else
  echo ""
  echo "=========================================="
  echo "❌ Deploy falhou com status: $STATUS"
  echo "=========================================="
  if [ ! -z "$ERROR" ]; then
    echo "Erros:"
    echo "$ERROR"
  fi
  exit 1
fi
