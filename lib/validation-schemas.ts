import { parse, pipe, string, regex, uuid } from "valibot";

export const parseSchema = parse;

export const UuidSchema = pipe(string(), uuid("The UUID is badly formatted."));

export const GitHubUserNameSchema = pipe(
  string(),
  regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, "The GitHub + username is invalid.")
);
