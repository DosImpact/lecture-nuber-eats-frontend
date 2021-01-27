/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: nicknameLoginMutation
// ====================================================

export interface nicknameLoginMutation_login {
  __typename: "LoginOutput";
  error: string | null;
  ok: boolean;
  token: string | null;
}

export interface nicknameLoginMutation {
  login: nicknameLoginMutation_login;
}

export interface nicknameLoginMutationVariables {
  loginInput: LoginInput;
}
