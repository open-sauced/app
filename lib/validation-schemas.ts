import { parse, pipe, string, uuid } from "valibot";

export const parseSchema = parse;

export const UuidSchema = pipe(string(), uuid("The UUID is badly formatted."));
