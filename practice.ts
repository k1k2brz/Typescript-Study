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

interface Po {
  name: string;
  age: number;
  married: boolean;
}

type poName = Po["name"];

// Po['name' | 'age']가 안되므로   T[S] 이건 안되는 쿼리
type PA<T, S extends keyof T> = {
  // 'name' | 'age'는 Po의 속성이어야 하므로
  // [S in keyof T]?: T[S];
  [Key in S]: T[Key];
};

const yeon: Po = {
  name: "name",
  age: 29,
  married: false,
};

const newYeon: PA<Po, "name" | "age"> = {
  name: "name",
  age: 29,
};

//

interface Obj {
  [key: string]: number;
}

type Records<T extends keyof any, S> = {
  // 객체의 key는 string이나 number나 symbol만 올 수 있기 때문에 extends keyof any
  [key in T]: S;
};

const rcd: Records<string, number> = { a: 3, b: 5, c: 7 };

// infet타입 분석
function zip2(x: number, y: string, z: boolean): { x: number; y: string; z: boolean } {
  return { x, y, z };
}

// 앞 함수제한 + T는 무조건 함수여야 한다
// 뒤
type P_infer<T extends (...args: any) => any> = T extends (...args: infer A) => any ? A : never;
type R_infer<T extends (...args: any) => any> = T extends (...args: any) => infer A ? A : never;
type Parameter = P_infer<typeof zip2>;
type Rett = ReturnType<typeof zip2>;
// index로 number string boolean 타입에 접근 가능
type Fir = Parameter[0];
