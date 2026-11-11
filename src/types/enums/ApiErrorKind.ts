export enum ApiErrorKind {
  // No response: timeout, DNS failure, connection reset.
  Network = 'network',
  // 5xx response.
  Server = 'server',
  // Other 4xx response.
  Client = 'client',
  // Response arrived but did not have the expected shape (including a non-JSON body).
  Parse = 'parse',
}
