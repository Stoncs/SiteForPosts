import { $host } from '.';

const url = 'api/posts';

export const fetchAllPosts = async (page, limit) => {
  const { data } = await $host.get(url, { params: { page, limit } });
  return data;
};

export const fetchPostsByUserId = async (userId, page, limit) => {
  const { data } = await $host.get(`${url}/getByUserId/${userId}`, {
    params: { page, limit },
  });
  return data;
};

export const fetchPostById = async (id) => {
  const { data } = await $host.get(`${url}/${id}`);
  return data;
};
