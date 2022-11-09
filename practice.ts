// Type추론 연습

interface pArr<T> {
  forEach(callback: (item: T) => void): void;
}

const pra: pArr<number> = [1, 2, 3];

pra.forEach((item) => {
  console.log(item);
  item.toFixed(1);
});
pra.forEach((item) => {
  console.log(item);
  return "3";
});
const pra2: pArr<string> = ["1", "2", "3"];

pra2.forEach((item) => {
  console.log(item);
  item.charAt(3);
});
pra2.forEach((item) => {
  console.log(item);
  return "3";
});

interface mapArr<T> {
  forEach(callback: (item: T, index: number) => void): void;
  // toString까지 충족시키는 새로운 제네릭
  map<S>(callback: (v: T, i: number) => S): S[];
  // 커스텀 타입가드
  filter<S extends T>(callback: (v: T) => v is S): S[];
}

const m1: mapArr<number> = [1, 2, 3];
const m2 = m1.map((v, i) => v + 1); // [2, 3, 4]
const m3 = m1.map((v, i) => v.toString()); // ['2', '3', '4']
const m4 = m1.map((v, i) => v % 2 === 0); // [false, true, false] boolean[]

const m5: mapArr<String> = ["1", "2", "3"];
const m6 = m5.map((v) => +v);

const f1 = m1.filter((v): v is number => v % 2 === 0); // [2] number[]

const f2: mapArr<number | string> = [1, "2", 3, "4", 5];
const f3 = f2.filter((v): v is string => typeof v === "string"); // ['2', '4'] string[]
// 형식 조건자로 만들어주어야 한다
const f4 = f2.filter((v): v is number => typeof v === "number"); // [1, 3, 5]  number[]

// Partial

interface Profiles {
  name: string;
  age: number;
  married: boolean;
}

// name에 접근
// type Name1 = Profiles['name'];

type PP<T> = {
  [Key in keyof T]?: T[Key];
  // [Key in keyof Profiles]?: string
};

const owo: Profiles = {
  name: "name",
  age: 30,
  married: false,
};

const newOwo: PP<Profiles> = {
  name: "name",
  age: 30,
};

// 옵셔널로 만들어줌
// const newOwo: Partial<Profiles> = {
//   name: "name",
//   age: 30,
// };
