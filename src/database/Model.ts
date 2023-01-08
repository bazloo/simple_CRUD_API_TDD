import { BaseDocument } from '../types';

// TODO fields type validating

export default class Model<T extends BaseDocument> {
  public collectionName: string;

  store: Record<string, Array<T>>;

  constructor(collectionName: string, store: Record<string, Array<T>>) {
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
        this.store[this.collectionName].push({ ...object });
        resolve(object);
      }
    });
  }

  find(query: Partial<T>): Promise<Array<T>> {
    return new Promise((resolve) => {
      const queryValues = Object.entries(query);
      const result = this.store[this.collectionName]
        .filter((document) => queryValues.every(([key, value]) => document[key] === value));

      resolve(result);
    });
  }

  delete(object: BaseDocument): Promise<T> {
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

  update(query: BaseDocument, newValues: Partial<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      let availableValues; // TODO expand validation
      if (Reflect.has(newValues, 'id')) {
        const { id, ...values } = newValues;
        availableValues = values;
      } else {
        availableValues = newValues;
      }

      const index = this.store[this.collectionName]
        .findIndex((record) => record.id === query.id);

      if (index !== -1) {
        this.store[this.collectionName][index] = Object.assign(
          this.store[this.collectionName][index],
          availableValues,
        );
        resolve(this.store[this.collectionName][index]);
      } else {
        reject(new Error('Document with such id does not exist'));
      }
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      resolve(this.store[this.collectionName]);
    });
  }
}
