import about from './about.en.json';
import home from './home.en.json';
import chatbot from './chatbot.en.json';
import pages from './pages.en.json';
import profiles from './profiles.en.json';
import posts from './posts.en.json';

const normalize = value => value.replace(/\s+/g, ' ').trim();
const english = Object.fromEntries(Object.entries({ ...about, ...home, ...chatbot, ...pages, ...profiles, ...posts }).map(([key, value]) => [normalize(key), value]));

export function translate(language, value, ...values) {
  // Tagged templates preserve dynamic values while translating surrounding copy.
  if (Array.isArray(value) && Object.hasOwn(value, 'raw')) {
    return value.map((part, index) => translate(language, part) + (index < values.length ? translate(language, values[index]) : '')).join('');
  }
  if (typeof value !== 'string' || language !== 'en') return value;
  const translated = english[normalize(value)];
  if (translated !== undefined) return value.match(/^\s*/)[0] + translated + value.match(/\s*$/)[0];
  return value;
}
