export type MappedType<T> = {
  [P in keyof T]: T[P];
};
