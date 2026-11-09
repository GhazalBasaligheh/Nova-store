export enum ApiErrorKind {
  // Bot challenge or other non-JSON response (e.g. Cloudflare "Just a moment…").
  Blocked = 'blocked',
  // No response: timeout, DNS failure, connection reset.
  Network = 'network',
  // 5xx response.
  Server = 'server',
  // Other 4xx response.
  Client = 'client',
  // Response arrived but did not have the expected shape.
  Parse = 'parse',
  // Request aborted by the caller.
  Canceled = 'canceled',
}
