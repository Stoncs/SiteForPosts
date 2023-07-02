import { $host } from '.';

const url = 'api/posts';

export const fetchAllPosts = async () => {
  const { data } = await $host.get(url);
  return data;
};

export const fetchPostsByUserId = async (userId) => {
  const { data } = await $host.get(`${url}/getByUserId/${userId}`);
  return data;
};

export const fetchPostById = async (id) => {
  const { data } = await $host.get(`${url}/${id}`);
  return data;
};
