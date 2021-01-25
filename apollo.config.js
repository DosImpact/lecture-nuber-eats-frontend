module.exports = {
  client: {
    // gql작성시 타입 도움을 줄 파일들 (glob 패턴)
    includes: ["./src/**/*.tsx"],
    tagName: "gql", // gql 이라는 태그로 query를 작성한다.
    service: {
      name: "nuber-eats-backend",
      url: "http://localhost:4000/graphql", // optional headers //   headers: { // authorization: "Bearer lkjfalkfjadkfjeopknavadf", //   }, // optional disable SSL validation check //   skipSSLValidation: true,
    },
  },
};
