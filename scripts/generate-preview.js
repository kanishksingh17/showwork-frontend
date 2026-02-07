import captureWebsite from 'capture-website';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePreview() {
    const url = 'http://localhost:5173/portfolio/preview-full?type=backend';
    const outputPath = path.join(__dirname, '../public/templates/backend.png');

    console.log(`Capturing screenshot of ${url}...`);
    console.log(`Saving to ${outputPath}...`);

    try {
        await captureWebsite.file(url, outputPath, {
            fullPage: true,
            width: 1280,
            height: 800,
            delay: 10, // Increased delay to ensure load
            overwrite: true,
            scaleFactor: 2,
            timeout: 60000,
            styles: [
                `
                /* Hide React Query Devtools Button */
                .tsqd-parent-container { display: none !important; }
                button[aria-label="Open React Query Devtools"] { display: none !important; }
                #react-query-devtools-btn { display: none !important; }
                `
            ],
            launchOptions: {
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });
        console.log('Screenshot captured successfully!');
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        process.exit(1);
    }
}

generatePreview();
