const fs = require('fs');

fs.mkdirSync('dist', { recursive: true });

const pkg = fs.readFileSync('package.json');
fs.writeFileSync('dist/package.json', pkg);

if (fs.existsSync('README.md'))
    fs.copyFileSync('README.md', 'dist/README.md');

if (fs.existsSync('LICENSE'))
    fs.copyFileSync('LICENSE', 'dist/LICENSE');

// подключаем типы
fs.writeFileSync(
    'dist/index.d.ts',
    `/// <reference path="./global.d.ts" />
export * from './public-api';
`
);

// 🔥 берём global.ts, а не .d.ts
fs.writeFileSync(
    'dist/global.d.ts',
    fs.readFileSync('src/global.ts')
);
