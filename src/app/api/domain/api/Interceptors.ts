export type Interceptors = {
  onFulfilled?: <T>(session: any) => Promise<T>;
  onRejected?: <T>(session: any) => Promise<T>;
};
