# Git 초기화 및 설정 스크립트
# 사용법: .\scripts\setup-git.ps1 -RepoUrl "https://github.com/username/fitness-tracker.git"

param(
    [Parameter(Mandatory=$true)]
    [string]$RepoUrl,
    [string]$CommitMessage = "Initial commit: 팀 운동 현황 관리 애플리케이션"
)

Write-Host "🔍 Checking Git installation..." -ForegroundColor Cyan

# Git 설치 확인
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git first:" -ForegroundColor Yellow
    Write-Host "1. Visit https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "2. Or run: winget install Git.Git" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "📦 Initializing Git repository..." -ForegroundColor Cyan

# Git 초기화
if (Test-Path .git) {
    Write-Host "⚠️  Git repository already initialized" -ForegroundColor Yellow
} else {
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 Checking Git configuration..." -ForegroundColor Cyan

# Git 사용자 설정 확인
$userName = git config --global user.name
$userEmail = git config --global user.email

if (-not $userName -or -not $userEmail) {
    Write-Host "⚠️  Git user configuration is missing" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please configure Git first:" -ForegroundColor Yellow
    Write-Host "  git config --global user.name `"Your Name`"" -ForegroundColor Cyan
    Write-Host "  git config --global user.email `"your.email@example.com`"" -ForegroundColor Cyan
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit 1
    }
} else {
    Write-Host "✅ Git user: $userName <$userEmail>" -ForegroundColor Green
}

Write-Host ""
Write-Host "📂 Adding files..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "💾 Creating initial commit..." -ForegroundColor Cyan
git commit -m $CommitMessage

Write-Host ""
Write-Host "🔗 Setting up remote repository..." -ForegroundColor Cyan

# 기존 원격 저장소 확인
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "⚠️  Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
    $replace = Read-Host "Replace with new URL? (y/n)"
    if ($replace -eq "y") {
        git remote remove origin
        git remote add origin $RepoUrl
        Write-Host "✅ Remote repository updated" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  Keeping existing remote repository" -ForegroundColor Cyan
    }
} else {
    git remote add origin $RepoUrl
    Write-Host "✅ Remote repository added" -ForegroundColor Green
}

Write-Host ""
Write-Host "🌿 Setting branch name to 'main'..." -ForegroundColor Cyan
git branch -M main

Write-Host ""
Write-Host "✅ Git setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review the changes: git status" -ForegroundColor Cyan
Write-Host "2. Push to GitHub: git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: You may need to authenticate with GitHub" -ForegroundColor Yellow
Write-Host "      Use Personal Access Token instead of password" -ForegroundColor Yellow

