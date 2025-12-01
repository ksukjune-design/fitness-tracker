# Git 설치 및 설정 가이드

## 1. Git 설치

### Windows에서 Git 설치

**방법 1: 공식 웹사이트에서 다운로드 (추천)**
1. https://git-scm.com/download/win 접속
2. 다운로드된 설치 파일 실행
3. 기본 설정으로 설치 진행 (Next 클릭)
4. 설치 완료 후 PowerShell 재시작

**방법 2: winget 사용 (Windows 10/11)**
```powershell
winget install Git.Git
```

**방법 3: Chocolatey 사용**
```powershell
choco install git
```

### 설치 확인
PowerShell을 재시작한 후 다음 명령어로 확인:
```powershell
git --version
```

## 2. Git 기본 설정

Git 설치 후 처음 한 번만 설정:

```powershell
# 사용자 이름 설정
git config --global user.name "Your Name"

# 이메일 설정
git config --global user.email "your.email@example.com"

# 기본 브랜치 이름을 main으로 설정
git config --global init.defaultBranch main

# 자동 줄바꿈 처리 설정 (Windows)
git config --global core.autocrlf true
```

## 3. GitHub 계정 준비

1. https://github.com 접속
2. 계정이 없으면 "Sign up"으로 가입
3. 계정이 있으면 로그인

## 4. GitHub 저장소 생성

1. GitHub에 로그인
2. 우측 상단 "+" 버튼 클릭 → "New repository"
3. 저장소 이름 입력 (예: `fitness-tracker`)
4. Public 또는 Private 선택
5. "Initialize this repository with a README" 체크 해제 (이미 README가 있으므로)
6. "Create repository" 클릭
7. 생성된 저장소의 URL 복사 (예: `https://github.com/username/fitness-tracker.git`)

## 5. 프로젝트를 Git에 연결

PowerShell에서 프로젝트 폴더로 이동한 후:

```powershell
# Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 팀 운동 현황 관리 애플리케이션"

# 원격 저장소 연결 (위에서 복사한 URL 사용)
git remote add origin https://github.com/username/fitness-tracker.git

# 브랜치 이름을 main으로 설정
git branch -M main

# GitHub에 푸시
git push -u origin main
```

## 6. 인증 문제 해결

### Personal Access Token 사용 (권장)

GitHub에서 비밀번호 대신 Personal Access Token을 사용해야 합니다.

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token (classic)" 클릭
3. Note: "Fitness Tracker" 입력
4. Expiration: 원하는 기간 선택
5. Scopes: `repo` 체크
6. "Generate token" 클릭
7. 생성된 토큰 복사 (한 번만 보여짐!)

**푸시 시 비밀번호 대신 토큰 사용:**
```powershell
# 사용자 이름: GitHub 사용자 이름
# 비밀번호: 위에서 생성한 Personal Access Token
```

### SSH 키 사용 (선택사항)

SSH 키를 사용하면 토큰 없이도 인증할 수 있습니다.

```powershell
# SSH 키 생성
ssh-keygen -t ed25519 -C "your.email@example.com"

# 공개 키 복사
cat ~/.ssh/id_ed25519.pub
# 또는 Windows의 경우
type $env:USERPROFILE\.ssh\id_ed25519.pub
```

1. 복사한 공개 키를 GitHub → Settings → SSH and GPG keys → New SSH key에 추가
2. 원격 저장소 URL을 SSH 형식으로 변경:
```powershell
git remote set-url origin git@github.com:username/fitness-tracker.git
```

## 7. 자주 사용하는 Git 명령어

```powershell
# 상태 확인
git status

# 변경사항 확인
git diff

# 파일 추가
git add <파일명>
git add .  # 모든 파일

# 커밋
git commit -m "커밋 메시지"

# 푸시
git push

# 최신 변경사항 가져오기
git pull

# 브랜치 확인
git branch

# 원격 저장소 확인
git remote -v
```

## 문제 해결

### "fatal: not a git repository" 오류
```powershell
git init
```

### "fatal: remote origin already exists" 오류
```powershell
# 기존 원격 저장소 제거
git remote remove origin
# 다시 추가
git remote add origin <URL>
```

### "Permission denied" 오류
- Personal Access Token이 올바른지 확인
- SSH 키가 올바르게 설정되었는지 확인

