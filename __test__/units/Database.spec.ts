import UserModel, { db } from '../../src/database';
import { UserModel as UserSchema } from '../../src/types';

const testUser: UserSchema = {
  id: 1,
  userName: 'test-user',
  age: 2023,
  hobbies: ['coding'],
};

beforeEach(async () => {
  await db.dropCollections();
});

describe('in memory DB operations', () => {
  it('finds object', async () => {
    await UserModel.insert(testUser);
    const [user] = await UserModel.find({ id: 1 });

    expect(user).toBeTruthy();
    expect(user.id).toBe(1);
  });

  it('inserts object', async () => {
    await UserModel.insert(testUser);
    const [user] = await UserModel.find({ id: 1 });

    expect(user).toBeTruthy();
    expect(user.id).toEqual(1);
    expect(user.userName).toBe('test-user');
    expect(user.age).toEqual(2023);
    expect(user.hobbies).toContain('coding');
  });

  it('deletes object', async () => {
    await UserModel.insert(testUser);
    await UserModel.delete({ id: 1 });

    const [user] = await UserModel.find({ id: 1 });

    expect(user).toBeFalsy();
  });

  it('updates object', async () => {
    await UserModel.insert(testUser);
    await UserModel.update({ id: 1 }, { userName: 'test1' });

    const [user] = await UserModel.find({ id: 1 });

    expect(user.userName).toBe('test1');
  });

  it('can not update id field', async () => {
    const newUser = await UserModel.insert(testUser);

    await UserModel.update({ id: 1 }, { id: 2 });

    const [user] = await UserModel.find({ id: 2 });

    expect(user).toBeFalsy();
  });

  it('updates all fields except id', async () => {
    await UserModel.insert(testUser);
    await UserModel.update({ id: 1 }, { id: 2, userName: 'test1', age: 0 });

    const [user] = await UserModel.find({ id: 1 });

    expect(user.userName).toBe('test1');
    expect(user.age).toBe(0);
  });
});
