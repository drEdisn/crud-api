import { users, IUser } from "./users";

const findUser = (id: string) => {
  let index: number = null;
  let user: IUser = null;
  users.forEach((i, ind) => {
    if(i.id === id){
      user = users[ind];
      index = ind;
    }
  });
  return {user: user, ind: index};
}

export {findUser};