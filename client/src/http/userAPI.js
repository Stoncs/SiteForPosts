import { $host } from './index';

const url = 'api/users/';

export const fetchAllUsers = async () => {
  try {
    const { data } = await $host.get(url);
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchUserById = async (userId) => {
  const { data } = await $host.get(`${url}/${userId}`);
  return data;
};
