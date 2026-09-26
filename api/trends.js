import { GLOBAL_DINING_TRENDS, TREND_CATEGORY_INFO } from '../src/data/globalDiningTrends.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    success: true,
    info: TREND_CATEGORY_INFO,
    count: GLOBAL_DINING_TRENDS.length,
    data: GLOBAL_DINING_TRENDS,
  });
}
