import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Pollinations with size 1024x1024
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(500).json({ error: 'Pollinations API failed to generate image' });
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');

    const contentType = response.headers.get("content-type") || "image/png";

    return res.status(200).json({
      photo: `data:${contentType};base64,${base64Image}`,
    });

  } catch (error) {
    console.error('Pollinations route error:', error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
