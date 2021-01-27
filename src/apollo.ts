import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { LocalStorageWrapper, persistCacheSync } from "apollo3-cache-persist";

export const isLoggedInVar = makeVar(false);
export const nicknameVar = makeVar("");

const getNicknameVar = () => nicknameVar();
const setNicknameVar = (newVar: string) => {
  localStorage.setItem("nickname", newVar);
  nicknameVar(newVar);
};

export { getNicknameVar, setNicknameVar };

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        nickname: {
          read() {
            return nicknameVar();
          },
        },
      },
    },
  },
});

persistCacheSync({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

export const client = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URL,
  cache,
});
