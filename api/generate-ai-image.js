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

const copyPrompt = (userPrompt) => `당신은 한국외식창업교육원 웹사이트의 배너 카피라이터입니다.
다음 입력은 배너 제작을 위한 내용 설명입니다. 입력 문장을 제목에 그대로 복사하지 마세요.
핵심 주제와 분위기를 반영해 자연스럽고 완결된 한국어 광고 문구를 만드세요.
headline: 공백 포함 24자 이하의 짧고 선명한 제목. 문장 중간에서 끝나지 않아야 합니다.
subtitle: 공백 포함 52자 이하의 한 문장. 제목을 보충하고 입력 내용에 구체적으로 맞아야 합니다.
badge: 공백 포함 18자 이하의 짧은 주제 표시.
입력에 없는 경력, 인원, 성과, 자격, 금액 등의 사실을 지어내지 마세요.
JSON 객체로 headline, subtitle, badge 문자열만 반환하세요.
제작 내용: ${userPrompt}`;

function parseBannerCopy(raw) {
  const copy = JSON.parse(raw);
  const limits = { headline: 24, subtitle: 52, badge: 18 };
  for (const [field, maxLength] of Object.entries(limits)) {
    if (typeof copy[field] !== 'string' || !copy[field].trim() || copy[field].trim().length > maxLength) {
      throw new Error(`Generated banner ${field} is missing or too long.`);
    }
    copy[field] = copy[field].trim();
  }
  return { headline: copy.headline, subtitle: copy.subtitle, badge: copy.badge };
}

async function generateCopyWithGemini(prompt) {
  const geminiKey = getGeminiKey();
  if (!geminiKey) throw new Error('Google Gemini API 키가 설정되지 않았습니다.');
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiKey },
    body: JSON.stringify({
      contents: [{ parts: [{ text: copyPrompt(prompt) }] }],
      generationConfig: { responseMimeType: 'application/json' },
    }),
  });
  if (!response.ok) throw new Error(`Gemini copy API error (${response.status})`);
  const json = await response.json();
  return parseBannerCopy(json.candidates?.[0]?.content?.parts?.find((part) => part.text)?.text || '');
}

async function generateCopyWithOpenAI(prompt) {
  const openAiKey = getOpenAiKey();
  if (!openAiKey) throw new Error('OpenAI API 키가 설정되지 않았습니다.');
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${openAiKey}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: copyPrompt(prompt) }],
      response_format: { type: 'json_object' },
    }),
  });
  if (!response.ok) throw new Error(`OpenAI copy API error (${response.status})`);
  const json = await response.json();
  return parseBannerCopy(json.choices?.[0]?.message?.content || '');
}

async function generateBannerCopy(prompt, model) {
  try {
    return await (model === 'gemini' ? generateCopyWithGemini(prompt) : generateCopyWithOpenAI(prompt));
  } catch (error) {
    console.warn('Selected copy model failed, trying the other provider:', error.message);
    return await (model === 'gemini' ? generateCopyWithOpenAI(prompt) : generateCopyWithGemini(prompt));
  }
}

/** Keep the user's subject and scene as the source of truth. The style is only art direction. */
function enhanceBannerPrompt(userPrompt, style = 'masters') {
  const styleHints = {
    masters: 'premium editorial photography, dignified composition, subtle gold accents',
    chef: 'dynamic cinematic lighting, vivid food detail, energetic composition',
    sauce: 'warm artisan atmosphere, rich textures, amber lighting',
    cafe: 'warm natural light, inviting lifestyle photography, refined colors',
    restaurant: 'modern architectural photography, welcoming atmosphere, elegant lighting',
  };

  return `Create an original website hero banner photograph based on this user request: ${userPrompt.trim()}.
The user's requested subject, setting, people, objects, colors and mood take priority. Do not substitute a generic culinary scene.
Art direction if it does not conflict with the request: ${styleHints[style] || styleHints.masters}.
Compose an ultra-wide 2296:640 banner with the main subject clearly visible and enough space near the center for a separately added headline.
Photorealistic, polished commercial quality. No text, letters, logos, watermarks, UI, borders or captions in the image.`;
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
            text: promptText
          }
        ]
      }
    ],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '21:9' } }
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
            text: promptText
          }
        ]
      }
    ],
    generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '21:9' } }
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
    size: '1536x1024'
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

    if (typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ success: false, message: '배너 내용을 입력해 주세요.' });
    }
    if (prompt.length > 2000) {
      return res.status(400).json({ success: false, message: '프롬프트는 2000자 이하로 입력해 주세요.' });
    }

    console.log(`[AI Image Request] Model: ${model}, Style: ${style}, Prompt: "${prompt}"`);

    const bannerCopy = await generateBannerCopy(prompt, model);
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
      bannerCopy,
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
