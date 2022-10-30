// Required
interface Profile {
  name: string;
  age: number;
  married: boolean;
}
type Name2 = Profile["name"];

// -? optional을 전부 빼라
type R2<T> = {
  [Key in keyof T]-?: T[Key];
};

// 수정 못하게 만들려면 readonly
// -readonly (readonly 빼기)도 존재
const zero2: R2<Profile> = {
  name: "zero",
  age: 29,
  married: false,
};

zero2.name = "nero";
