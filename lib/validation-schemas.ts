import * as v from "valibot";

export const parseSchema = v.parse;

export const UuidSchema = v.pipe(v.string(), v.uuid("The UUID is badly formatted."));
