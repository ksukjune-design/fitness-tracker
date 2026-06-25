#!/usr/bin/env python3
"""
원격 컴퓨터에서 실행 중인 크롤링 진척도 확인 스크립트
사용법: python3 check_crawl_progress.py [옵션]
"""

import subprocess
import sys
import re
import argparse
from datetime import datetime

# ── 설정 (실제 환경에 맞게 수정) ──────────────────────────────────
DEFAULT_HOST = "user@192.168.1.100"   # 원격 서버 주소
DEFAULT_LOG  = "/home/user/crawl.log" # 크롤링 로그 파일 경로
DEFAULT_SSH_KEY = ""                  # SSH 키 경로 (없으면 기본값 사용)
# ─────────────────────────────────────────────────────────────────


def run_ssh(host: str, command: str, ssh_key: str = "") -> tuple[int, str, str]:
    """원격 서버에서 명령어 실행 후 (returncode, stdout, stderr) 반환."""
    ssh_opts = ["-o", "StrictHostKeyChecking=no", "-o", "ConnectTimeout=10"]
    if ssh_key:
        ssh_opts += ["-i", ssh_key]
    result = subprocess.run(
        ["ssh"] + ssh_opts + [host, command],
        capture_output=True, text=True
    )
    return result.returncode, result.stdout.strip(), result.stderr.strip()


def check_process(host: str, ssh_key: str) -> dict:
    """크롤링 프로세스가 실행 중인지 확인."""
    rc, out, _ = run_ssh(host, "pgrep -a -f 'python.*crawl\\|scrapy\\|selenium' | head -5", ssh_key)
    return {
        "running": rc == 0 and bool(out),
        "processes": out.splitlines() if out else []
    }


def parse_log_progress(log_text: str) -> dict:
    """로그에서 진척도 정보 파싱."""
    info = {
        "total": None,
        "done": None,
        "errors": 0,
        "last_url": "",
        "last_lines": []
    }

    # 마지막 20줄 저장
    lines = log_text.splitlines()
    info["last_lines"] = lines[-20:] if len(lines) > 20 else lines

    for line in lines:
        # "진행: 500/2000" 또는 "progress: 500/2000" 패턴
        m = re.search(r"(?:진행|progress)[:\s]+(\d+)\s*/\s*(\d+)", line, re.IGNORECASE)
        if m:
            info["done"]  = int(m.group(1))
            info["total"] = int(m.group(2))

        # "scraped: 500" 패턴
        m = re.search(r"(?:scraped|crawled|완료)[:\s]+(\d+)", line, re.IGNORECASE)
        if m and info["done"] is None:
            info["done"] = int(m.group(1))

        # "total: 2000" 패턴
        m = re.search(r"(?:total|전체)[:\s]+(\d+)", line, re.IGNORECASE)
        if m and info["total"] is None:
            info["total"] = int(m.group(1))

        # 에러 카운트
        if re.search(r"\b(?:error|오류|실패|failed)\b", line, re.IGNORECASE):
            info["errors"] += 1

        # 마지막으로 크롤링한 URL
        m = re.search(r"https?://\S+", line)
        if m:
            info["last_url"] = m.group(0)

    return info


def fetch_log(host: str, log_path: str, ssh_key: str) -> str:
    """원격 로그 파일의 마지막 200줄 가져오기."""
    rc, out, err = run_ssh(host, f"tail -200 {log_path} 2>/dev/null", ssh_key)
    if rc != 0:
        return ""
    return out


def disk_and_cpu(host: str, ssh_key: str) -> dict:
    """원격 서버의 CPU·디스크 사용량 간단 조회."""
    _, cpu_out, _ = run_ssh(
        host,
        "top -bn1 | grep 'Cpu(s)' | awk '{print $2}'",
        ssh_key
    )
    _, disk_out, _ = run_ssh(
        host,
        "df -h / | tail -1 | awk '{print $3\"/\"$2\" (\"$5\" used)\"}'",
        ssh_key
    )
    return {"cpu": cpu_out or "N/A", "disk": disk_out or "N/A"}


def progress_bar(done: int, total: int, width: int = 40) -> str:
    ratio = min(done / total, 1.0)
    filled = int(width * ratio)
    bar = "█" * filled + "░" * (width - filled)
    return f"[{bar}] {ratio*100:.1f}%"


def print_report(host: str, proc: dict, log_info: dict, resources: dict):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"\n{'='*60}")
    print(f"  원격 크롤링 진척도 확인  ({now})")
    print(f"  서버: {host}")
    print(f"{'='*60}")

    # 프로세스 상태
    status = "✅ 실행 중" if proc["running"] else "❌ 실행 안 됨"
    print(f"\n[프로세스 상태] {status}")
    for p in proc["processes"]:
        print(f"  {p}")

    # 진척도
    print("\n[진척도]")
    done  = log_info.get("done")
    total = log_info.get("total")
    if done is not None and total is not None and total > 0:
        print(f"  {progress_bar(done, total)}")
        print(f"  {done:,} / {total:,} 항목 완료")
        remaining = total - done
        print(f"  남은 항목: {remaining:,}")
    elif done is not None:
        print(f"  완료된 항목: {done:,}")
    else:
        print("  (로그에서 진척도 정보를 찾지 못했습니다)")

    # 에러
    errors = log_info.get("errors", 0)
    print(f"\n[오류 건수] {errors}건")

    # 마지막 URL
    last_url = log_info.get("last_url", "")
    if last_url:
        print(f"\n[마지막 크롤링 URL]\n  {last_url}")

    # 리소스
    print(f"\n[서버 리소스]")
    print(f"  CPU 사용률: {resources['cpu']}%")
    print(f"  디스크:     {resources['disk']}")

    # 최근 로그
    recent = log_info.get("last_lines", [])
    if recent:
        print(f"\n[최근 로그 (끝 {len(recent)}줄)]")
        for line in recent[-10:]:
            print(f"  {line}")

    print(f"\n{'='*60}\n")


def main():
    parser = argparse.ArgumentParser(description="원격 크롤링 진척도 확인")
    parser.add_argument("--host",    default=DEFAULT_HOST,    help="원격 서버 (user@host)")
    parser.add_argument("--log",     default=DEFAULT_LOG,     help="원격 로그 파일 경로")
    parser.add_argument("--key",     default=DEFAULT_SSH_KEY, help="SSH 개인키 경로")
    parser.add_argument("--watch",   action="store_true",     help="30초마다 자동 갱신")
    parser.add_argument("--interval",type=int, default=30,   help="갱신 주기(초), --watch 사용 시")
    args = parser.parse_args()

    def run_once():
        print("원격 서버에 접속 중...", end=" ", flush=True)
        proc      = check_process(args.host, args.key)
        log_text  = fetch_log(args.host, args.log, args.key)
        log_info  = parse_log_progress(log_text)
        resources = disk_and_cpu(args.host, args.key)
        print("완료")
        print_report(args.host, proc, log_info, resources)

    if args.watch:
        import time
        print(f"[자동 갱신 모드] {args.interval}초마다 갱신합니다. 종료: Ctrl+C")
        try:
            while True:
                run_once()
                time.sleep(args.interval)
        except KeyboardInterrupt:
            print("\n종료합니다.")
    else:
        run_once()


if __name__ == "__main__":
    main()
