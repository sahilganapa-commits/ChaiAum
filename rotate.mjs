import ffmpeg from 'ffmpeg-static';
import { execFile } from 'child_process';
import fs from 'fs';

const args = [
  '-i', 'public/hero-video.mp4',
  '-vf', 'transpose=1', // 1 = 90 degrees clockwise
  '-c:v', 'libx264',
  '-crf', '28',
  '-preset', 'veryfast',
  '-an',
  '-y', // overwrite output file if it exists
  'public/hero-video-rotated.mp4'
];

console.log('Running FFmpeg to rotate video 90 degrees clockwise...');
const child = execFile(ffmpeg, args, (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Rotation finished!');
  
  // Replace the old video with the rotated one
  fs.renameSync('public/hero-video-rotated.mp4', 'public/hero-video.mp4');
  console.log('Replaced original video with rotated version.');
});

child.stderr.on('data', (data) => {
  // console.log(data.toString()); // Uncomment to see ffmpeg logs if it fails
});
