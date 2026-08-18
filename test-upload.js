import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建一个测试文件
const testFile = path.join(__dirname, 'test-upload.txt');
fs.writeFileSync(testFile, 'Test file for upload progress testing. '.repeat(100000));

console.log('Test file created at:', testFile);
console.log('File size:', fs.statSync(testFile).size, 'bytes');
console.log('\nApp URL: http://localhost:5173');
console.log('\n测试步骤：');
console.log('1. 打开 http://localhost:5173');
console.log('2. 点击文件上传区域');
console.log('3. 选择测试文件上传');
console.log('4. 观察右侧是否显示上传进度圆圈（0-100%）');
