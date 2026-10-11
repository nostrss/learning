# Lesson 2 · Borrowing: 넘기지 말고 빌려주기

약 15분 · 목표: Lesson 1의 `shout`를 소유권 이동 없이 호출하고, `&`와 `&mut`의 규칙 하나로 `E0502`를 읽고 고친다.

## 0. 복습 (먼저 머리로만 답하기)

`let t = (1, String::from("hi")); let u = t;` 다음에 `t`를 쓸 수 있을까?

<details><summary>정답</summary>못 쓴다. 튜플 안에 <code>String</code>(힙 소유)이 있으니 튜플 전체가 <code>Copy</code>가 아니고, 통째로 move된다. Copy 튜플은 "Copy 타입만으로" 된 것뿐. (<a href="./0001-ownership-move.md#4-예외-copy-타입은-이동하지-않는다">Lesson 1 · 4절</a>)</details>

> **Q&A (2026-10-11) · 이 문법은 뭔가?**
> - `(1, String::from("hi"))`는 **튜플**. TS의 `[number, string]` tuple과 같다. 타입은 `(i32, String)`. 접근은 `t.0`, `t.1` (TS `t[0]`), 구조 분해는 `let (n, s) = t;` (TS `const [n, s] = t`).
> - `String::from(...)`의 `::`는 타입에 붙은 함수(**associated function**) 호출. JS `Array.from(...)` 같은 static 메서드. ([5.3](https://doc.rust-lang.org/book/ch05-03-method-syntax.html#associated-functions))
> - `"hi"`만 쓰면 타입이 `&str`(고정 문자열을 가리키는 참조). `String::from`은 이를 힙에 복사해 소유하는 `String`을 만든다. `&str`은 Lesson 3에서. ([4.1 · The String Type](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#the-string-type))

## 1. Lesson 1의 불편함

방법 B는 이랬다:

```rust
fn shout(name: String) -> (String, String) { ... }
let (name, loud) = shout(name);   // 받았다가 다시 돌려받기
```

함수에 값을 **보여주기만** 하고 싶은데, 주인까지 넘겼다가 돌려받는 셈이다. Book 4.2도 정확히 이 튜플 반환 코드에서 출발한다. ([4.2 · References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html))

## 2. `&`: 주인은 그대로, 보기만 빌려준다

```rust
fn shout(name: &String) -> String {   // &String = String을 빌린 참조
    name.to_uppercase()
}

fn main() {
    let name = String::from("jintagi");
    let loud = shout(&name);   // &name: 빌려준다. 소유권 이동 없음
    println!("{loud}");        // JINTAGI
    println!("{name}");        // jintagi ✅ 여전히 주인
}
```

```text
name: [ptr|len|cap] ──▶ 힙 "jintagi"
  ▲
  └── 참조(&name): name을 가리키기만 함. drop 책임 없음
```

- `&name`을 만드는 것을 **borrowing**이라 한다.
- 참조는 주인이 아니므로 scope를 벗어나도 아무것도 해제하지 않는다. → double free 걱정이 사라진다.
- 기본 참조는 **읽기 전용**이다.

> **TS 비유와 어긋나는 지점.** TS에서 객체를 함수에 넘기면 함수가 마음대로 수정할 수 있다. Rust의 `&`는 수정이 **금지**된 참조다. 수정하려면 따로 허락을 받아야 한다 → `&mut`.

## 3. `&mut`: 수정 권한까지 빌려준다

```rust
fn add_suffix(name: &mut String) {
    name.push_str("님");
}

fn main() {
    let mut n = String::from("jintagi");   // 변수 자체가 mut이어야 함
    add_suffix(&mut n);
    println!("{n}");                        // jintagi님
}
```

`mut`를 빼면 컴파일러가 바로 알려준다: `error[E0596]: cannot borrow 's' as mutable, as it is not declared as mutable`. 호출하는 쪽에서도 `&mut`을 **명시**해야 한다는 점이 TS와 다르다. 코드를 읽는 사람이 "여기서 값이 바뀐다"를 호출부에서 바로 안다.

## 4. 규칙은 하나

> 어느 시점이든 **`&`는 여러 개** 또는 **`&mut`는 딱 하나**. 둘을 동시에 가질 수는 없다.
> ([4.2 · Mutable References](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html#mutable-references))

읽는 사람이 여럿이면 괜찮다. 누가 쓰는 중에 다른 누가 읽거나 쓰면 안 된다. 멀티스레드의 **data race**를 컴파일 타임에 막는 규칙이다.

```rust
let mut s = String::from("hello");
let r1 = &s;          // 읽기 대여
let r2 = &mut s;      // ❌ 읽기 대여가 아직 살아 있는데 쓰기 대여
r2.push_str("!");
println!("{r1}");     // r1을 여기서 또 쓰니까 "살아 있음"
```

rustc 1.95.0 실제 출력:

```
error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
 --> src/main.rs:4:14
  |
3 |     let r1 = &s;
  |              -- immutable borrow occurs here
4 |     let r2 = &mut s;
  |              ^^^^^^ mutable borrow occurs here
5 |     r2.push_str("!");
6 |     println!("{r1}");
  |                -- immutable borrow later used here
```

**대여는 마지막으로 쓰인 줄에서 끝난다.** `println!("{r1}")`을 `&mut` 위로 올리면 `r1`의 대여가 먼저 끝나므로 통과한다. 에러 메시지의 세 줄(`occurs here` / `occurs here` / `later used here`)이 정확히 이 구간을 보여준다.

## 5. 퀴즈

**Q1.** `shout(&name)` 호출이 끝난 직후 `name`은?
- ⓐ 이동됐다가 돌아와서 다시 쓸 수 있다
- ⓑ 이동한 적이 없어서 그대로 쓸 수 있다
- ⓒ 참조가 해제되면서 함께 drop되어 없다

<details><summary>정답</summary>ⓑ. <code>&</code>는 빌려줄 뿐 소유권을 옮기지 않는다. 참조는 주인이 아니라 해제도 하지 않는다.</details>

**Q2.** 동시에 살아 있어도 컴파일되는 조합은?
- ⓐ `&s` 두 개
- ⓑ `&mut s` 두 개
- ⓒ `&s`와 `&mut s`

<details><summary>정답</summary>ⓐ. 읽기 대여는 여러 개 가능. 쓰기 대여는 혼자여야 한다 (ⓑ는 E0499, ⓒ는 E0502).</details>

**Q3.** `fn f(v: &String)` 안에서 `v.push_str("x")`를 하면?
- ⓐ 원본 String 끝에 그대로 "x"가 붙는다
- ⓑ 복사본에만 붙고 원본은 변하지 않는다
- ⓒ 읽기 전용 참조라서 컴파일 에러가 난다

<details><summary>정답</summary>ⓒ. <code>&</code>는 읽기 전용. 수정하려면 시그니처가 <code>&mut String</code>이어야 한다.</details>

## 6. 과제 (10분, 직접 타이핑)

1. `cd ~/github/learning/rust-backend/exercises && cargo new rust-02-borrowing && cd rust-02-borrowing`
2. Lesson 1의 `shout`를 **`&String`을 받도록** 고쳐서 `JINTAGI` 다음 줄 `jintagi`가 출력되게. 튜플 반환, `.clone()` 금지.
3. `add_suffix(name: &mut String)`를 추가하고 `main`에서 호출해 `jintagi님`을 출력.
4. 일부러 4절의 E0502 코드를 쳐서 에러를 보고, **줄 순서만 바꿔서** 통과시키기. 결과는 `hello` 다음 줄 `hello!`.

<details><summary>힌트 (막혔을 때만)</summary>
2: 호출부도 <code>shout(&name)</code>으로 바꿔야 한다.<br>
3: <code>let mut</code> 잊지 말 것. 호출은 <code>add_suffix(&mut name)</code>.<br>
4: <code>r1</code>을 마지막으로 쓰는 줄을 <code>let r2 = &mut s;</code> 위로. 마지막에 <code>println!("{s}")</code>.
</details>

코드를 `#study_rust`에 올리면 리뷰. 한 줄 질문도 같이: **"`&mut`가 하나만 허용되는 게 왜 유용할까?"** 네 말로.

---

**이번 레슨의 승리:** 함수에 값을 넘길 때 "주기(move) / 보여주기(`&`) / 고치게 하기(`&mut`)" 셋 중 하나를 고를 수 있게 됐다.

**더 읽기:** [The Rust Book · 4.2 References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html) (15분). 치트시트: [reference/ownership.md](../reference/ownership.md#borrowing)

> 각주: 실무에선 `&String`보다 `&str`을 더 많이 받는다. 이유는 slice를 배우는 Lesson 3에서.

다음: Lesson 3 · Slices와 `&str`. 질문은 `@Ferris`.
