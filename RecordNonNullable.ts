// interface Obj2 {
//   [Key: string]: number;
// }

type Re<T extends keyof any, S> = {
  [Key in T]: S;
};

const ao: Record<string, number> = { a: 3, b: 5, c: 7 };

// NonNullable
type AN = string | null | undefined | boolean | number;
type BN = N<AN>;

type N<T> = T extends null | undefined ? never : T; // string | boolean | number
