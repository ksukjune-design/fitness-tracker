# AWS 배포 가이드

이 문서는 React + Vite 애플리케이션을 AWS에 배포하는 여러 방법을 안내합니다.

## 방법 1: AWS Amplify (추천 - 가장 간단)

AWS Amplify는 React 앱 배포에 최적화되어 있으며, CI/CD가 자동으로 설정됩니다.

### 장점
- ✅ 가장 간단한 설정
- ✅ 자동 CI/CD (Git 연동)
- ✅ 무료 티어 제공
- ✅ 자동 HTTPS 인증서
- ✅ 글로벌 CDN

### 배포 단계

1. **GitHub/GitLab에 코드 푸시**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **AWS Amplify 콘솔에서 앱 생성**
   - AWS 콘솔 → AWS Amplify → "New app" → "Host web app"
   - GitHub/GitLab 연결
   - 저장소 및 브랜치 선택
   - 빌드 설정 자동 감지 (아래 설정 파일 사용)

3. **빌드 설정 확인**
   - Amplify가 자동으로 `amplify.yml` 파일을 감지합니다.

---

## 방법 2: S3 + CloudFront (비용 효율적)

S3에 정적 파일을 호스팅하고 CloudFront로 CDN을 구성합니다.

### 장점
- ✅ 매우 저렴한 비용
- ✅ 높은 확장성
- ✅ 글로벌 CDN
- ✅ HTTPS 지원

### 배포 단계

1. **프로젝트 빌드**
   ```bash
   npm run build
   ```

2. **S3 버킷 생성 및 설정**
   ```bash
   # AWS CLI 설치 필요
   aws s3 mb s3://fitness-tracker-app
   aws s3 sync dist/ s3://fitness-tracker-app --delete
   aws s3 website s3://fitness-tracker-app --index-document index.html
   ```

3. **S3 버킷 정책 설정** (콘솔에서)
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::fitness-tracker-app/*"
       }
     ]
   }
   ```

4. **CloudFront 배포 생성** (선택사항)
   - CloudFront 콘솔에서 새 배포 생성
   - Origin: S3 버킷
   - Default Root Object: `index.html`
   - Error Pages: 404 → `/index.html` (SPA 라우팅)

5. **자동 배포 스크립트 사용**
   ```bash
   npm run deploy:s3
   ```

---

## 방법 3: EC2 (더 많은 제어권)

EC2 인스턴스에 Nginx를 사용하여 배포합니다.

### 장점
- ✅ 완전한 제어권
- ✅ 서버 사이드 로직 추가 가능
- ✅ 커스텀 설정 가능

### 배포 단계

1. **EC2 인스턴스 생성**
   - Ubuntu 22.04 LTS 권장
   - 보안 그룹: HTTP(80), HTTPS(443) 포트 열기

2. **서버 설정** (EC2에 SSH 접속 후)
   ```bash
   # Node.js 설치
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Nginx 설치
   sudo apt-get update
   sudo apt-get install -y nginx

   # 프로젝트 클론 및 빌드
   git clone <your-repo-url>
   cd fitness-tracker
   npm install
   npm run build

   # Nginx 설정
   sudo cp nginx.conf /etc/nginx/sites-available/fitness-tracker
   sudo ln -s /etc/nginx/sites-available/fitness-tracker /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

3. **SSL 인증서 설정** (Let's Encrypt)
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## 방법 4: Elastic Beanstalk

AWS가 관리하는 플랫폼으로 배포합니다.

### 장점
- ✅ 자동 스케일링
- ✅ 로드 밸런싱
- ✅ 모니터링

### 배포 단계

1. **EB CLI 설치**
   ```bash
   pip install awsebcli
   ```

2. **EB 초기화**
   ```bash
   eb init -p node.js fitness-tracker
   ```

3. **환경 생성 및 배포**
   ```bash
   eb create fitness-tracker-env
   eb deploy
   ```

---

## 추천 배포 방법

**개발/테스트 환경**: AWS Amplify (가장 간단)
**프로덕션 환경**: S3 + CloudFront (비용 효율적)

---

## 환경 변수 설정

프로덕션 환경에서 환경 변수가 필요한 경우:

### Amplify
- Amplify 콘솔 → App settings → Environment variables

### S3 + CloudFront
- 빌드 시점에 환경 변수 주입 필요
- `.env.production` 파일 사용

---

## 비용 비교 (월 예상)

- **Amplify**: 무료 티어 (월 15GB 전송량), 이후 $0.15/GB
- **S3 + CloudFront**: S3 $0.023/GB, CloudFront $0.085/GB (첫 10TB)
- **EC2**: t2.micro 무료 티어 (1년), 이후 약 $10-15/월
- **Elastic Beanstalk**: EC2 비용 + 추가 관리 비용

---

## 다음 단계

1. 선택한 방법에 따라 해당 섹션의 단계를 따르세요
2. 도메인 연결 (선택사항)
3. 모니터링 설정
4. 백업 전략 수립

