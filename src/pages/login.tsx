import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

//폼 인터페이스
interface ILoginForm {
  email: string;
  password: string;
}

// 로그인 뮤테이션 gql 정의
const LOGIN_MUTATION = gql`
  # mutation loginMutation($email: String!, $password: String!) {
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      error
      ok
      token
    }
  }
`;

export const Login = () => {
  // 훅폼
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    watch,
  } = useForm<ILoginForm>();

  // 로그인 뮤테이션 처리
  const [loginMutation, { loading, data: loginMutationResult }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    variables: {
      loginInput: {
        email: watch("email"),
        password: watch("password"),
      },
    },
    // 성공시
    onCompleted: (data: loginMutation) => {
      // 데이터 유입 - 토큰  (상단의 data와 동일함 )
      if (data.login.ok) {
        console.log(data.login.token);
      }
    },
    // 응답 실패시
    onError: (error: ApolloError) => {
      // Server 가 다운 - 404 애러등 ( 네트워크 인프라 문제 )
      // 참고) Server 202 의 애러는 의도적인 애러이다.
      console.log(error.message);
    },
  });

  const onSubmit = () => {
    // form to API 연결 1. 데이터를 가져와서 Mutation에 직접 넣을 수 있다.
    // const { email, password } = getValues();
    loginMutation();
    // form to API 연결 2. hook form의 watch 기능을 이용해서 mutation에 실시간 연결
  };

  // console.log(loginMutationResult);
  // console.log(errors);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg pt-10 pb-7 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 px-5"
        >
          <input
            ref={register({ required: "Email is required" })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          <input
            ref={register({ required: "Password is required", minLength: 5 })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 5 chars." />
          )}
          <button className="mt-3 btn">Log In</button>
          {loading && <span>loading...</span>}
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult?.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};
