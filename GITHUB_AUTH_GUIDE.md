# GitHub 인증 가이드

## Personal Access Token 생성 방법

1. **GitHub에 로그인**
   - https://github.com 접속

2. **Settings로 이동**
   - 우측 상단 프로필 아이콘 클릭 → Settings

3. **Developer settings 접근**
   - 좌측 메뉴 하단 "Developer settings" 클릭

4. **Personal access tokens 생성**
   - "Personal access tokens" → "Tokens (classic)" 클릭
   - "Generate new token" → "Generate new token (classic)" 클릭

5. **토큰 설정**
   - Note: `fitness-tracker` (또는 원하는 이름)
   - Expiration: 원하는 기간 선택 (예: 90 days, 1 year)
   - Scopes: **`repo`** 체크박스 선택 (모든 repo 권한)
     - 또는 개별적으로 체크:
       - `repo` (전체 저장소 권한)
       - `workflow` (GitHub Actions 사용 시)

6. **토큰 생성**
   - 하단 "Generate token" 클릭
   - ⚠️ **토큰을 즉시 복사하세요!** (한 번만 표시됩니다)
   - 예: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 푸시 방법

### 방법 1: 명령어로 직접 입력
```powershell
git push -u origin main
```
- Username: GitHub 사용자 이름 (예: `ksukjune-design`)
- Password: 위에서 생성한 Personal Access Token

### 방법 2: Git Credential Manager 사용
```powershell
# 자격 증명 저장
git config --global credential.helper manager-core

# 푸시 (처음 한 번만 인증 필요)
git push -u origin main
```

### 방법 3: URL에 토큰 포함 (임시)
```powershell
# 원격 URL 변경 (토큰 포함)
git remote set-url origin https://YOUR_TOKEN@github.com/ksukjune-design/fitness-tracker.git

# 푸시
git push -u origin main

# 보안을 위해 이후 URL 변경 (토큰 제거)
git remote set-url origin https://github.com/ksukjune-design/fitness-tracker.git
```

## SSH 키 사용 (선택사항)

SSH 키를 사용하면 토큰 없이도 인증할 수 있습니다.

### SSH 키 생성
```powershell
ssh-keygen -t ed25519 -C "your.email@example.com"
# Enter 키를 눌러 기본 경로 사용
# Passphrase는 선택사항 (Enter로 건너뛰기 가능)
```

### 공개 키 복사
```powershell
# Windows
type $env:USERPROFILE\.ssh\id_ed25519.pub

# 또는
cat ~/.ssh/id_ed25519.pub
```

### GitHub에 SSH 키 추가
1. GitHub → Settings → SSH and GPG keys
2. "New SSH key" 클릭
3. Title: `My Laptop` (원하는 이름)
4. Key: 위에서 복사한 공개 키 붙여넣기
5. "Add SSH key" 클릭

### 원격 URL을 SSH로 변경
```powershell
git remote set-url origin git@github.com:ksukjune-design/fitness-tracker.git
git push -u origin main
```

## 문제 해결

### "fatal: Authentication failed" 오류
- Personal Access Token이 올바른지 확인
- 토큰의 `repo` 권한이 있는지 확인
- 토큰이 만료되지 않았는지 확인

### "fatal: could not read Username" 오류
- Git Credential Manager 설치 확인
- 또는 방법 3 사용 (URL에 토큰 포함)

### "Permission denied (publickey)" 오류 (SSH 사용 시)
- SSH 키가 GitHub에 추가되었는지 확인
- `ssh -T git@github.com` 명령어로 연결 테스트

