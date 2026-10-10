# Rust Backend Resources

## Knowledge

- [The Rust Programming Language (The Rust Book)](https://doc.rust-lang.org/book/)
  공식 교과서. Use for: ownership/borrowing(ch04), enum/match(ch06), error handling(ch09), trait/generics(ch10), lifetimes(ch10.3), async(ch17). 모든 언어 기초 레슨의 1차 출처.
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
  실행 가능한 짧은 예제 모음. Use for: 레슨 과제 코드의 패턴 확인.
- [Rustlings](https://github.com/rust-lang/rustlings)
  컴파일 에러를 고치는 소형 연습문제. Use for: 레슨 후 spacing/interleaving용 추가 연습.
- [docs.rs](https://docs.rs/)
  크레이트 API 문서. Use for: axum/tokio/sqlx/serde의 현재 시그니처 확인. 기억에 의존하지 말 것.
- [Tokio tutorial](https://tokio.rs/tokio/tutorial)
  async 런타임 공식 튜토리얼. Use for: async/await, task, channel.
- [axum docs](https://docs.rs/axum/latest/axum/)
  HTTP 프레임워크 공식 문서. Use for: Router, extractor, handler, middleware.
- [sqlx](https://github.com/launchbadge/sqlx)
  컴파일 타임 쿼리 검증 DB 라이브러리. Use for: PostgreSQL 연동, 마이그레이션.
- [Zero To Production in Rust (Luca Palmieri)](https://www.zero2prod.com/)
  axum/actix + sqlx로 실제 서비스를 만드는 책. Use for: 2단계(백엔드 핵심)·3단계(실무) 커리큘럼의 뼈대.
- [Jon Gjengset — Crust of Rust (YouTube)](https://www.youtube.com/playlist?list=PLqbS7AVVErFiWDOAVrPt7aYmnuuOLYvOa)
  중급 심화 영상. Use for: lifetimes, iterators, Send/Sync를 깊게 볼 때.

## Wisdom (Communities)

- [Rust Users Forum](https://users.rust-lang.org/)
  공식 Q&A 포럼, 친절하고 정확함. Use for: borrow checker 막힐 때 코드 리뷰 요청.
- [r/rust](https://www.reddit.com/r/rust/)
  Use for: 생태계 동향, 크레이트 선택 의견.
- [This Week in Rust](https://this-week-in-rust.org/)
  주간 뉴스레터. Use for: 출퇴근 모바일 읽기.
- 한국 Rust 커뮤니티: [Rust 한국 사용자 그룹 (rust-kr)](https://rust-kr.org/)
  Use for: 한국어 질문, 오프라인 모임.

## Gaps
- 아직 레슨에 쓸 한국어 번역본 Rust Book 링크 미확인 (doc.rust-kr.org 검증 필요)
