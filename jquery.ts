// 어디서 사용되는지 npm 가서 알아 볼 것

// 타입 유추해서 만들어보기
interface zQuery<T> {
  // ?를 붙여 빈칸도 허용
  // 메서드 체이닝을 하려면 리턴값이 this여야함
  text(
    param?:
      | string
      | number
      | boolean
      | ((this: this, index: number) => string | number | boolean)
  ): this;
  // 아래 document라 되어 있으니
  html(param: string | Document | DocumentFragment): void;
}
// 타입 추론 되는지 확인
// document.body;
// document.createDocumentFragment();

// 타입 테스트를 위해 as unknown
const $tag: zQuery<HTMLElement> = $([
  "p",
  "t",
]) as unknown as zQuery<HTMLElement>;

$tag.text("123");
$tag.text(123);
$tag.text(function (index) {
  console.log(this, index);
  return true;
});
$tag.text().html(document);

const tag = $("ul li")
  .addClass("hello")
  .addClass(function (index) {
    return "item-" + index;
  });

$(tag).html(document);

// Jquery클릭시 2가지 타입이 나오면 뒤에 제네릭까지 일치하는쪽으로 찾을 것
// 타입스크립트 함수에서 첫 번째 매개변수가 this라면 없는 것 취급
// removeClass(className_function?: JQuery.TypeOrArray<string> | ((this: TElement, index: number, className: string) => string)): this;

// $("p").removeClass("myClass noClass").addClass("yourClass");
// $(["p", "t"]).text("hello");
// const tag = $("ul li")
//   .addClass("hello")
//   .addClass(function (index) {
//     return "item-" + index;
//   });
// $(tag).html(function (i: number) {
//   console.log(this);
//   return $(this).data("name") + "입니다";
// });

// namespace : 다른 라이브러리와 충돌을 방지하기 위한 문법 (묶어줌)
declare namespace ZeroCho {
  const aa: string;
  const bb: string;
  const cc: string;
}

ZeroCho.aa;

// ts에서 common js를 표시하는 법
// export = jQuery;
// import $ = require('jquery')는 import * as $ from 'jquery';와 같다
