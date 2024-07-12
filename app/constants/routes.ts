export const routes = {
  home: "/",
  register: "/register",
  login: "/login",
  createPost: "/posts/create-post",
  postId: (id: number) => `/posts/${id}`,
};
