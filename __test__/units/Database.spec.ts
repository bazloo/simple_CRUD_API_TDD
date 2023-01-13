import UserModel, { db } from '../../src/database';
import { UserModel as UserSchema } from '../../src/types';

const testUser: UserSchema = {
  username: 'test-user',
  age: 2023,
  hobbies: ['coding'],
};

beforeEach(async () => {
  await db.dropCollections();
});

describe('in memory DB operations', () => {
  it('finds object', async () => {
    const newUser = await UserModel.insert(testUser);
    const [user] = await UserModel.find({ id: newUser.id });

    expect(user).toBeTruthy();
    expect(user.id).toBe(newUser.id);
  });

  it('inserts object', async () => {
    const newUser = await UserModel.insert(testUser);
    const [user] = await UserModel.find({ id: newUser.id });

    expect(user).toBeTruthy();
    expect(user.id).toEqual(newUser.id);
    expect(user.username).toBe('test-user');
    expect(user.age).toEqual(2023);
    expect(user.hobbies).toContain('coding');
  });

  it('deletes object', async () => {
    const newUser = await UserModel.insert(testUser);
    await UserModel.delete({ id: newUser.id });

    const [user] = await UserModel.find({ id: newUser.id });

    expect(user).toBeFalsy();
  });

  it('updates object', async () => {
    const newUser = await UserModel.insert(testUser);
    await UserModel.update({ id: newUser.id }, { username: 'test1' });

    const [user] = await UserModel.find({ id: newUser.id });

    expect(user.username).toBe('test1');
  });

  it('can not update id field', async () => {
    const newUser = await UserModel.insert(testUser);

    await UserModel.update({ id: newUser.id }, { id: 'gonna_hack_you' });

    const [user] = await UserModel.find({ id: newUser.id });

    expect(user).toBeTruthy();
  });

  it('updates all fields except id', async () => {
    const newUser = await UserModel.insert(testUser);
    await UserModel.update({ id: newUser.id }, { username: 'test1', age: 0 });

    const [user] = await UserModel.find({ id: newUser.id });

    expect(user.username).toBe('test1');
    expect(user.age).toBe(0);
  });
});
