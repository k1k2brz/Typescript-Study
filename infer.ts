//infer (추론) - 매개변수 자리 추론

function zip(x: number, y: string, z: boolean): { x: number; y: string; z: boolean } {
  return { x, y, z };
}

type P<T extends (...args: any) => any> = T extends (...args: infer A) => any ? A : never;
type Rz<T extends (...args: any) => any> = T extends (...args: any) => infer A ? A : never;
type Params = Parameters<typeof zip>;
type Ret = ReturnType<typeof zip>;
type Frist = Params[0];

class A {
  a: string;
  b: number;
  c: boolean;
  constructor(a: string, b: number, c: boolean) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}
const cc = new A("123", 456, true);
type CC = ConstructorParameters<typeof A>; // typeof 클래스가 생성자
type II = InstanceType<typeof A>;

const a0: A = new A("123", 456, true); // 인스턴스(new)

//
const p1 = Promise.resolve(1)
  .then((a) => a + 1)
  .then((a) => a + 1)
  .then((a) => a.toString());
const p2 = Promise.resolve(2);
const p3 = new Promise((res, rej) => {
  setTimeout(res, 1000);
});

Promise.all([p1, p2, p3]).then((result) => {
  console.log(result); //['3', 2, undefined]
});

// T = [p1, p2, p3]
// keyof T = '0' | '1' | '2' | 'length'

const arrs = [1, 2, 3] as const;
type Arrs = keyof typeof arr;
const key: Arrs = "3";
