/**
 * Returns true for un-escaped slugs in URLs.
 *
 * Example ok slugs:
 *   - opensauced
 *   - 123open-sauced123
 *
 * Example unallowed, escaped slugs:
 *   - open.sauced
 *   - open/sauced
 *   - open;sauced
 */

function isValidUrlSlug(value: string): boolean {
  const validPattern = /^[a-zA-Z0-9-_]+$/;

  return validPattern.test(value);
}

/**
 * Returns true for strings that can be parsed as integers and are non-negative
 * and over zero.
 *
 * Example ok numbers:
 *   - "1"
 *   - "123"
 *   - "999999"
 *
 * Example unallowed, escaped slugs:
 *   - "0"
 *   - "0.123"
 *   - "-2"
 */

function isValidUrlNumber(value: string): boolean {
  const issueNumber = parseInt(value, 10);

  return !isNaN(issueNumber) && issueNumber > 0;
}

export { isValidUrlSlug, isValidUrlNumber };
