interface ICollection {
  collectionName: string;
  store: [];
}

export default class Database {
  private store;

  private collections: Array<string> = [];

  constructor(collections: ICollection[], store: object) {
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
