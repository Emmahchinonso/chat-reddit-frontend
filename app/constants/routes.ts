export const routes = {
  home: "/",
  register: "/register",
  login: "/login",
  createPost: "/posts/create-post",
  editPost: (id: number) => `/posts/edit/${id}`,
  postId: (id: number) => `/posts/${id}`,
};
