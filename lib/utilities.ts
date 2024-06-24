export type ReturnArrayPromise<T extends () => Promise<Array<any>>> = Awaited<
  ReturnType<T>
>[number];
