interface IUser {
  id: string,
  username: string,
  age: number,
  hobbys: string[],
}

const users: IUser[] = [];

export {users, IUser};