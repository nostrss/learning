# Notes

## 학습자 선호 (2026-10-10)
- 주 5시간. 출퇴근 모바일 학습이 가능하면 더 투자할 의향 있음.
- 모바일 경로: 레슨 HTML은 로컬 파일이라 모바일에서 못 연다. Blossom 업로드 링크는 인증이 필요해 외부 브라우저에서 안 열림(2026-10-10 curl로 확인: "authentication failed"). → 각 레슨마다 채널에 **모바일 요약(마크다운)** 을 함께 올린다. 핵심 규칙 + 퀴즈 + 과제만 압축.
- 환경: macOS, rustc/cargo 1.95.0, 작업 폴더 ~/github.

## 작업 규칙
- 레슨 코드는 반드시 `.scratch/rs/`에서 rustc로 컴파일 검증 후 레슨에 넣는다.
- 과제 폴더: `~/github/learning/rust-backend/exercises/<lesson-slug>/`. 워크스페이스 실체는 `~/github/learning/rust-backend` (GitHub nostrss/learning), `~/.buzz/LEARNING/RUST_BACKEND`는 심볼릭 링크. 레슨마다 `mobile/NNNN-*.md`를 만들고 README 표에 추가 후 push.
- 2026-10-10: jintagi가 Claude 아티팩트 제안 → Buzz 환경엔 Artifact 도구 없음. 대안으로 채널 canvas(`buzz canvas set`, 마크다운)에 "현재 레슨" 요약을 올림. 폰에서 렌더되는지 jintagi 확인 대기. 플랜 B: GitHub 공개 repo에 마크다운 푸시(jintagi 승인 필요).
