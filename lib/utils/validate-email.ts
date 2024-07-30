/*
 * the following is a simple regular expression based on the HTML 5 specification
 * which defines what a valid email address is. This can be used to test if a user
 * provided email passes the spec but is not all encompassing:
 *
 * As many others throughout the years have said, the only REAL way to test if an email
 * is actually valid is to send an email to that address.
 *
 * Attribution: HTML 5 "valid email address" spec - https://html.spec.whatwg.org/#valid-e-mail-address
 * Attribution: Webkit browser validation - https://trac.webkit.org/browser/webkit/trunk/Source/WebCore/html/EmailInputType.cpp
 */

export const validEmailRegex = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
);

export const validateEmail = (email: string) => validEmailRegex.test(email);
