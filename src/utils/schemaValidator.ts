import { ServerResponse } from 'http';

function hasRequiredFields<T extends object>(required: Array<keyof T>, body) {
  return required.every((field) => Object.keys(body).includes(field as string));
}

function checkFieldsTypes<K>(body, schema: K) {
  return Object.entries(body).every(([key, value]) => {
    if (Array.isArray(value)) {
      return value.every((val) => schema[key][0] === typeof val) || !value.length;
    }
    console.log(value, key);
    console.log(typeof value, schema[key]);
    return typeof value === schema[key];
  });
}

export default function schemaValidator<T extends object, K>(required: Array<keyof T>, schema: K, body: object): void {
  if (required && required.length && !hasRequiredFields(required, body)) {
    throw new Error(`The fields ${required.join(', ')} are required!`);
  }

  if (!checkFieldsTypes(body, schema)) {
    throw new Error(`Invalid field type, should be: ${JSON.stringify(schema)}`);
  }
}
