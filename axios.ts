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

import axios, { AxiosResponse, AxiosError } from "axios";
interface Post {}
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

(async () => {
  try {
    const aw: AU = axios;
    const response = await aw.get<Post>(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const response2 = await aw.post<Created, AxiosResponse<Created>, Data>(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        title: "foo",
        body: "bar",
        userId: 1,
      }
    );
    const response3 = await aw({
      method: "post",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      data: {
        title: "foo",
        body: "bar",
        userId: 1,
      },
    });
  } catch (error) {
    if (aw.isAxiosError(error)) {
      // 커스텀 타입 가드
      console.log(
        (error.response as AxiosResponse<{ message: string }>).data.message
      );
    }
    const errorResponse = (error as AxiosError<{ message: string }>).response;
  }
})();
