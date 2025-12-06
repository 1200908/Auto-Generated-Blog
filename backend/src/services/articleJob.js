const cron = require('node-cron');
const { generateArticle } = require('./aiClient');
const Article = require('../models/article');


cron.schedule('0 0 * * *', async () => {
    try {
        const topic = "Daily News of the peace in the world";
        const newArticle = await generateArticle(topic);

        await Article.create({
            title: newArticle.title,
            body: newArticle.body,
            topic: topic
        });

        console.log('✅ Novo artigo gerado e salvo no banco!');
    } catch (error) {
        console.error('❌ Erro ao gerar artigo:', error);
    }
});
