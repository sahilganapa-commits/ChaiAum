import ffmpeg from 'ffmpeg-static';
import { execFile } from 'child_process';
import fs from 'fs';

const args = [
  '-i', 'public/hero-video.mp4',
  '-vf', 'transpose=2', // Rotate 90 degrees counter-clockwise
  '-c:v', 'libx264',
  '-crf', '28',
  '-preset', 'veryfast',
  '-an',
  '-y',
  'public/hero-video-rotated-left.mp4'
];

console.log('Running FFmpeg to rotate video 180 degrees...');
const child = execFile(ffmpeg, args, (error, stdout, stderr) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Rotation finished!');
  
  // Replace the old video with the newly rotated one
  fs.renameSync('public/hero-video-rotated-left.mp4', 'public/hero-video.mp4');
  console.log('Replaced original video with correctly rotated version.');
});

child.stderr.on('data', (data) => {
  // console.log(data.toString());
});
