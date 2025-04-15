const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { OpenAI } = require('openai');

const upload = multer({ storage: multer.memoryStorage() });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/generate-quiz', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF file uploaded' });
        }

        // Extract text from PDF
        const pdfData = await pdfParse(req.file.buffer);
        const text = pdfData.text;

        // Generate questions using OpenAI
        const prompt = `Create 5 multiple choice questions based on the following text. For each question, provide 4 options and mark the correct answer. Format the response as JSON:
        {
            "questions": [
                {
                    "question": "question text",
                    "options": [
                        {"text": "option 1", "isCorrect": false},
                        {"text": "option 2", "isCorrect": true},
                        {"text": "option 3", "isCorrect": false},
                        {"text": "option 4", "isCorrect": false}
                    ]
                }
            ]
        }
        
        Text: ${text}`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        const questions = JSON.parse(completion.choices[0].message.content);
        res.json(questions);
    } catch (error) {
        console.error('Error generating quiz:', error);
        res.status(500).json({ error: 'Error generating quiz' });
    }
});

module.exports = router; 