import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

async function downloadFile() {
  try {
    console.log('Fetching video from Google Drive...');
    const url = 'https://drive.google.com/uc?export=download&id=1Lu-cK6pLjw2ixJhBGOO8mjp7Eu48NvvI';
    let res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Unexpected response: ${res.status} ${res.statusText}`);
    }
    
    const contentType = res.headers.get('content-type');
    
    if (contentType && contentType.includes('text/html')) {
      console.log('Hit virus scan warning, extracting form data...');
      const text = await res.text();
      
      const actionMatch = text.match(/action="([^"]+)"/);
      const uuidMatch = text.match(/name="uuid" value="([^"]+)"/);
      
      if (actionMatch && uuidMatch) {
        const downloadUrl = `${actionMatch[1]}?id=1Lu-cK6pLjw2ixJhBGOO8mjp7Eu48NvvI&export=download&confirm=t&uuid=${uuidMatch[1]}`;
        console.log('Downloading from:', downloadUrl);
        res = await fetch(downloadUrl);
      } else {
        console.log('Could not find form data in HTML');
        return;
      }
    }
    
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public', { recursive: true });
    }

    const fileStream = fs.createWriteStream('public/hero-video.mp4');
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
    console.log('Video downloaded successfully to public/hero-video.mp4');
  } catch (err) {
    console.error('Download failed:', err);
  }
}

downloadFile();
