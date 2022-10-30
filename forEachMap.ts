interface Array<T> {
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void;
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];
}

[1, 2, 3].forEach((item) => {
  console.log(item);
});

["1", 2, true].forEach((item) => {
  // 어떻게 3타입 다 구별 하지? -> <T>때문
  // 제네릭으로 해야 add('1', 2)처럼 타입이 일치하지 않는 경우를 걸러냄
  console.log(item);
});

// string으로 추론되는 이유는 위에 제네릭을 number나 string으로 다 바꿔보면 됨
const strings = [1, 2, 3].map((item) => item.toString()); // ['1', '2', '3']
// 리턴값의 callback function이 toString 그럼 위에 U도 String

// 아래 타입을 보고 타입 만들기
interface Arr<T> {
  forEach(callback: (item: T) => void): void;
  map<S>(callback: (v: T, i: number) => S): S[];
}

// 에러메세지 거슬러 올라가기 (그때 그때 고친다)
const fa: Arr<number> = [1, 2, 3];
fa.forEach((item) => {
  console.log(item);
  item.toFixed(1);
});
fa.forEach((item) => {
  console.log(item);
  return "3";
});
const fb: Arr<string> = ["1", "2", "3"];
fb.forEach((item) => {
  console.log(item);
  item.charAt(3);
});
fb.forEach((item) => {
  console.log(item);
  return "3";
});

const fc: Arr<number> = [1, 2, 3];
const fd = fc.map((v, i) => v + 1); // [2, 3, 4]
const fe = fc.map((v, i) => v.toString()); // ['2', '3', '4']; string[]
const ff = fc.map((v, i) => v % 2 === 0); // [false, true, false]  boolean[]

const fg: Arr<string> = ["1", "2", "3"];
const fh = fg.map((v) => +v);
