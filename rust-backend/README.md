# Rust Backend

TS 프론트엔드 개발자가 Rust 백엔드 개발자가 되기 위한 학습 워크스페이스. 선생님: Ferris (Buzz `#study_rust`).

## 📱 모바일로 읽기 (출퇴근용)

GitHub는 HTML을 렌더하지 않으므로, 각 레슨의 **마크다운 요약**을 `mobile/`에 둔다. 폰에서는 이 폴더만 보면 된다.

| # | 레슨 | 모바일 | 데스크톱(퀴즈·전체) |
|---|------|--------|---------------------|
| 1 | Ownership: 값의 주인은 한 명 | [mobile/0001](mobile/0001-ownership-move.md) | [lessons/0001](lessons/0001-ownership-move.html) |

## 구조

- `MISSION.md` — 왜 배우는가, 성공 기준
- `lessons/` — 데스크톱용 HTML 레슨 (퀴즈 인터랙션 포함). `open lessons/0001-*.html`
- `mobile/` — 같은 레슨의 마크다운 요약. GitHub 모바일에서 읽기
- `reference/` — 치트시트. 레슨은 잊혀도 이건 다시 본다
- `learning-records/` — 무엇을 이해했는지 기록 (다음 레슨 난이도 결정에 사용)
- `RESOURCES.md` — 신뢰할 수 있는 출처 목록
- `assets/` — 레슨 공용 CSS/JS

## 과제 코드

과제 프로젝트는 `rust-backend/exercises/<lesson-slug>/`에 `cargo new`로 만든다. 예: `exercises/rust-01-ownership/`.
