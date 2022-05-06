// login Status here
import store from 'store';

const USER_INFO = 'user_info';

export const saveUser = (data: { username: string, image: string, token: string }) => {
  store.set(USER_INFO, data);
};

export const getUser = ():
{ username: string, image: string, token: string } => store.get(USER_INFO);

export const deleteUser = () => {
  store.remove(USER_INFO);
};
