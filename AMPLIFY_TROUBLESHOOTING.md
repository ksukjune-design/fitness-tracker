# Amplify 배포 문제 해결 가이드

## 일반적인 배포 실패 원인 및 해결 방법

### 1. 빌드 로그 확인 방법

1. AWS Amplify 콘솔 접속: https://console.aws.amazon.com/amplify
2. 앱 선택
3. "Deployments" 탭 클릭
4. 실패한 배포의 "View logs" 클릭
5. 오류 메시지 확인

### 2. 일반적인 오류 및 해결 방법

#### 오류: "npm ci failed"
**원인**: `package-lock.json` 파일이 없음
**해결**: 
- `amplify.yml`에서 `npm ci` 대신 `npm install` 사용
- 또는 `npm ci || npm install` 사용 (이미 적용됨)

#### 오류: "TypeScript compilation failed"
**원인**: TypeScript 타입 오류
**해결**:
```yaml
# amplify.yml에서 빌드 명령어 수정
build:
  commands:
    - npm run build || (echo "TypeScript errors found, continuing with vite build..." && vite build)
```

또는 `package.json`에서:
```json
"build": "vite build"
```
(tsc 체크 제거)

#### 오류: "Module not found"
**원인**: 의존성 누락
**해결**:
- `package.json`에 모든 의존성이 포함되어 있는지 확인
- `npm install`이 성공적으로 완료되었는지 확인

#### 오류: "Cannot find module"
**원인**: 상대 경로 오류 또는 누락된 파일
**해결**:
- 모든 파일이 Git에 커밋되었는지 확인
- `.gitignore`에서 필요한 파일이 제외되지 않았는지 확인

#### 오류: "Build output directory not found"
**원인**: `dist` 폴더가 생성되지 않음
**해결**:
- 빌드가 성공적으로 완료되었는지 확인
- `vite.config.ts`에서 `outDir`이 `dist`로 설정되어 있는지 확인

### 3. amplify.yml 개선 버전

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - echo "Node version:" && node --version
        - echo "NPM version:" && npm --version
        - npm ci || npm install
    build:
      commands:
        - echo "Building application..."
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### 4. 디버깅 팁

1. **로컬에서 빌드 테스트**
   ```bash
   npm install
   npm run build
   ```
   로컬에서 빌드가 성공하면 Amplify에서도 성공할 가능성이 높습니다.

2. **빌드 로그에서 확인할 사항**
   - Node.js 버전
   - npm 버전
   - 의존성 설치 성공 여부
   - 빌드 단계별 오류 메시지

3. **환경 변수 확인**
   - Amplify 콘솔 → App settings → Environment variables
   - 필요한 환경 변수가 설정되어 있는지 확인

### 5. TypeScript 오류 무시하고 빌드하기

TypeScript 타입 체크를 건너뛰고 빌드하려면:

**방법 1: package.json 수정**
```json
"build": "vite build"
```

**방법 2: tsconfig.json 수정**
```json
{
  "compilerOptions": {
    "noEmit": true,
    "skipLibCheck": true
  }
}
```

### 6. 빌드 성공 후에도 Welcome 페이지가 보이는 경우

1. **빌드 아티팩트 확인**
   - Amplify 콘솔 → 배포 → Artifacts
   - `dist/index.html` 파일이 있는지 확인

2. **리다이렉트 규칙 확인**
   - Amplify 콘솔 → App settings → Rewrites and redirects
   - SPA 라우팅을 위한 리다이렉트 규칙 추가:
   ```
   Source address: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>
   Target address: /index.html
   Type: 200 (Rewrite)
   ```

### 7. 추가 리소스

- [Amplify 빌드 설정 가이드](https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html)
- [Amplify 문제 해결](https://docs.aws.amazon.com/amplify/latest/userguide/troubleshooting.html)

