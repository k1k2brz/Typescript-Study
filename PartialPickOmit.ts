interface Profile {
  name: string;
  age: number;
  married: boolean;
}
type Name = Profile["name"];

// Partial을 Optional로 만들면
// type P<T> = {
//   [Key in keyof T]?: T[Key];
// };

// Pick을 Optional로 만들면
// type P<T, S extends keyof T> = {
// [key in S]: T[Key];
// }

const zero: Profile = {
  name: "zero",
  age: 29,
  married: false,
};

// Partial *
// const newZero: Partial<Profile> = {
//   name: "zero",
//   age: 29,
// };

// Pick - 쓴 속성만 나오게
// Omit - 쓴 속성을 제거
const newZero: Pick<Profile, "name" | "age"> = {
  name: "zero",
  age: 29,
};

// never - 버려라 (never는 쓰이지 않기때문에 사라짐)
// type Exclude<T, U> = T extends U ? never : T;
// type Extract<T, U> = T extends U ? T : never;

type Animal2 = "Cat" | "Dog" | "Human";
type Mammal = Exclude<Animal2, "Human">;

type AZ = Exclude<keyof Profile, "married">;

// S extends keyof any -> S는 string | number | symbol
type O<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>>;
const newZero2: O<Profile, "married"> = {
  name: "zero",
  age: 29,
};
