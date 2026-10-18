import type { z } from "zod";

export class ApiContractError extends Error {
  readonly endpoint: string;
  readonly issues: z.core.$ZodIssue[];

  constructor(endpoint: string, issues: z.core.$ZodIssue[]) {
    super(`The response from ${endpoint} did not match its documented schema.`);
    this.name = "ApiContractError";
    this.endpoint = endpoint;
    this.issues = issues;
  }
}

export function parseApiResponse<T>(
  endpoint: string,
  schema: z.ZodType<T>,
  value: unknown,
): T {
  const result = schema.safeParse(value);

  if (!result.success) {
    throw new ApiContractError(endpoint, result.error.issues);
  }

  return result.data;
}

export async function requestWithSchema<T>(
  endpoint: string,
  request: Promise<unknown>,
  schema: z.ZodType<T>,
): Promise<T> {
  return parseApiResponse(endpoint, schema, await request);
}
