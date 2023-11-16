import Store from "electron-store";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const store = new Store();

export function GetAPIKey(): string {
  return process.env.API_KEY
    ? process.env.API_KEY
    : (store.get("api_key", "") as string);
}

export function GetSecret(): string {
  return process.env.SECRET
    ? process.env.SECRET
    : (store.get("secret", "") as string);
}

export function GetUserName(): string {
  return process.env.USER_NAME
    ? process.env.USER_NAME
    : (store.get("username", "") as string);
}
