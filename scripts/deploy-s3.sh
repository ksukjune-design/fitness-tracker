#!/bin/bash

# AWS S3 배포 스크립트
# 사용법: ./scripts/deploy-s3.sh [bucket-name] [cloudfront-distribution-id]

BUCKET_NAME=${1:-fitness-tracker-app}
DISTRIBUTION_ID=$2

echo "🚀 Building application..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

echo "📦 Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete --exclude "*.map"

if [ $? -ne 0 ]; then
  echo "❌ S3 upload failed!"
  exit 1
fi

echo "✅ Upload complete!"

if [ ! -z "$DISTRIBUTION_ID" ]; then
  echo "🔄 Invalidating CloudFront cache..."
  aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
  echo "✅ Cache invalidation complete!"
fi

echo "🎉 Deployment complete!"

