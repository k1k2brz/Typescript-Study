"use strict";
// 빈 배열일 때 never라는 타입이 나옴
// try {
//   const array = [];
//   array[0];
// } catch (err) {
//   err;
// }
// type이 궁금하다면 f12 눌러서 확인
// 뒤에 느낌표를 붙이면 절대 null이나 undefined가 아님을 보증
// const head = document.querySelector("#head")!; (비추)
const head = document.querySelector("#head");
if (head) {
    head.innerHTML = "hello world";
    console.log(head);
}
const a = "world";
const b = `hello ${a}`;
// const c: Greeting = 'h'
let arr = [];
let arr2 = [];
function rest(...args) {
    console.log(args);
}
// 위가 string이므로 string만 들어감
rest("1", "2", "3");
const tuple = ["1", 1];
tuple[0] = "hello";
// push까진 type 정확히 인식 못함
tuple.push("hello");
// 이건 남긴다
// as const를 빼면 Type이 정확한 숫자가 아니라 Number로 뜸
const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
};
// as const 사용하면 readonly로 type이 고정된다
const d = 0 /* EDirection.Up */;
const e = 2 /* EDirection.Left */;
function walk(dir) { }
const obj = { a: "123", b: "hello", c: "world" };
const obj2 = { a: "123", b: "hello", c: "world" };
function run(dir) { }
walk(2 /* EDirection.Left */);
run(ODirection.Right);
const f = { f: "hello" };
const g = { g: "hello" };
const h = { hello: "world", zero: "cho" };
const j = { breath: true, breed: true };
const zercho = { breath: true, breed: true, think: true };
const obj1 = { k: "hello", j: "world" };
const obj2 = { k: "hello", l: "world" };
const obj3 = { a: "hello", b: "world" };
// 잉여 속성 검사
const obj4 = obj;
// void
// 3개의 void 타입
function c() {
    // return 값을 넣으면 안되는 함수
    // return undefined; 는 가능
    return;
}
// 매개변수와 매서드는 return값 가능
function aa(callback /** 리턴값을 사용하지 않겠다 */) { }
// callback은 void인데 리턴값이 있어도 된다
aa(() => {
    return "3";
});
// 메서드도 return값이 존재할 수 있음
const human = {
    talk() {
        return "abc";
    },
};
const bb = {
    talk() {
        return 3;
    },
};
// unknown - 타입을 모르겠을 때
const bbb = bb.talk();
bbb.talk();
