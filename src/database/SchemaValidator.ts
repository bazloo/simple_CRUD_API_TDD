export default abstract class SchemaValidator<T> {
  validateFields(required: Array<keyof T>, schema: T, body: object): [boolean, Error] {
    let result = true;
    let error;

    if (required && required.length && !this.hasRequiredFields(required, body)) {
      result = false;
      error = new Error(`The fields ${required.join(', ')} are required!`);
    }

    if (!this.checkFieldsTypes(body, schema)) {
      result = false;
      error = new Error(`Invalid field type, should be: ${JSON.stringify(schema)}`);
    }

    return [result, error];
  }

  private hasRequiredFields(required: Array<keyof T>, body) {
    return required.every((field) => Object.keys(body).includes(field as string));
  }

  private checkFieldsTypes<K>(body, schema: K) {
    return Object.entries(body).every(([key, value]) => {
      if (Array.isArray(value)) {
        return value.every((val) => schema[key][0] === typeof val) || !value.length;
      }

      return typeof value === schema[key];
    });
  }
}
