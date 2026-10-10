# Ownership 치트시트

## 규칙 ([Rust Book 4.1](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#ownership-rules))
1. 모든 값에는 owner가 있다.
2. owner는 동시에 하나뿐이다.
3. owner가 scope를 벗어나면 값은 drop된다.

## TS ↔ Rust 대응표

| TypeScript | Rust | 차이 |
|---|---|---|
| `const b = a;` (객체) | `let b = a;` (`String`) | TS: 참조 공유. Rust: **move**, a는 무효 |
| `const b = a;` (number) | `let b = a;` (`i32`) | 둘 다 복사. Rust는 `Copy` trait |
| `structuredClone(a)` | `a.clone()` | Rust는 항상 명시적 |
| `f(obj)` | `f(s)` with `s: String` | Rust: 소유권이 함수로 이동 |
| GC가 해제 | scope 끝에서 drop | 해제 시점이 컴파일 타임에 확정 |

## Copy 타입 ([4.1 · Copy](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#stack-only-data-copy))
모든 정수, `bool`, 모든 부동소수점, `char`, Copy 타입만으로 된 튜플. 그 외(`String`, `Vec`, 대부분의 struct)는 move.

## 에러 읽기

| 코드 | 뜻 | 첫 대응 |
|---|---|---|
| `E0382` | move된 값을 다시 사용 | `value moved here` 줄을 찾는다. 복사가 필요하면 `.clone()`, 아니면 빌리기(`&`, Lesson 2) |

레슨: [Lesson 1](../lessons/0001-ownership-move.md)
