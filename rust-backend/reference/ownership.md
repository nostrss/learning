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

- 판단 기준: 해제해야 할 자원(힙 포인터, 파일 핸들)을 소유하면 Copy 불가. `Drop` 구현 타입은 Copy 불가. ([std::marker::Copy](https://doc.rust-lang.org/std/marker/trait.Copy.html))
- 필드가 전부 Copy인 struct는 `#[derive(Clone, Copy)]`로 Copy가 될 수 있다. "원시 타입 = Copy"가 아니다.

## 숫자 타입 ([3.2 · Data Types](https://doc.rust-lang.org/book/ch03-02-data-types.html))
`let a: i32 = 5;`의 `: i32`는 타입 표기(TS `: number`). 추론 시 정수 기본값 `i32`.

| 종류 | 타입 |
|---|---|
| 부호 있는 정수 | `i8` `i16` `i32` `i64` `i128` `isize` |
| 부호 없는 정수 | `u8` `u16` `u32` `u64` `u128` `usize` |
| 부동소수점 | `f32` `f64` (TS `number` = `f64`) |

## 에러 읽기

| 코드 | 뜻 | 첫 대응 |
|---|---|---|
| `E0382` | move된 값을 다시 사용 | `value moved here` 줄을 찾는다. 복사가 필요하면 `.clone()`, 아니면 빌리기(`&`, Lesson 2) |

## Borrowing ([4.2](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html))

| 하고 싶은 것 | 시그니처 | 호출 | 호출 후 원본 |
|---|---|---|---|
| 주기 | `f(s: String)` | `f(s)` | 못 씀 (move) |
| 보여주기 | `f(s: &String)` | `f(&s)` | 그대로 |
| 고치게 하기 | `f(s: &mut String)` | `f(&mut s)` (`let mut s` 필요) | 바뀐 채로 |

규칙: 어느 시점이든 `&` 여러 개 **또는** `&mut` 하나. 대여는 마지막으로 쓰인 줄에서 끝난다.

## 에러 (borrowing)

| 코드 | 뜻 | 첫 대응 |
|---|---|---|
| `E0596` | `mut` 아닌 변수를 `&mut`로 빌림 | `let mut` |
| `E0499` | `&mut` 두 개가 동시에 살아 있음 | 첫 대여의 마지막 사용을 앞으로 |
| `E0502` | `&`가 살아 있는데 `&mut` | `later used here` 줄을 `&mut` 위로 |

레슨: [Lesson 1](../lessons/0001-ownership-move.md) · [Lesson 2](../lessons/0002-borrowing.md)
