export default class Model<T extends { id?: string | number }> {
  public collectionName: string;

  private store: object;

  constructor(collectionName: string, store: object) {
    this.collectionName = collectionName;
    this.store = store;

    this.store[collectionName] = [];
  }

  async insert(object: T): Promise<T> {
    return new Promise((resolve, reject) => {

      const [alreadyExist] = this.store[this.collectionName]
        .filter((record) => record.id === object.id); // TODO refactor find by id private

      if (alreadyExist) {
        reject(new Error('Document with such id is already exist'));
      } else {
        this.store[this.collectionName].push(object);
        resolve(object);
      }
    });
  }

  find(object: {[key: string | number]: string | number}): Promise<T> {
    return new Promise((resolve) => {
      const query = Object.entries(object);
      const result = this.store[this.collectionName]
        .filter((record) => query.every(([key, value]) => record[key] === value));

      resolve(result);
    });
  }

  delete(object: { id: string | number }): Promise<T> {
    return new Promise((resolve, reject) => {
      const index = this.store[this.collectionName]
        .findIndex((record) => record.id === object.id);

      if (index !== -1) {
        const deletedRecord = this.store[this.collectionName][index];
        this.store[this.collectionName] = this.store[this.collectionName]
          .filter((record) => record.id !== object.id);
        resolve(deletedRecord);
      } else {
        reject(new Error('Document with such id does not exist'));
      }
    });
  }

  update(object: { id: string | number }, query: {[key: string | number]: string | number}): Promise<T> {
    return new Promise((resolve, reject) => {
      console.log(this.store[this.collectionName]);

      const index = this.store[this.collectionName]
        .findIndex((record) => record.id === object.id);

      if (index !== -1) {
        Object.entries(query).forEach(([key, value]) => {
          this.store[this.collectionName][index][key] = value;
        });

        resolve(this.store[this.collectionName][index]);
      } else {
        reject(new Error('Document with such id does not exist'));
      }
    });
  }
}
