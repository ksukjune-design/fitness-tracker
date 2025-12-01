#!/bin/bash

# S3 버킷 초기 설정 스크립트
# 사용법: ./scripts/setup-s3.sh [bucket-name] [region]

BUCKET_NAME=${1:-fitness-tracker-app}
REGION=${2:-ap-northeast-2}

echo "🚀 Setting up S3 bucket: $BUCKET_NAME"

# 버킷 생성
echo "📦 Creating S3 bucket..."
aws s3 mb s3://$BUCKET_NAME --region $REGION

if [ $? -ne 0 ]; then
  echo "⚠️  Bucket might already exist, continuing..."
fi

# 정적 웹사이트 호스팅 활성화
echo "🌐 Enabling static website hosting..."
aws s3 website s3://$BUCKET_NAME \
  --index-document index.html \
  --error-document index.html

# 버킷 정책 설정
echo "🔒 Setting bucket policy..."
cat > /tmp/bucket-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:///tmp/bucket-policy.json

# CORS 설정 (필요한 경우)
echo "🌍 Setting CORS configuration..."
cat > /tmp/cors.json << EOF
{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedHeaders": ["*"],
      "MaxAgeSeconds": 3000
    }
  ]
}
EOF

aws s3api put-bucket-cors --bucket $BUCKET_NAME --cors-configuration file:///tmp/cors.json

echo "✅ S3 bucket setup complete!"
echo "📍 Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
echo ""
echo "Next steps:"
echo "1. Run: npm run build"
echo "2. Run: npm run deploy:s3 $BUCKET_NAME"
echo "3. (Optional) Create CloudFront distribution for HTTPS"

