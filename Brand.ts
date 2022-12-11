// 브랜딩 기법
// 가짜타입 (타입 창조)
type Brand<K, T> = K & { __brand: T };

type EUR = Brand<number, "EUR">;
type USD = Brand<number, "USD">;
type KRW = Brand<number, "KRW">;

// 실제로 존재하지 않는 타입이므로 as를 써준다
const usd = 10 as USD;
const eur = 10 as EUR;
const krw = 2000 as KRW;
function euroToUsd(euro: EUR): number {
  return euro * 1.18;
}
console.log(`USD: ${euroToUsd(eur)}`);

// KRW, USD가 못들어간다고 인식
euroToUsd(krw);
