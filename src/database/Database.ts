import { BaseCollection, BaseDocument } from '../types';
import Model from "./Model";

export default class Database {
  store: Record<string, Array<BaseDocument>>;

  private collections: Array<string> = [];

  constructor(collections: Model<BaseDocument, keyof BaseDocument>[], store: Record<string, Array<BaseDocument>>) {
    this.store = store;

    collections.forEach((oneCollection): void => {
      const { collectionName } = oneCollection;

      this[collectionName] = oneCollection;
      this.store[collectionName] = [];

      this.collections.push(collectionName);
    });
  }

  public dropCollections() {
    this.collections.forEach((collection) => {
      this.store[collection] = [];
    });
  } // TODO ?? one or many
}
