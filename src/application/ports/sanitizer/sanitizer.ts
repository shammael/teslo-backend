interface ISanitizer<T = unknown, R = unknown> {
  sanitize(field: string, value: T): R;
}

export default ISanitizer;
