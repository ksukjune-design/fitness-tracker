# AWS 배포 빠른 시작 가이드

## 🚀 방법 1: AWS Amplify (가장 간단 - 추천)

### 전제 조건
- AWS 계정
- GitHub/GitLab 저장소

### 단계별 가이드

1. **코드를 Git에 푸시**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **AWS Amplify 콘솔 접속**
   - https://console.aws.amazon.com/amplify 접속
   - "New app" → "Host web app" 클릭

3. **저장소 연결**
   - GitHub/GitLab 선택
   - 저장소 및 브랜치 선택 (보통 `main` 또는 `master`)

4. **빌드 설정 확인**
   - Amplify가 자동으로 `amplify.yml` 파일을 감지합니다
   - 빌드 설정이 자동으로 채워집니다:
     - Build command: `npm run build`
     - Output directory: `dist`

5. **배포 시작**
   - "Save and deploy" 클릭
   - 약 3-5분 후 배포 완료!

6. **도메인 확인**
   - 배포 완료 후 제공되는 URL로 접속 가능
   - 예: `https://main.xxxxx.amplifyapp.com`

---

## 📦 방법 2: S3 + CloudFront (비용 효율적)

### 전제 조건
- AWS 계정
- AWS CLI 설치 및 설정

### AWS CLI 설치 및 설정

**Windows (PowerShell)**
```powershell
# AWS CLI 설치
winget install Amazon.AWSCLI

# 또는 Chocolatey 사용
choco install awscli

# 설정
aws configure
# AWS Access Key ID 입력
# AWS Secret Access Key 입력
# Default region: ap-northeast-2 (서울)
# Default output format: json
```

**Mac/Linux**
```bash
# AWS CLI 설치
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# 설정
aws configure
```

### 단계별 가이드

1. **S3 버킷 초기 설정** (한 번만 실행)
   
   **Windows:**
   ```powershell
   .\scripts\setup-s3.ps1 -BucketName "fitness-tracker-app" -Region "ap-northeast-2"
   ```
   
   **Mac/Linux:**
   ```bash
   chmod +x scripts/setup-s3.sh
   ./scripts/setup-s3.sh fitness-tracker-app ap-northeast-2
   ```

2. **프로젝트 빌드 및 배포**
   
   **Windows:**
   ```powershell
   npm run build
   npm run deploy:s3:win -BucketName "fitness-tracker-app"
   ```
   
   **Mac/Linux:**
   ```bash
   npm run build
   npm run deploy:s3 fitness-tracker-app
   ```

3. **CloudFront 배포 생성** (HTTPS 및 CDN을 위한 선택사항)
   - AWS 콘솔 → CloudFront → "Create distribution"
   - Origin domain: S3 버킷 선택
   - Default root object: `index.html`
   - Error pages: 404 → `/index.html` (200)
   - 배포 완료 후 CloudFront URL 사용

---

## 🔧 방법 3: EC2 (서버 제어 필요)

### 전제 조건
- AWS 계정
- EC2 인스턴스 (Ubuntu 22.04 권장)
- SSH 접근 권한

### 단계별 가이드

1. **EC2 인스턴스 생성**
   - AWS 콘솔 → EC2 → Launch Instance
   - Ubuntu 22.04 LTS 선택
   - t2.micro (무료 티어) 선택
   - 보안 그룹: HTTP(80), HTTPS(443) 포트 열기

2. **서버 설정** (SSH 접속 후)
   ```bash
   # 시스템 업데이트
   sudo apt update && sudo apt upgrade -y

   # Node.js 설치
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Nginx 설치
   sudo apt-get install -y nginx

   # Git 설치
   sudo apt-get install -y git
   ```

3. **프로젝트 배포**
   ```bash
   # 프로젝트 클론
   git clone <your-repo-url>
   cd fitness-tracker

   # 의존성 설치 및 빌드
   npm install
   npm run build

   # Nginx 설정
   sudo cp nginx.conf /etc/nginx/sites-available/fitness-tracker
   sudo ln -s /etc/nginx/sites-available/fitness-tracker /etc/nginx/sites-enabled/
   sudo rm /etc/nginx/sites-enabled/default

   # 빌드된 파일 복사
   sudo mkdir -p /var/www/fitness-tracker
   sudo cp -r dist/* /var/www/fitness-tracker/

   # Nginx 재시작
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. **SSL 인증서 설정** (Let's Encrypt)
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## 🔄 자동 배포 설정 (GitHub Actions)

### 전제 조건
- GitHub 저장소
- AWS 자격 증명 (Access Key, Secret Key)

### 설정 단계

1. **GitHub Secrets 설정**
   - GitHub 저장소 → Settings → Secrets and variables → Actions
   - 다음 Secrets 추가:
     - `AWS_ACCESS_KEY_ID`
     - `AWS_SECRET_ACCESS_KEY`
     - `S3_BUCKET_NAME` (예: `fitness-tracker-app`)
     - `CLOUDFRONT_DISTRIBUTION_ID` (선택사항)

2. **자동 배포 활성화**
   - `.github/workflows/deploy.yml` 파일이 이미 포함되어 있습니다
   - `main` 브랜치에 푸시하면 자동으로 배포됩니다

3. **배포 확인**
   - GitHub Actions 탭에서 배포 상태 확인
   - 성공 시 S3에 자동 업로드됨

---

## 📊 비용 비교

| 방법 | 월 예상 비용 | 난이도 | 추천 용도 |
|------|------------|--------|----------|
| **Amplify** | 무료 티어 + $0.15/GB | ⭐ 매우 쉬움 | 개발/테스트 |
| **S3 + CloudFront** | $0.10-0.50/월 | ⭐⭐ 쉬움 | 프로덕션 |
| **EC2** | $10-15/월 | ⭐⭐⭐ 보통 | 커스텀 필요 |
| **Elastic Beanstalk** | EC2 + 추가 비용 | ⭐⭐ 쉬움 | 스케일링 필요 |

---

## 🆘 문제 해결

### S3 배포 시 권한 오류
```bash
# AWS 자격 증명 확인
aws sts get-caller-identity

# 버킷 권한 확인
aws s3 ls s3://your-bucket-name
```

### Amplify 빌드 실패
- `amplify.yml` 파일 확인
- 빌드 로그에서 오류 확인
- Node.js 버전 확인 (18.x 권장)

### CloudFront 캐시 문제
```bash
# 캐시 무효화
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

---

## 📚 추가 리소스

- [AWS Amplify 문서](https://docs.amplify.aws/)
- [S3 정적 웹사이트 호스팅](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront 시작하기](https://docs.aws.amazon.com/cloudfront/latest/DeveloperGuide/GettingStarted.html)

---

## 💡 추천 사항

**개발 환경**: AWS Amplify (가장 빠르고 간단)
**프로덕션 환경**: S3 + CloudFront (비용 효율적, 확장 가능)

