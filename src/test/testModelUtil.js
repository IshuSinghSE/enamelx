import fs from 'fs';
import path from 'path';
import { queryHuggingFaceModel } from '../lib/modelutil.js';

const imagePath = path.resolve('src/test/test-image.jpg');

fs.readFile(imagePath, async (err, data) => {
    if (err) {
        console.error('Error reading image file:', err);
        return;
    }

    try {
        const response = await queryHuggingFaceModel(data);
        console.log('Model response:', response);
    } catch (error) {
        console.error('Error querying model:', error);
    }
});
