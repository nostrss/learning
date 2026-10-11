# Notes

## 학습자 선호 (2026-10-10)
- 주 5시간. 출퇴근 모바일 학습이 가능하면 더 투자할 의향 있음.
- 모바일 경로: 레슨 HTML은 로컬 파일이라 모바일에서 못 연다. Blossom 업로드 링크는 인증이 필요해 외부 브라우저에서 안 열림(2026-10-10 curl로 확인: "authentication failed"). → 각 레슨마다 채널에 **모바일 요약(마크다운)** 을 함께 올린다. 핵심 규칙 + 퀴즈 + 과제만 압축.
- 환경: macOS, rustc/cargo 1.95.0, 작업 폴더 ~/github.

## 작업 규칙
- 레슨 코드는 반드시 `.scratch/rs/`에서 rustc로 컴파일 검증 후 레슨에 넣는다.
- 과제 폴더: `~/github/learning/rust-backend/exercises/<lesson-slug>/`. 워크스페이스 실체는 `~/github/learning/rust-backend` (GitHub nostrss/learning), `~/.buzz/LEARNING/RUST_BACKEND`는 심볼릭 링크.
- 2026-10-10 jintagi 결정: 모바일/데스크톱 분리 없이 **마크다운 레슨 하나**로 통합. HTML/assets 폐기. 퀴즈 정답은 `<details>`. 레슨마다 `lessons/NNNN-*.md` + 필요 시 `reference/*.md` + README 표 갱신 + push. 인터랙티브 퀴즈가 필요해지면 GitHub Pages 검토.
- 2026-10-10: jintagi가 Claude 아티팩트 제안 → Buzz 환경엔 Artifact 도구 없음. 대안으로 채널 canvas(`buzz canvas set`, 마크다운)에 "현재 레슨" 요약을 올림. 폰에서 렌더되는지 jintagi 확인 대기. 플랜 B: GitHub 공개 repo에 마크다운 푸시(jintagi 승인 필요).
- 2026-10-10 13:13 jintagi 제안: 블로그(~/github/nostrssme, apps/blog/data/blog/*.mdx, nostrss.me, GitHub Pages main 자동 배포)에 학습 내용 남기기. WebSocket 시리즈(260726-websocket-*.mdx + 용어집) 선례 있음. Ferris 추천: B 모드(레슨은 learning repo, 블로그는 jintagi가 쓰는 TIL, Ferris는 골격+리뷰, 용어집은 Ferris 관리). 결정 대기.
- 2026-10-10 13:15 블로그 결정: B 모드 협업형. (1) jintagi가 과제 후 채널에 거친 초안(배운 것 3줄·막힌 지점 1개·고친 코드) → (2) Ferris가 MDX로 구조화하고 오류는 고치지 않고 표시만 → (3) jintagi가 최종 수정·본인 이름으로 push. 용어집 rust-glossary.mdx는 Ferris가 레슨마다 갱신. 블로그 경로 ~/github/nostrssme/apps/blog/data/blog/, 파일명 YYMMDD-slug.mdx, frontmatter는 WebSocket 시리즈 참조.
- 2026-10-10 13:16 jintagi 확정: 레슨은 learning repo, 블로그 글은 jintagi가 직접 작성. Ferris는 초안을 받으면 구조화·오류 표시로 돕되, 먼저 나서서 MDX를 쓰지 않는다.
