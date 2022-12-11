// // export =이 있으면 commonjs 모듈

// // ts-node를 설치

// import axios, { AxiosResponse, AxiosError } from "axios";

// interface Post {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }
// interface Created {}
// interface Data {
//   title: string;
//   body: string;
//   userId: number;
// }

// // 가짜 API사이트
// (async () => {
//   try {
//     const response = await axios.get<Post>(
//       "https://jsonplaceholder.typicode.com/posts/1"
//     );
//     const response2 = await axios.post<Created, AxiosResponse<Created>, Data>(
//       "https://jsonplaceholder.typicode.com/posts/1",
//       {
//         title: "foo",
//         body: "bar",
//         userId: 1,
//       }
//     );
//     const response3 = await axios({
//       method: "post",
//       url: "https://jsonplaceholder.typicode.com/posts/1",
//       data: {
//         title: "foo",
//         body: "bar",
//         userId: 1,
//       },
//     });
//     // type any면 문제가 있음 (에러 없다고 넘어가면 안됨)
//     console.log(response.data);
//     console.log(response.data.userId);
//     console.log(response.data.body);
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // 커스텀 타입 가드
//       console.log(
//         (error.response as AxiosResponse<{ message: string }>).data.message
//       );
//     }
//     const errorResponse = (error as AxiosError<{ message: string }>).response;
//   }
// })();

// 하나하나 npx 하기 귀찮으니까 설치
// -g를 하면 ts-node 치면 실행가능
// npm i -g ts-node

import axios, { AxiosResponse, AxiosError } from "axios";
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Created {}
interface Data {
  title: string;
  body: string;
  userId: number;
}
interface Config<D = any> {
  method?: "post" | "get" | "put" | "patch" | "delete" | "head" | "options";
  url?: string;
  data?: D;
}
interface AU {
  // await붙는 애들은 return이 Promise
  get: <T, R = AxiosResponse<T>>(url: string) => Promise<R>;
  post: <T, R = AxiosResponse<T>, D = any>(url: string, data: D) => Promise<R>;
  isAxiosError: (error: unknown) => error is AxiosError;
  (config: Config): void;
  (url: string, config: Config): void;
}

// 두개의 기능이 다르다.
// interface Ax {
//   a(): void;
//   b: () => void;
// }

const aw: AU = axios;
(async () => {
  try {
    // any로 뜨는게 싫다면 AxiosResponse<Post>추가
    const response = await aw.get<Post, AxiosResponse<Post>>("https://jsonplaceholder.typicode.com/posts/1");
    // console.log(response.data);
    // console.log(response.data.userId);
    // console.log(response.data.id);
    // console.log(response.data.title);
    // console.log(response.data.body);
    const response2 = await aw.post<Created, AxiosResponse<Created>, Data>(
      "https://jsonplaceholder.typicode.com/posts",
      {
        title: "foo",
        body: "bar",
        userId: 1,
      }
    );
    const response3 = await aw({
      method: "post",
      url: "https://jsonplaceholder.typicode.com/posts",
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });
    // 캐치문의 에러는 기본적으로 unknown이다
  } catch (error) {
    // 이 방법은 error문에서 또 에러를 일으킬수도 있으므로 아래 커스텀 타입 가드 사용
    // const errorResponse = (error as AxiosError).response;
    // console.error(errorResponse?.data);
    if (aw.isAxiosError(error)) {
      // 커스텀 타입 가드
      // is가 있으면 filter나 if문에 사용 가능

      // console.error((error as AxiosError).response?.data);
      // ex { message: '서버 장애입니다. 다시 시도해주세요' }
      console.error((error.response as AxiosResponse<{ message: string }>).data.message);
    }
  }
})();
