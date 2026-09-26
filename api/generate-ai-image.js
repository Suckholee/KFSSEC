import path from 'path';
import fs from 'fs';

// Auto-load .env or .env.local if available in local Node runtime
try {
  if (process.loadEnvFile) {
    if (fs.existsSync('.env.local')) {
      process.loadEnvFile('.env.local');
    } else if (fs.existsSync('.env')) {
      process.loadEnvFile('.env');
    } else {
      const altEnv = path.resolve(process.cwd(), '../gahoseokho/.env.local');
      if (fs.existsSync(altEnv)) {
        process.loadEnvFile(altEnv);
      }
    }
  }
} catch (e) {
  // Ignore in environments where loadEnvFile is not supported
}

const getOpenAiKey = () => process.env.OPENAI_API_KEY || '';
const getGeminiKey = () => process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || '';

/**
 * Builds an enhanced cinematic photography prompt from Korean or English input
 */
function enhanceBannerPrompt(userPrompt, style = 'masters') {
  const text = (userPrompt || '').trim();

  let contextStyle = style;
  if (text.includes('카페') || text.includes('커피') || text.includes('바리스타') || text.includes('디저트') || text.includes('베이커리')) {
    contextStyle = 'cafe';
  } else if (text.includes('스테이크') || text.includes('고기') || text.includes('불쇼') || text.includes('셰프') || text.includes('구이')) {
    contextStyle = 'chef';
  } else if (text.includes('소스') || text.includes('발효') || text.includes('장류') || text.includes('한식') || text.includes('비법')) {
    contextStyle = 'sauce';
  } else if (text.includes('매장') || text.includes('창업') || text.includes('프랜차이즈') || text.includes('자금') || text.includes('식당')) {
    contextStyle = 'restaurant';
  } else if (text.includes('명장') || text.includes('명인') || text.includes('교수') || text.includes('두려운가')) {
    contextStyle = 'masters';
  }

  let basePrompt = '';
  switch (contextStyle) {
    case 'chef':
      basePrompt = 'A breathtaking cinematic wide-angle commercial shot of a renowned Korean culinary master chef searing a steak with dynamic golden flames in a luxury dark kitchen studio, dramatic rim lighting, embers in air, hyper-detailed, 8k resolution, award-winning culinary editorial photograph';
      break;
    case 'cafe':
      basePrompt = 'A cinematic ultra-wide aesthetic photograph of an upscale boutique coffee cafe and dessert bar, barista pour-over espresso machine with delicate steam, warm golden sunlight streaming through glass, warm wood and concrete interior, 8k resolution, minimalist commercial photo';
      break;
    case 'sauce':
      basePrompt = 'A cinematic wide angle shot of a Korean master culinary artisan workshop, bubbling dark rich savory sauce in a heated copper pot, traditional onggi earthenware jars in background, warm amber spotlight, steam rising, 8k photorealistic commercial quality';
      break;
    case 'restaurant':
      basePrompt = 'A cinematic wide angle photograph of a prestigious fine-dining restaurant dining hall, elegant table setup with crystal wine glasses, warm ambient golden lighting, luxurious modern architectural atmosphere, shallow depth of field, 8k commercial photo';
      break;
    case 'masters':
    default:
      basePrompt = 'A cinematic ultra-wide portrait background of elite Korean culinary master chefs in clean black and white chef uniforms, prestigious luxury culinary academy kitchen background, warm golden halo rim lighting, dark moody atmospheric tones, 8k ultra sharp photography';
      break;
  }

  if (text && text.length > 5) {
    return `${basePrompt}. Specific theme: ${text}. Highly detailed, photorealistic, cinematic lighting, 8k, ultra-wide aspect ratio banner background.`;
  }
  return basePrompt;
}

/**
 * Generate using Google Gemini (gemini-2.5-flash-image)
 */
async function generateWithGemini(promptText) {
  const geminiKey = getGeminiKey();
  if (!geminiKey) {
    throw new Error('Google Gemini API 키가 설정되지 않았습니다.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${geminiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Generate a high quality, ultra-wide cinematic banner background photograph for a luxury culinary business website: ${promptText}`
          }
        ]
      }
    ]
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  const parts = json.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData && p.inlineData.data);

  if (!imagePart) {
    // If flash-image didn't return an image, attempt gemini-3-pro-image fallback
    return await generateWithGeminiPro(promptText);
  }

  const mime = imagePart.inlineData.mimeType || 'image/png';
  return `data:${mime};base64,${imagePart.inlineData.data}`;
}

/**
 * Fallback to gemini-3-pro-image
 */
async function generateWithGeminiPro(promptText) {
  const geminiKey = getGeminiKey();
  if (!geminiKey) {
    throw new Error('Google Gemini API 키가 설정되지 않았습니다.');
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image:generateContent?key=${geminiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Generate a photorealistic ultra-wide banner background image: ${promptText}`
          }
        ]
      }
    ]
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini Pro Image API error (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  const parts = json.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((p) => p.inlineData && p.inlineData.data);

  if (!imagePart) {
    throw new Error('Gemini did not return an image inlineData payload.');
  }

  const mime = imagePart.inlineData.mimeType || 'image/png';
  return `data:${mime};base64,${imagePart.inlineData.data}`;
}

/**
 * Generate using OpenAI (gpt-image-1)
 */
async function generateWithOpenAI(promptText) {
  const openAiKey = getOpenAiKey();
  if (!openAiKey) {
    throw new Error('OpenAI API 키가 설정되지 않았습니다.');
  }

  const endpoint = 'https://api.openai.com/v1/images/generations';

  const payload = {
    model: 'gpt-image-1',
    prompt: promptText,
    n: 1,
    size: '1024x1024'
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openAiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  const item = json.data?.[0];

  if (!item) {
    throw new Error('OpenAI returned empty data array.');
  }

  if (item.b64_json) {
    return `data:image/png;base64,${item.b64_json}`;
  }

  if (item.url) {
    return item.url;
  }

  throw new Error('No b64_json or url found in OpenAI response.');
}

/**
 * Main Controller Handler for both Express server and Vercel Serverless Function
 */
export async function handleGenerateAiImage(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = req.body || {};
    const { prompt = '', model = 'openai', style = 'masters' } = body;

    console.log(`[AI Image Request] Model: ${model}, Style: ${style}, Prompt: "${prompt}"`);

    const enhancedPrompt = enhanceBannerPrompt(prompt, style);
    let imageUrl = '';
    let usedModel = model;

    if (model === 'gemini') {
      try {
        imageUrl = await generateWithGemini(enhancedPrompt);
      } catch (geminiErr) {
        console.warn('Gemini generation failed, falling back to OpenAI:', geminiErr.message);
        imageUrl = await generateWithOpenAI(enhancedPrompt);
        usedModel = 'openai (fallback)';
      }
    } else {
      // Default to OpenAI
      try {
        imageUrl = await generateWithOpenAI(enhancedPrompt);
      } catch (openaiErr) {
        console.warn('OpenAI generation failed, falling back to Gemini:', openaiErr.message);
        imageUrl = await generateWithGemini(enhancedPrompt);
        usedModel = 'gemini (fallback)';
      }
    }

    return res.status(200).json({
      success: true,
      imageUrl,
      modelUsed: usedModel,
      prompt: prompt,
      enhancedPrompt: enhancedPrompt
    });
  } catch (error) {
    console.error('[AI Image Generation Error]:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Image generation failed. Please try again.'
    });
  }
}

export default function handler(req, res) {
  return handleGenerateAiImage(req, res);
}
