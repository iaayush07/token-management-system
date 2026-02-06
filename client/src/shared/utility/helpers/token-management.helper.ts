import { LOCAL_STORAGE_KEYS } from "../constants/token-management.constant";

/**
 * Retrieves user roles from the stored auth data
 * @returns Auth object including roles, or null if not authenticated
 */
export const getUserRoles = (): any | null => {
  const authData = getAuthData();
  return authData ? authData : null;
};

/**
 * Retrieves authentication data from localStorage and adds idTokenClaims
 * @returns Auth object with an added `idTokenClaims` field or null if not found
 */
export const getAuthData = (): any | null => {
  const authData = getLocalStorageItem(LOCAL_STORAGE_KEYS.TM_PERMISSIONS);
  return authData
    ? {
        ...authData,
        idTokenClaims: { oid: authData.sub },
      }
    : null;
};

/**
 * Helper function to retrieve a value from localStorage and parse it
 * @param key - The key to retrieve the value from
 * @returns Parsed value if found, otherwise null
 */
const getLocalStorageItem = (key: string): any | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
/**
 * Generates uppercase initials from a given string.
 *
 * Example:
 *   generateInitials("John Doe") => "JD"
 *
 * @param arg - The full name or phrase from which initials should be extracted.
 * @returns A string containing the uppercase initials of each word in the input,
 *          or an empty string if the input is falsy.
 */
export function generateInitials(arg: string | undefined): string {
  return arg
    ? arg
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toLocaleUpperCase()
    : "";
}
