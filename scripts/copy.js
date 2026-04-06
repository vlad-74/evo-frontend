const fs = require('fs');

// Создаем директорию dist (рекурсивно, если нужно создать вложенные папки)
fs.mkdirSync('dist', { recursive: true });

// Читаем package.json из корня проекта
const pkg = fs.readFileSync('package.json');

// Копируем package.json в dist-папку для публикации в npm
fs.writeFileSync('dist/package.json', pkg);

// Если есть README.md - копируем в dist
if (fs.existsSync('README.md'))
    fs.copyFileSync('README.md', 'dist/README.md');

// Если есть LICENSE - копируем в dist
if (fs.existsSync('LICENSE'))
    fs.copyFileSync('LICENSE', 'dist/LICENSE');

//===== при LIB-TO-NPM- =====//
// Создаем главный файл деклараций типов index.d.ts
// Он будет подключать evo-global-declare.d.ts и реэкспортировать всё из public-api
fs.writeFileSync(
    'dist/index.d.ts',
    `/// <reference path="./evo-global-declare.d.ts" />
export * from './public-api';
`
);

// Копируем файл с глобальными декларациями типов из исходной папки src/root
// Этот файл содержит declare global для Window и const evo
// Берем исходный .ts файл, а не скомпилированный .d.ts, чтобы сохранить все декларации
fs.writeFileSync(
    'dist/evo-global-declare.d.ts',
    fs.readFileSync('src/root/evo-global-declare.ts')
);
