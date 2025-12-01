# S3 버킷 초기 설정 스크립트 (PowerShell)
# 사용법: .\scripts\setup-s3.ps1 -BucketName "fitness-tracker-app" -Region "ap-northeast-2"

param(
    [string]$BucketName = "fitness-tracker-app",
    [string]$Region = "ap-northeast-2"
)

Write-Host "🚀 Setting up S3 bucket: $BucketName" -ForegroundColor Cyan

# 버킷 생성
Write-Host "📦 Creating S3 bucket..." -ForegroundColor Cyan
aws s3 mb "s3://$BucketName" --region $Region

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Bucket might already exist, continuing..." -ForegroundColor Yellow
}

# 정적 웹사이트 호스팅 활성화
Write-Host "🌐 Enabling static website hosting..." -ForegroundColor Cyan
aws s3 website "s3://$BucketName" --index-document index.html --error-document index.html

# 버킷 정책 설정
Write-Host "🔒 Setting bucket policy..." -ForegroundColor Cyan
$bucketPolicy = @{
    Version = "2012-10-17"
    Statement = @(
        @{
            Sid = "PublicReadGetObject"
            Effect = "Allow"
            Principal = "*"
            Action = "s3:GetObject"
            Resource = "arn:aws:s3:::$BucketName/*"
        }
    )
} | ConvertTo-Json -Depth 10

$bucketPolicy | Out-File -FilePath "$env:TEMP\bucket-policy.json" -Encoding utf8
aws s3api put-bucket-policy --bucket $BucketName --policy "file://$env:TEMP\bucket-policy.json"

# CORS 설정
Write-Host "🌍 Setting CORS configuration..." -ForegroundColor Cyan
$corsConfig = @{
    CORSRules = @(
        @{
            AllowedOrigins = @("*")
            AllowedMethods = @("GET", "HEAD")
            AllowedHeaders = @("*")
            MaxAgeSeconds = 3000
        }
    )
} | ConvertTo-Json -Depth 10

$corsConfig | Out-File -FilePath "$env:TEMP\cors.json" -Encoding utf8
aws s3api put-bucket-cors --bucket $BucketName --cors-configuration "file://$env:TEMP\cors.json"

Write-Host "✅ S3 bucket setup complete!" -ForegroundColor Green
Write-Host "📍 Website URL: http://$BucketName.s3-website-$Region.amazonaws.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Run: npm run build"
Write-Host "2. Run: npm run deploy:s3:win -BucketName $BucketName"
Write-Host "3. (Optional) Create CloudFront distribution for HTTPS"

