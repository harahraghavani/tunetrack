import CryptoJS from "crypto-js";
import { destroyCookie, parseCookies, setCookie } from "nookies";

export const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.REACT_APP_ENCRYPTION_KEY
  ).toString();
  return encryptedData;
};

export const decryptData = (encryptedData) => {
  if (!encryptedData) return null;

  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    process.env.REACT_APP_ENCRYPTION_KEY
  );
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

export const createCookie = (key, value, options = {}) => {
  const defaultOptions = {
    path: "/", // Specify a common path for all cookies
  };
  const encryptedValue = encryptData(value);
  setCookie(null, key, encryptedValue, { ...defaultOptions, ...options });
};

export const getCookie = (key) => {
  const cookies = parseCookies(); // Retrieve all cookies
  const encryptedValue = cookies[key]; // Get the encrypted cookie value
  if (!encryptedValue) return null; // Return null if the cookie is not found

  const decryptedValue = decryptData(encryptedValue); // Decrypt the cookie value
  return decryptedValue; // Return the decrypted value
};

export const clearCookie = (key, options = {}) => {
  const defaultOptions = {
    path: "/", // Specify a common path for all cookies
  };
  destroyCookie(null, key, { ...defaultOptions, ...options });
};
