// login Status here
import store from 'store';

const USER_TOKEN = 'user_token';
const USER_INFO = 'user_info';

export const saveUser = (data: { username: string, image: string }) => {
  store.set(USER_INFO, data);
};

export const getUser = () => store.get(USER_INFO);

export const getToken = () => store.get(USER_TOKEN);

export const saveToken = (token: string) => store.set(USER_TOKEN, token);

export const deleteUser = () => {
  store.remove(USER_INFO);
  store.remove(USER_TOKEN);
};
