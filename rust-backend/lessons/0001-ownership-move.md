# Lesson 1 · Ownership: 값의 주인은 한 명

약 15분 · 목표: `let b = a;` 한 줄이 TypeScript와 Rust에서 왜 다른 뜻인지 설명하고, `E0382` 에러를 직접 만들고 직접 고친다.

## 1. 네가 이미 아는 것 (TypeScript)

```ts
const a = { name: "jintagi" };
const b = a;      // 같은 객체를 가리킴
b.name = "ferris";
console.log(a.name); // "ferris"
```

힙에 객체 하나, 그걸 가리키는 참조가 둘. 누가 "주인"인지 아무도 신경 안 쓴다. 참조가 다 사라지면 GC가 언젠가 치운다.

## 2. Rust의 규칙 세 줄

[Rust Book 4.1 · Ownership Rules](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#ownership-rules)

1. Rust의 모든 값에는 **owner**가 있다.
2. owner는 한 번에 **하나**뿐이다.
3. owner가 scope를 벗어나면 값은 **drop**(해제)된다.

> **GC가 없다는 뜻.** 3번 규칙이 메모리 해제의 전부다. 주인이 둘이면 두 번 해제(double free)가 생기므로 2번 규칙이 필요하다.

## 3. 그래서 `let s2 = s1;`은 이동(move)이다

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;              // 소유권이 s1 → s2
    println!("{s1}, world!"); // ❌ s1은 더 이상 주인이 아님
    println!("{s2}");
}
```

rustc 1.95.0 실제 출력:

```
error[E0382]: borrow of moved value: `s1`
 --> src/main.rs:4:16
  |
2 |     let s1 = String::from("hello");
  |         -- move occurs because `s1` has type `String`,
  |            which does not implement the `Copy` trait
3 |     let s2 = s1;
  |              -- value moved here
4 |     println!("{s1}, world!");
  |                ^^ value borrowed here after move
  |
help: consider cloning the value if the performance cost is acceptable
  |
3 |     let s2 = s1.clone();
  |                ++++++++
```

TS의 "참조 복사"가 Rust에서는 **주인 교체**다. 힙의 `"hello"`는 그대로, 책임지는 변수만 `s2`로 바뀐다. 진짜 두 개가 필요하면 명시적으로 `s1.clone()`. ([4.1 · Move](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#variables-and-data-interacting-with-move))

## 4. 예외: `Copy` 타입은 이동하지 않는다

```rust
let a: i32 = 5;
let b = a;           // 복사. a도 b도 살아 있음
println!("{a} {b}"); // 5 5
```

스택에 통째로 올라가는 타입은 `Copy`: 모든 정수, `bool`, 모든 부동소수점, `char`, `Copy` 타입만으로 된 튜플. ([4.1 · Copy](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#stack-only-data-copy))

> **경험칙.** 힙을 쓰는 타입(`String`, `Vec`, 대부분의 struct)은 move. 숫자처럼 작은 것은 copy. 헷갈리면 컴파일러가 "does not implement the `Copy` trait"라고 알려준다.

> **Q&A (2026-10-11)**
>
> **Q. `let a: i32`의 `i32`는 이름인가?** 아니다, 타입이다. `: i32`는 TS의 `let a: number`와 같은 타입 표기. `i32` = 부호 있는 32비트 정수. Rust는 숫자 타입이 크기·부호별로 나뉜다: `i8`~`i128`/`isize`, `u8`~`u128`/`usize`, `f32`/`f64`. 생략하면 추론되고 정수 기본값은 `i32`. ([3.2 · Data Types](https://doc.rust-lang.org/book/ch03-02-data-types.html))
>
> **Q. `Copy` 타입이 정확히 뭔가?** "비트 그대로 복제해도 안전하다"는 표시(marker trait). `String`은 스택에 (ptr, len, cap)만 있고 글자는 힙에 있다. 이걸 복사하면 힙의 주인이 둘이 되고, GC가 없으니 둘 다 해제하면 double free. 그래서 원본을 무효화한다(move). `i32`는 해제할 자원이 없으니 복사하고 원본도 살린다(Copy). 기준은 "원시 타입이냐"가 아니라 **"해제해야 할 자원을 소유하느냐"**. `Drop`을 구현한 타입은 `Copy`가 될 수 없다. ([std::marker::Copy](https://doc.rust-lang.org/std/marker/trait.Copy.html))
>
> **Q. "비트 그대로 복제"란, 왜 안전하지 않을 수 있나?** 변수가 차지한 스택 바이트를 의미를 따지지 않고 그대로 베끼는 것. `i32`는 바이트 안에 값(5)이 다 있으니 베껴도 독립적이다. `String`의 바이트는 힙 주소(ptr)라서 베끼면 두 변수가 같은 힙을 "내 것"으로 믿는다 → scope 끝에서 둘 다 해제(**double free**), 한쪽 해제 후 다른 쪽이 읽기(**dangling pointer**). GC가 없으니 주인은 하나여야 하고, 그래서 베낀 뒤 원본을 무효화한다(move). ([4.1 · Move, Figure 4-2/4-4](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#variables-and-data-interacting-with-move))
>
> ```text
> i32    a: [5]  b: [5]                         값 자체 → 독립
> String s1: [ptr=0x100|len|cap] ─┐
>        s2: [ptr=0x100|len|cap] ─┴▶ 힙 "hello"  주인 둘 → 위험
> ```
>
> ```rust
> #[derive(Clone, Copy)]
> struct Point { x: i32, y: i32 }  // 필드가 전부 Copy → Copy 가능
>
> struct User { name: String }     // String 보유 → Copy 불가, move
> ```

## 5. 함수 호출도 move다

```rust
fn shout(name: String) -> String {
    name.to_uppercase()
}

fn main() {
    let name = String::from("jintagi");
    let loud = shout(name);   // name의 소유권이 shout으로 이동
    println!("{loud}");
    println!("{name}");       // ❌ E0382: borrow of moved value: `name`
}
```

## 6. 퀴즈

**Q1.** `let s2 = s1;` (둘 다 `String`) 직후 상태는?
- ⓐ s1과 s2가 같은 힙 데이터를 함께 공유한다
- ⓑ s1은 무효가 되고 s2가 유일한 주인이 된다
- ⓒ s1의 힙 데이터가 s2로 복사되어 둘 다 유효

<details><summary>정답</summary>ⓑ. String은 Copy가 아니므로 move. 힙 데이터는 하나, 주인만 바뀐다.</details>

**Q2.** `let b = a;` 뒤에도 `a`를 계속 쓸 수 있는 타입은?
- ⓐ `String`
- ⓑ `Vec<u8>`
- ⓒ `(u8,u8)`

<details><summary>정답</summary>ⓒ. Copy 타입만으로 이루어진 튜플은 Copy. String과 Vec은 힙을 소유하므로 move.</details>

**Q3.** `fn f(s: String)`을 `f(name)`으로 호출한 뒤 `name`은?
- ⓐ 이동됐지만 함수가 끝나면 자동으로 돌아온다
- ⓑ 이동됐고 다시 쓰면 컴파일 에러 E0382가 난다
- ⓒ 복사됐고 원본 변수는 그대로 남아 유효하다

<details><summary>정답</summary>ⓑ. 파라미터가 소유 타입이면 호출은 move. 돌려받으려면 함수가 반환해야 한다. 다음 레슨에서 더 좋은 방법(<code>&</code>)을 배운다.</details>

## 7. 과제: E0382를 두 가지 방법으로 고치기 (10분, 집에서)

1. `cd ~/github/learning/rust-backend && mkdir -p exercises && cd exercises && cargo new rust-01-ownership && cd rust-01-ownership`
2. `src/main.rs`에 5번의 `shout` 코드를 **복붙 말고 직접 타이핑**
3. `cargo run` → E0382 확인. `value moved here`가 어디를 가리키는지 읽기
4. **방법 A**: `shout` 시그니처는 그대로, `main`만 고쳐서 통과
5. **방법 B**: `.clone()` 없이 `shout`가 `name`의 소유권을 **돌려주도록** 시그니처와 본문을 바꾸기 (힌트: 반환 타입이 튜플)
6. 두 방법 모두 출력이 `JINTAGI` 다음 줄 `jintagi`

<details><summary>힌트 (막혔을 때만)</summary>
방법 A: 컴파일러가 <code>help:</code>에 이미 답을 써 줬다.<br>
방법 B: <code>fn shout(name: String) -> (String, String)</code>. <code>to_uppercase()</code>는 새 String을 만들고 <code>name</code>은 건드리지 않으니 둘 다 돌려줄 수 있다. <code>main</code>에서 <code>let (name, loud) = shout(name);</code>.
</details>

완성한 두 버전을 `#study_rust`에 올리면 리뷰. **방법 B가 왜 불편한지 한 줄**도 같이 — 그게 Lesson 2(borrowing, `&`)의 출발점.

---

**이번 레슨의 승리:** E0382를 보고 "아, 여기서 move됐구나"라고 읽을 수 있게 됐다.

**더 읽기:** [The Rust Book · 4.1 What Is Ownership?](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html) (15분). 치트시트: [reference/ownership.md](../reference/ownership.md)

다음: Lesson 2 · Borrowing (`&`) — 소유권을 넘기지 않고 빌려 쓰기. 질문은 `@Ferris`.
