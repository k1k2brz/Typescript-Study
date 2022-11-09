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

//이거 String 이렇게 대문자로 쓰지 말 것
// const a: string = "hello";

type World = "world" | "hell";
const a: World = "world";

const b = `hello ${a}`;

type Greeting = `hello${World}`;
// const c: Greeting = 'h'

let arr: string[] = [];
let arr2: Array<string> = [];
function rest(...args: string[]) {
  console.log(args);
}
// 위가 string이므로 string만 들어감
rest("1", "2", "3");

const tuple: [string, number] = ["1", 1];
tuple[0] = "hello";
// push까진 type 정확히 인식 못함
tuple.push("hello");

// enum - js코드가 되었을 때 남아있냐 아니냐
// enum은 안남는다
// 변수들을 하나의 그룹으로 묶고싶을 때 사용한다.
const enum EDirection {
  Up,
  Down,
  Left,
  Right,
}

// 이건 남긴다
// as const를 빼면 Type이 정확한 숫자가 아니라 Number로 뜸
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;
// as const 사용하면 readonly로 type이 고정된다 (이 값을 상수로 쓰겠다는 선언)

const d = EDirection.Up;
const e = EDirection.Left;

function walk(dir: EDirection) {}

const obj = { a: "123", b: "hello", c: "world" };
type Key = keyof typeof obj; // 위의 obj를 사용하기 위함 (key들만 가져온다)
// 값을 type으로 쓰고 싶을 때 typeof를 붙여준다. (여기에 key만 뽑는 keyof를 붙여서 값의 키값만 불러오는것)

const obj22 = { a: "123", b: "hello", c: "world" } as const; // as const를 붙여 엄격하게 타이핑
type Key2 = typeof obj2[keyof typeof obj2]; // value들만 가져오기 위함

// It requires an extra line to pull out the keys
type Direction = typeof ODirection[keyof typeof ODirection];
function run(dir: Direction) {}

walk(EDirection.Left);
run(ODirection.Right);

// 간단하면 type 객체지향 하고싶으면 interface
type F = { f: string };
const f: F = { f: "hello" };

interface G {
  g: string;
}
const g: G = { g: "hello" };

// &도 되고 | 도 된다 (&일 땐 모든 속성이 다 있어야 하지만 |는 하나만 있으면 된다)
// & - intersection
type H = { hello: "world" } & { zero: "cho" };
const h: H = { hello: "world", zero: "cho" };

// 타입 애일리어스와 인터페이스의 상속(extends)
type Animal = { breath: true };
type Poyouryu = Animal & { breed: true };
type Human = Poyouryu & { think: true };

// 이런 경우 type과 interface의 사용에 있어서 차이점은 객체지향이냐 아니야 정도로 외우자
interface I {
  breath: true;
}
// type을 extends할 수도 있다 (위의 Human 이라던가)
interface J extends I {
  breed: true;
}
const j: J = { breath: true, breed: true };

const zercho: Human = { breath: true, breed: true, think: true };

// 객체는 상세할수록 좁다

interface K {
  k: string;
}
interface K {
  j: string;
}
const obj1: K = { k: "hello", j: "world" };

// type은 합쳐지지 않는다
type L = { k: string };
type L = { l: string };
const obj2: L = { k: "hello", l: "world" }; // 안됨

interface A {
  a: string;
}
const obj3 = { a: "hello", b: "world" };
// 잉여 속성 검사
const obj4: A = obj;

// void
// 3개의 void 타입
function c(): void {
  // return 값을 넣으면 안되는 함수
  // return undefined; 는 가능
  return;
}
// 매개변수와 매서드는 return값 가능
function aa(callback: () => void /** 리턴값을 사용하지 않겠다 */): void /** 리턴 값 없어야함 */ {}
// callback은 void인데 리턴값이 있어도 된다
aa(() => {
  return "3";
});

interface Human2 {
  talk: () => void;
}
// 메서드도 return값이 존재할 수 있음
const human: Human2 = {
  talk() {
    return "abc";
  },
};
// 그래도 void에 return값은 안넣는게 낫다

// declare function은 js로 넘길 때 사라진다 (타입 정의 등에 사용하면 될 듯)
// any - 타입 검사 포기(any를 쓰면 ts를 쓰는 의미가 없음)

interface AA {
  talk: () => void;
}
const bb: AA = {
  talk() {
    return 3;
  },
};
// unknown - 타입을 모르겠을 때
const bbb: unknown = bb.talk();
(bbb as AA).talk();

function numOrStr(a: number | string) {
  // as는 unknown일때만
  // or 일 경우 if문으로 정확하게 넣어준다
  if (typeof a === "number") {
    a.toFixed(1);
  } else {
    a.charAt(3);
  }
  // if (typeof a === "boolean") {
  //   // never가 나오는 경우 (사용X)
  //   a.toString();
  // }
}
numOrStr("123");
numOrStr(1);

function numOrNumArray(a: number | number[]) {
  if (Array.isArray(a)) {
    // number[]
    a.concat(4);
  } else {
    // number
    a.toFixed(3);
  }
}
numOrNumArray(123);
numOrNumArray([1, 2, 3]);

// 클래스 구별
class classA {
  classAAA() {}
}
class classB {
  classBBB() {}
}
function aOrB(param: classA | classB) {
  // 클래스 간에는 서로 instanceof로 구별을 한다
  if (param instanceof classA) {
    param.classAAA();
  }
}
aOrB(new classA());
aOrB(new classB());

type b1 = { type: "b1"; bbb1: string };
type b2 = { type: "b2"; bbb2: string };
type b3 = { type: "b3"; bbb3: string };

function typeCheck(a: b1 | b2 | b3) {
  // 알아서 추론 해줌
  if (a.type === "b1") {
    // ('bbb1' in a) 이런식으로도 가능
    a.bbb1;
  } else if (a.type === "b2") {
    a.bbb2;
  } else {
    a.bbb3;
  }
}

// is 가 들어있으면 커스텀 타입 함수

const x: {} = "hello";
const y: Object = "hi"; // {}, Object 모든 타입 (null과 undefined제외)
const xx: object = "hi";
const yy: object = { hello: "world" }; // object지양, interface, type, class를 쓸 것
const z: unknown = "hi";

// 인덱스드 시그니처
// unknown = {} | null | undefined
if (z) {
  // {}이 모든 타입
  z;
} else {
  // 위에서 걸러져서 unknown이 남음
  z;
}

// 맵드 타입스
// type B = 'Human' | 'Animal' | 'Mammal'; 이렇게 제한 걸기 가능
// type R = { [key in B]: string } B의 3개만 가능
// type key는 전부 string에 value는 number
type R = { [key: string]: number };
const aaaa: R = { a: 3, b: 5, c: 6 };

// interface Z {
//   readonly a: string;
//   b: string;
// }
// class X implements Z {
abstract class X {
  private a: string = "123";
  protected b: string = "world";
  c: string = "wow";

  abstract method(): void;
}
// protect는 상속까지 가능, private는 밖으로 아예 불가
// abstract는 무조건 구현해야함
class Y extends X {
  method() {
    console.log(this.a);
    console.log(this.b);
    console.log(this.c);
  }
}
new Y().a;
new Y().b;
new Y().c;

// 제네릭
// 기본형 T가 뭔지는 모르겠지만 다 같게 쓰겠다
// function add<T>(x: T, y: T): T {
//   //일단 같은 타입은 같은 문자로
//   return x + y;
// }

// T에 각각 다른제한도 가능
// function add<T extends string, K extends number>(x: T, y: T): T {
//   return x + y;
// }
// T에 제한걸기
function add<T extends string | number>(x: T, y: T): T {
  // T가 뭔지 몰라서 x + y가 에러나는것
  return x + y;
}

add(1, 2); //3
add("1", "2"); // '12'
add("1", 2); //다른 타입 안됨
add(true, false); // T에 제한걸면 이거도 막아짐

// any를 쓰면 제한이 없다
function add2<T extends string[]>(x: T): T {
  return x;
}

add2(["1", "2"]);

function add3<T extends abstract new (...args: any) => any>(x: T): T {
  return x;
}

class Ar {}
add3(Ar);

// <T extends {...}>
// <T extends any[]>
// <T extends (...args: any) => any>
// <T extends abstract new (...args: nay) => any>
// 추론을 못하면 <T = unknown>으로 기본값 붙이기

// 좁은 타입에서 넓은 타입으로 대입 가능 반대는 불가능 (공변성, 반공병성)
function da(x: string): number {
  return +X;
}
da("1"); //1

type DB = (x: string) => number | string;

// 오버로딩
// 하나로 못 쓰겠으면 전부 쓰자
// 선언은 딴 파일에 되어있고 여기서 쓰게 가능 (declare)
declare function plus(x: number, y: number): number;
declare function plus(x: string, y: string): string;
declare function plus(x: number, y: number, z: number): number;
// 이렇게 사용도 가능
// declare function plus(x: number, y: number, z?: number): number;

plus(1, 2);
plus(2, 3, 4);
plus("1", "2");

// 에러처리 + Axios
interface Axios {
  get(): void;
}
// axios를 쓰게 되면 response를 추가
// js에도 남아있으면서 interface와 비슷한 기능
class CustomError extends Error {
  response?: {
    data: any;
  };
}
declare const axios: Axios;

(async () => {
  try {
    await axios.get();
  } catch (err) {
    // as 는 unknown일 때 어쩔 수 없이 사용
    if (err instanceof CustomError) {
      // const customError = err as CustomError;
      // const customError = err;
      // console.error(customError.response?.data);
      // customError.response?.data;
      console.error(err.response?.data);
      err.response?.data;
      // 타입가드로 좁혀놨으면 as 안써도 됨
    }
  }
})();

// 공변성 반공변성
// 리턴값은 더 넓은 타입이면 대입 가능
// 매개변수는 더 좁은 타입이면 대입 가능
