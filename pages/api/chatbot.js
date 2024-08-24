import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: "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",
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for a crypto swap platform. Your role is to provide helpful, conversational responses about how users can easily swap cryptocurrencies. Respond in a simple and clear format, with each step on a new line. Avoid using asterisks or other formatting symbols, and use plain text with line breaks where necessary. The steps of converting crypto is 1. connect with the connect wallet button below 2. the cryptocurrency will be automatically handled by the AI, just one click and one prompt to swap. 3. swap complete just as easy as this. After prompting the steps, tell the user that there might be a better rate for swapping in 2 hours. Ask the user whether that they want to wait or not.`,        },
        { role: 'user', content: message }
      ],
      max_tokens: 150,
    });

    const aiResponse = response.choices[0].message.content.trim();
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}
