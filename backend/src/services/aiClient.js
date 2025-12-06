const { InferenceClient  } = require('@huggingface/inference');

const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);


async function generateArticle(topic) {
  try {

    const response = await client.chatCompletion({
      model: 'meta-llama/Llama-3.1-8B-Instruct',
      messages: [
        {
          role: 'user',
          content: `Write a detailed blog article about: ${topic}

            Please provide:
            1. A catchy title
            2. Well-structured content with introduction, main points, and conclusion
             Format:
                  - First line: only the article title (no "Title:" label, no asterisks)
            - Following lines: the article content
    
              Example:
                  The Amazing World of Coffee
              Coffee is one of the most popular beverages...`
        }
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const generatedText = response.choices[0].message.content.trim();

    const lines = generatedText.split('\n').filter(line => line.trim());

    // Remove vários padrões comuns do primeiro line (título)
    let title = lines[0] || `Article about ${topic}`;
    title = title
        .replace(/^\*{1,3}Title:\*{1,3}\s*/i, '')
        .replace(/^\*{1,3}(.*?)\*{1,3}$/, '$1')
        .replace(/^Title:\s*/i, '')
        .replace(/^#{1,6}\s*/, '')
        .replace(/^["']|["']$/g, '')
        .trim();

    const content = lines.slice(1).join('\n').trim() || generatedText;



    return {
      title,
      body: content || generatedText,
      topic
    };
  } catch (error) {
    console.error('❌ Error generating article:', error.message);
    console.log('⚠️ Using fallback article generation');
    return generateSimpleArticle(topic);
  }
}

/**
 * Fallback: gera artigo simples sem AI
 */
function generateSimpleArticle(topic) {
  return {
    title: `Understanding ${topic}`,
    body: `This is an article about ${topic}. 
    
${topic} is an interesting subject that deserves attention. In this article, we'll explore various aspects of ${topic} and discuss its importance.

 Introduction
${topic} has become increasingly relevant in today's world. Many experts believe that understanding ${topic} is crucial.

 Key Points
- ${topic} plays a vital role
- Understanding ${topic} helps in many ways
- The future of ${topic} looks promising

 Conclusion
In conclusion, ${topic} is worth studying and understanding better.`,
    topic
  };
}

// Exporta ambas as funções
module.exports = {
  generateArticle,
  generateSimpleArticle
};

console.log('✅ AI Service loaded successfully');
