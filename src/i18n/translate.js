import about from './about.en.json';
import home from './home.en.json';
import chatbot from './chatbot.en.json';
import pages from './pages.en.json';
import profiles from './profiles.en.json';
import posts from './posts.en.json';
import ja from './ja.json';
import zh from './zh.json';

const normalize = value => value.replace(/\s+/g, ' ').trim();
const english = Object.fromEntries(Object.entries({ ...about, ...home, ...chatbot, ...pages, ...profiles, ...posts }).map(([key, value]) => [normalize(key), value]));
const japanese = Object.fromEntries(Object.entries(ja).map(([key, value]) => [normalize(key), value]));
const chinese = Object.fromEntries(Object.entries(zh).map(([key, value]) => [normalize(key), value]));

export function translate(language, value, ...values) {
  // Tagged templates preserve dynamic values while translating surrounding copy.
  if (Array.isArray(value) && Object.hasOwn(value, 'raw')) {
    return value.map((part, index) => translate(language, part) + (index < values.length ? translate(language, values[index]) : '')).join('');
  }
  if (typeof value !== 'string' || language === 'ko') return value;

  let dict = null;
  if (language === 'en') dict = english;
  else if (language === 'ja') dict = japanese;
  else if (language === 'zh') dict = chinese;

  const normalized = normalize(value);
  let translated = dict ? dict[normalized] : undefined;

  // Fallback to English if Japanese or Chinese translation is missing for this key
  if (translated === undefined && language !== 'en') {
    translated = english[normalized];
  }

  if (translated !== undefined) return value.match(/^\s*/)[0] + translated + value.match(/\s*$/)[0];
  return value;
}

