# PowerShell script untuk setup GitHub Project
# Script ini akan membuka browser ke halaman pembuatan project

Write-Host "🚀 Membuka GitHub untuk membuat Project Board..." -ForegroundColor Green
Write-Host ""
Write-Host "Langkah-langkah:" -ForegroundColor Yellow
Write-Host "1. Pilih template: Board (Kanban)" -ForegroundColor Cyan
Write-Host "2. Nama: BaseToken Development" -ForegroundColor Cyan
Write-Host "3. Setelah dibuat, link ke repository base-erc20-token" -ForegroundColor Cyan
Write-Host ""

# Buka browser ke repository dulu, lalu ke tab Projects
Write-Host "Membuka repository..." -ForegroundColor Cyan
Start-Process "https://github.com/mukminn/base-erc20-token"

# Tunggu sebentar, lalu buka halaman projects
Start-Sleep -Seconds 2
Write-Host "Atau buka langsung: https://github.com/mukminn/base-erc20-token/projects" -ForegroundColor Yellow

Write-Host "✅ Browser sudah dibuka!" -ForegroundColor Green
Write-Host "Silakan ikuti langkah-langkah di browser." -ForegroundColor Yellow
