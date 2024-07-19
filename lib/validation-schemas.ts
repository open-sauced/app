import { parse, safeParse as rawSafeParse, pipe, string, uuid } from "valibot";

export const parseSchema = parse;
export const safeParse = rawSafeParse;

export const UuidSchema = pipe(string(), uuid("The UUID is badly formatted."));
