/**
 * \p{L} : Unicode character class that corresponds to all letters of all languages.
 * The u option at the end of the regex indicates that the regular expression uses Unicode characters.
 * \-' : Corresponds to hyphens, apostrophes.
 */
export const regexText = /^[\p{L}\-' ]+$/u;

/**
 * [\w] : Corresponds to an alphanumeric character (letter or number). The \w is a shortcut for [a-zA-Z0-9_]
 */
export const regexStreet = /^[\w]+/;

export const regexCity = /^[a-zA-Z]+(?:[\s-'.&/][a-zA-Z]+)*(?:[.|\s])?(?:[(a-z)])*$/;

export const regexZip = /^\d{1,5}$/;

export const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * (?=.*[a-z]): At least one lowercase letter
 * (?=.*[A-Z]): At least one upper case letter
 * (?=.*\d): At least one number
 * (?=.*[@$!%*?&]): At least one special character (@, $, !, %, *, ?, &)
 * [A-Za-z\d@$!%*?&]{8,}: At least 8 characters consisting of letters (upper and lower case), numbers and special characters (@, $, !, %, *, ?, &)
 */
export const regexNewPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;