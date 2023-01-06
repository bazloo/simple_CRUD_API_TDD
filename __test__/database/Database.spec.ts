import Database from '../../src/database/Database';
import Model from "../../src/database/Model";

interface IUser {
  id?: string | number;
  userName: string;
  age: number;
  hobbies: string[] | [];
}

const testUser = {
  id: 1,
  userName: 'test-user',
  age: 2023,
  hobbies: ['coding'],
};

let userCollection;
let db;

beforeAll(() => {
  const store = {};
  userCollection = new Model<IUser>('users', store);
  db = new Database([userCollection], store);
});

beforeEach(async () => {
  await db.dropCollections();
});

describe('in memory DB operations', () => {
  it('finds object', async () => {
    await db.users.insert(testUser);
    const [user] = await db.users.find({ id: 1 });

    expect(user).toBeTruthy();
    expect(user.id).toBe(1);
  });

  it('inserts object', async () => {
    await db.users.insert(testUser);
    const [user] = await db.users.find({ id: 1 });

    expect(user).toBeTruthy();
    expect(user.id).toEqual(1);
    expect(user.userName).toBe('test-user');
    expect(user.age).toEqual(2023);
    expect(user.hobbies).toContain('coding');
  });

  it('deletes object', async () => {
    await db.users.insert(testUser);
    await db.users.delete({ id: 1 });

    const [user] = await db.users.find({ id: 1 });

    expect(user).toBeFalsy();
  });

  it('updates object', async () => {
    await db.users.insert(testUser);
    await db.users.update({ id: 1 }, { userName: 'test1' });

    const [user] = await db.users.find({ id: 1 });

    expect(user.userName).toBe('test1');
  });
});
