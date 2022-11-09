interface Array<T> {
  filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
  filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
}

// 위와 같이 만들어서 type을 1개만 나오게 좁힌다
const predicate = (value: string | number): value is string => typeof value === "string";
// 왜 number | number가 나오는가?
const filtered = ["1", 2, "3", 4, "5"].filter(predicate); // ['1', '3', '5'] string[]

interface Arr<T> {
  // S extends T = S는 T의 부분집합
  filter<S extends T>(callback: (v: T) => v is S): S[];
}
// 간단하게 void로 시작
// callback 만들고 매개변수 넣어보기
// T타입 넣어보고 안되면 S같은거 넣어보고 이런식으로 확장할것

const fj: Arr<number> = [1, 2, 3];
const fk = fj.filter((v): v is number => v % 2 === 0); // [2] number[]
const fl: Arr<number | string> = [1, "2", 3, "4", 5];
const fm = fl.filter((v): v is string => typeof v === "string"); // ['2', '4'] string[]
//혹은 predicate로 묶어서
const predicate2 = (v: string | number): v is number => typeof v === "number";
const fn = fl.filter(predicate2); // [1, 3, 5]  number[];
