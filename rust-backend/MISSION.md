# Mission: Rust 백엔드 개발자 되기

## Why
jintagi는 3년 차 프론트엔드 개발자(JS/TS)로, 지금까지 `fetch`로 소비만 하던 API를 직접 설계·구현·운영하는 쪽으로 커리어를 넓히려 한다. 목표는 포트폴리오에 올릴 수 있는 Rust 백엔드 서비스 한 개를 손으로 완성하고, 실무 Rust 백엔드 팀에 투입 가능한 수준이 되는 것.

## Success looks like
- axum + sqlx + PostgreSQL로 인증(JWT)이 있는 REST API를 설계하고, 본인이 만든 TypeScript 프론트에서 호출한다
- borrow checker 에러(E0382, E0499, E0502 등)를 보고 원인을 말로 설명하고 스스로 고친다
- `Result`/`?`/thiserror로 에러 처리를 설계하고 unit + integration 테스트를 작성한다
- tracing 로깅, 환경변수 설정, Docker 배포까지 포함한 서비스를 GitHub 포트폴리오로 공개한다

## Constraints
- 주 5시간. 출퇴근 시간에 모바일로 읽을 수 있는 형태가 있으면 그 이상도 가능 (2026-10-10 기준)
- 레슨 하나 15분 이내, 항상 컴파일되는 코드 + 직접 타이핑 과제 포함
- 환경: macOS, rustc/cargo 1.95.0 설치 완료 (2026-10-10 확인)
- 설명은 TS/JS 비유에서 출발하되, 비유가 깨지는 지점(GC 없음, move, &mut 단일성)은 명시

## Out of scope
- 프로그래밍 기초(변수, 함수, 비동기 개념, HTTP, JSON) 재교육
- 임베디드, WASM, 게임, 시스템 프로그래밍 방향
- unsafe Rust, 매크로 작성 (실무 필요 전까지)
