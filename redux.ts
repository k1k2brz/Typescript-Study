// named export(선언하는 애들과 사용되는 이름이 같아야 함)
import { combineReducers, legacy_createStore as createStore, compose } from "redux";

const loginAction = { type: "LOGIN" };
// const anyAction = { type: "example", data: "123" };

const initialState = {
  user: {
    isLoggingIn: true,
    data: null,
  },
  posts: [],
};

const reducer = combineReducers({
  user: (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          isLoggingIn: true,
          data: {
            nickname: "zerocho",
            password: "1234",
          },
        };
      default:
        return state;
    }
  },
  posts: (state, action) => {
    // if (Array.isArray(state)) {
    // 이 타입가드 안에 넣거나
    // }
    switch (action.type) {
      // action.type이 ADD_POST라면
      case "ADD_POST":
        // action.data는
        // { title: "hello", content: "redux" }
        return [...state, action.data];
      default:
        return state;
    }
  },
});

const store = createStore(reducer, initialState);
// type = action.type // data = action.data가 된다.
store.dispatch({ type: "LOGIN", data: { nickname: "one", password: "1" } });

store.getState();
// const nextState = {
//   user: {
//     isLogginIn: true,
//     data: { nickname: "zero", password: "1234" },
//   },
//   posts: [],
// };
store.dispatch({ type: "ADD_POST", data: { title: "hello", content: "redux" } });
store.getState();
// const nextState = {
//   user: {
//     isLogginIn: true,
//     data: { nickname: "zero", password: "1234" },
//   },
//   posts: [{ title: "hello", content: "redux" } }],
// };
