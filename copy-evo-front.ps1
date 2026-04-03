# copy-evo-front.ps1

$source = "D:\PROJECTS\evo-front\dist\fesm2015"
$destination = "D:\PROJECTS\licenses-widget\node_modules\evo-front\__ivy_ngcc__\fesm2015"

# Проверяем существование исходной папки
if (!(Test-Path $source)) {
    Write-Host "Ошибка: Исходная папка не найдена: $source" -ForegroundColor Red
    exit 1
}

# Проверяем существование папки назначения
if (!(Test-Path $destination)) {
    Write-Host "Папка назначения не найдена: $destination" -ForegroundColor Yellow
    Write-Host "Создаю папку..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $destination -Force
}

# Получаем список файлов для копирования
$files = Get-ChildItem -Path $source -File

if ($files.Count -eq 0) {
    Write-Host "В исходной папке нет файлов!" -ForegroundColor Red
    exit 1
}

# Копируем каждый файл с подробным выводом
$copiedCount = 0
foreach ($file in $files) {
    $destFile = Join-Path $destination $file.Name
    Copy-Item -Path $file.FullName -Destination $destFile -Force
    Write-Host "✓ Скопирован: $($file.Name)" -ForegroundColor Green
    $copiedCount++
}

Write-Host "`n✅ Успешно скопировано $copiedCount файлов" -ForegroundColor Green
Write-Host "Из: $source" -ForegroundColor Cyan
Write-Host "В: $destination" -ForegroundColor Cyan

# Проверяем, что файлы действительно скопировались
Write-Host "`n📁 Содержимое папки назначения:" -ForegroundColor Yellow
Get-ChildItem -Path $destination | ForEach-Object { Write-Host "  - $($_.Name)" }

# ========== ДОПОЛНИТЕЛЬНЫЙ ФУНКЦИОНАЛ: копирование global.d.ts ==========
Write-Host "`n📄 Копирование global.d.ts..." -ForegroundColor Magenta

$sourceDts = "D:\PROJECTS\evo-front\dist\global.d.ts"
$destDtsFolder = "D:\PROJECTS\licenses-widget\node_modules\evo-front\"
$destDtsPath = Join-Path $destDtsFolder "global.d.ts"

# Проверяем существование исходного файла
if (!(Test-Path $sourceDts)) {
    Write-Host "⚠️ Предупреждение: Файл global.d.ts не найден: $sourceDts" -ForegroundColor Yellow
    Write-Host "   Копирование пропущено." -ForegroundColor Yellow
} else {
    # Проверяем существование папки назначения
    if (!(Test-Path $destDtsFolder)) {
        Write-Host "Папка назначения не найдена: $destDtsFolder" -ForegroundColor Yellow
        Write-Host "Создаю папку..." -ForegroundColor Yellow
        New-Item -ItemType Directory -Path $destDtsFolder -Force
    }

    # Копируем файл с перезаписью
    Copy-Item -Path $sourceDts -Destination $destDtsPath -Force
    Write-Host "✓ Скопирован: global.d.ts" -ForegroundColor Green
    Write-Host "   Из: $sourceDts" -ForegroundColor Cyan
    Write-Host "   В: $destDtsPath" -ForegroundColor Cyan
}
# ======================================================================
