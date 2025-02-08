import fetch from 'node-fetch';

const HUGGING_FACE_API_URL = 'https://huggingface.co/spaces/ishu13/DentalVisionAI';
const ACCESS_TOKEN = process.env.HUGGING_FACE_ACCESS_TOKEN;

async function queryHuggingFaceModel(imageBuffer) {
    const response = await fetch(HUGGING_FACE_API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/octet-stream'
        },
        body: imageBuffer
    });

    if (!response.ok) {
        throw new Error(`Error querying model: ${response.statusText}`);
    }

    return response.json();
}

export { queryHuggingFaceModel };
