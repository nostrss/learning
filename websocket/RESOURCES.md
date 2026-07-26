# WebSocket 프로토콜 Resources

## Knowledge

- [RFC 6455 — The WebSocket Protocol (IETF, 2011)](https://datatracker.ietf.org/doc/html/rfc6455)
  프로토콜의 유일한 규범적 원문. Use for: 핸드셰이크(§4), 프레이밍(§5), 종료(§7), close code(§7.4). 모든 레슨의 최우선 근거.
- [WHATWG WebSockets Standard](https://websockets.spec.whatwg.org/)
  브라우저 `WebSocket` API의 규범 문서 (HTML Standard에서 분리됨). Use for: API 동작, readyState, 이벤트 순서, close() 알고리즘.
- [MDN — The WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
  API 개요와 브라우저 호환성, bfcache 주의사항, WebSocketStream/WebTransport 동향. Use for: 실무 관점 요약과 스펙으로 가는 링크 허브.
- [RFC 8441 — Bootstrapping WebSockets with HTTP/2 (2018)](https://datatracker.ietf.org/doc/html/rfc8441)
  HTTP/2 위에서의 WebSocket (Extended CONNECT). Use for: "HTTP/2에서는 Upgrade가 없는데?" 질문.
- [RFC 9220 — Bootstrapping WebSockets with HTTP/3 (2022)](https://datatracker.ietf.org/doc/html/rfc9220)
  HTTP/3 버전. Use for: 최신 전송 계층 위에서의 WebSocket.
- [논문: "Talking to Yourself for Fun and Profit" — Huang, Chen, Barth, Rescorla, Jackson (W2SP 2011)](https://www.adambarth.com/papers/2011/huang-chen-barth-rescorla-jackson.pdf)
  RFC 6455이 [TALKING]으로 인용하는 프록시 캐시 오염 실증 논문. 마스킹 규칙이 존재하는 이유의 1차 근거. Use for: §10.3 심화, 마스킹 설계 배경.
- [High Performance Browser Networking, Ch. 17 WebSocket — Ilya Grigorik (O'Reilly, 무료 공개)](https://hpbn.co/websocket/)
  프로토콜과 성능 관점을 잇는 최고의 해설서. Use for: 프레이밍 오버헤드, 배압, 배포 시 프록시 문제.

## Wisdom (Communities)

- (아직 미탐색 — 사용자 선호 확인 후 추가)

## Gaps

- 압축 확장 (RFC 7692, permessage-deflate) 자료 미수집 — 프레이밍 학습 후 필요
- 재연결 전략에 대한 규범 문서는 없음 (스펙 밖 영역) — 커뮤니티/실무 자료로 보강 필요
