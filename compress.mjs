import ffmpeg from 'ffmpeg-static';
import { execFile } from 'child_process';

console.log('FFmpeg path:', ffmpeg);

const args = [
  '-i', 'public/hero-video.mp4',
  '-vf', 'scale=1280:-2',
  '-c:v', 'libx264',
  '-crf', '28',
  '-preset', 'veryfast',
  '-an',
  'public/hero-video-compressed.mp4'
];

console.log('Running FFmpeg...');
const child = execFile(ffmpeg, args, (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Compression finished!');
});

child.stderr.on('data', (data) => {
  console.log(data.toString());
});
