import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

interface ILoginForm {
  email: string;
  password: string;
}

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
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    watch,
  } = useForm<ILoginForm>();

  const [
    loginMutation,
    { loading, data: loginMutationResult, error },
  ] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
    variables: {
      loginInput: {
        email: watch("email"),
        password: watch("password"),
      },
    },
    onCompleted: (data: loginMutation) => {
      if (data.login.ok) {
        console.log(data.login.token);
      }
    },
  });

  const onSubmit = () => {
    const { email, password } = getValues();
    loginMutation();
  };
  console.log(loginMutationResult);

  console.log(errors);

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
