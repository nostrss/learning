# Mission: WebSocket 프로토콜 이론

## Why
프론트엔드 개발자로서 브라우저 WebSocket API를 직접 사용하고 재연결/상태관리 래퍼를 직접 구현하고 있다. 매일 쓰는 기술의 프로토콜 수준 동작 원리(RFC 6455)를 이해하면, 래퍼 설계 결정(재연결 시점, close code 처리, 상태 전이)을 스펙 근거로 내릴 수 있고 네트워크 계층 디버깅이 가능해진다.

## Success looks like
- RFC 6455 원문을 필요할 때 직접 찾아 읽고 해석할 수 있다
- 핸드셰이크, 프레임 구조(opcode, 마스킹), close code를 바이트 수준에서 설명할 수 있다
- "WebSocket은 HTTP인가/웹표준인가"류의 질문에 표준 문서를 근거로 답할 수 있다
- 자신의 재연결 래퍼가 스펙의 어떤 부분(close code 1006, ping/pong 등)에 근거하는지 안다

## Constraints
- 실무와 병행하는 이론 학습 — 레슨은 짧게, 한 번에 하나의 개념
- 브라우저 API 직접 사용자 → Socket.IO 등 라이브러리 추상화 계층은 우선순위 낮음

## Out of scope
- Socket.IO / STOMP 등 상위 프로토콜
- 서버 구현체별 세부사항 (필요해지면 추가)
