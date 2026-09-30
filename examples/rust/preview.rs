//! Documentation links: [`View`] and [`State`].
#![allow(dead_code)]

/// A reference with an explicit lifetime.
#[derive(Debug, Clone, Copy)]
struct View<'a> {
    text: &'a str,
}

#[derive(Debug)]
enum State<'a> {
    Ready(View<'a>),
    Empty,
}

trait Inspect {
    type Item;
    fn inspect(&self) -> Self::Item;
}

impl<'a> Inspect for View<'a> {
    type Item = usize;

    fn inspect(&self) -> Self::Item {
        self.text.len()
    }
}

impl<'a> View<'a> {
    fn replace(&mut self, text: &'a str) {
        self.text = text;
    }

    fn into_text(self) -> &'a str {
        self.text
    }
}

macro_rules! trace {
    ($value:expr) => {
        println!("value = {:?}", $value)
    };
}

const LIMIT: usize = 8;

unsafe fn first_byte(ptr: *const u8) -> u8 {
    unsafe { *ptr }
}

fn consume(value: String) {
    drop(value);
}

/** Documentation for the entry point. */
fn main() {
    let mut view = View { text: "hello" };
    let borrowed = &view;
    trace!(borrowed.inspect());

    view.replace("world");
    let text = view.into_text();

    let state = State::Ready(view);
    match state {
        State::Ready(ref item) => trace!(item.inspect()),
        State::Empty => {}
    }

    let result: Result<Option<usize>, ()> = Ok(Some(LIMIT));
    trace!(result);

    'search: for index in 0..LIMIT {
        if index == 2 {
            break 'search;
        }
    }

    let owned = String::from("ownership");
    let closure = move || consume(owned);
    closure();

    let ordinary = "literal {not_a_placeholder}\n";
    let raw = r##"literal {also_not_a_placeholder}\n"##;
    let bytes = b"bytes\x41";
    let raw_bytes = br#"bytes\n"#;
    let byte = b'A';

    println!("text={text:?}; width={:>6}; escaped={{}}", LIMIT);
    println!(r#"raw format: {text:?}, number={:04x}"#, LIMIT);

    let first = unsafe { first_byte(bytes.as_ptr()) };
    trace!((ordinary, raw, raw_bytes, byte, first));
}
