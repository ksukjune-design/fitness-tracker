# AWS S3 배포 스크립트 (PowerShell)
# 사용법: .\scripts\deploy-s3.ps1 -BucketName "fitness-tracker-app" -DistributionId "E1234567890"

param(
    [string]$BucketName = "fitness-tracker-app",
    [string]$DistributionId = ""
)

Write-Host "🚀 Building application..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Uploading to S3..." -ForegroundColor Cyan
aws s3 sync dist/ s3://$BucketName --delete --exclude "*.map"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ S3 upload failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Upload complete!" -ForegroundColor Green

if ($DistributionId) {
    Write-Host "🔄 Invalidating CloudFront cache..." -ForegroundColor Cyan
    aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*"
    Write-Host "✅ Cache invalidation complete!" -ForegroundColor Green
}

Write-Host "🎉 Deployment complete!" -ForegroundColor Green

