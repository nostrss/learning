fn shout(name: &String) -> String {
    name.to_uppercase()
}

fn main() {
    let name = String::from("jintagi");
    let loud = shout(&name);   // name의 소유권이 shout으로 이동
    println!("{loud}");
    println!("{name}");       // ❌ E0382: borrow of moved value: `name`
}