import { v4 as uuid } from 'uuid';
import { BaseDocument } from '../types';
import { schemaValidator } from "../utils";

// TODO fields type validating

export default class Model<T extends BaseDocument> {
  public collectionName: string;

  private collectionSchema: { required: Array<keyof T>; types: T };

  store: Record<string, Array<T>>;

  constructor(collectionName: string, collectionSchema, store: Record<string, Array<T>>) {
    this.collectionName = collectionName;
    this.collectionSchema = collectionSchema;
    this.store = store;

    this.store[collectionName] = [];
  }

  async insert(object: T): Promise<T> {
    return new Promise((resolve, reject) => {
      schemaValidator(this.collectionSchema.required, this.collectionSchema.types, object);
      object.id = uuid();
      this.store[this.collectionName].push({ ...object });
      resolve(object);
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

  update(query: BaseDocument, newValues: Partial<T>): Promise<T> { // TODO: fix type required
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
