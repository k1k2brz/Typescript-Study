// git blame

import React, { useState, useCallback, useRef, FunctionComponent, FC, useEffect } from 'react';

// export = 인지 export default인지 확인
// export as namespace React까지 있으면 UMD모듈

interface P { name: string, title: string }

// FunctionComponent시 props자리
// VFC가 18에서 없어지고 FC로 통합되면서 Children타입 제공을 안하게 됨 
// -> { children?: ReactNode | undefined } 같이 타입 추가해줘야 한다.
const WordRelay: FC<P> = (props) => {
    // useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
    const [word, setWord] = useState('제로초');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    // useRef가 처음에 null이다가 ref={}에 들어가면서 값이 생기기 때문에 에러가 나는 것
    // JSX연결할 용도라면 아래처럼 넣기 (그럼 RefObject로 받아진다)
    // RefObject - JSX연결용 MutableRefObject - ref.current이런식으로 쓰는 용도
    const inputEl = useRef<HTMLInputElement>(null); // null 안넣으면 Mutable됨
    // number와 0의 타입이 같이 때문에 mutable에 걸림 (위는 다르기 때문에 RefObject에 걸린다.)
    const mutable = useRef<number>(0);


    // 여기에 await쓰고 싶으면 setWord에 마우스 올렸을 때 리턴 타입이 Promise여야 한다.
    useEffect(() => {
        setWord((prev) => {
            return prev + '2';
        })
        // await axios.post() << TS에선 여기에 await 불가능
        /**
         꼭 쓰고싶다면
         const func = async () => {
            await axios.post();
         }
         console.log('useEffect');
         func()
         */
        /**
         혹은
         return () => {
            console.log('useEffect cleanup');
         }
         클린업 함수일때 (Destructor (useEffect 끝날 때 호출))
         */
    }, [])

    // 18버전 이후 e 타입 명시
    const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = inputEl.current;
        if (word[word.length - 1] === value[0]) {
            setResult('딩동댕');
            setWord(value);
            setValue('');
            if (input) {
                input.focus();
            }
        } else {
            setResult('땡');
            setValue('');
            if (input) {
                input.focus();
            }
        }
    }, [word, value]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }, []);

    // FunctionComponent시 ReactElement
    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    value={value}
                    onChange={onChange}
                />
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
};

export default WordRelay;

