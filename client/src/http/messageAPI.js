import { $host } from '.';

const url = 'api/comments';

export const fetchCommentsByPostId = async (postId) => {
  const { data } = await $host.get(`${url}/${postId}`);
  return data;
};

export const postNewComment = async (postId, name, email, body) => {
  const { data } = await $host.post(url, {
    params: { postId, name, email, body },
  });
  return data;
};
