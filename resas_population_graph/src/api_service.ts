// API使用ユーティリティ
import { todouhuken_returndata, population_returndata } from "./types";

const headers = new Headers();
headers.set("Accept", "application/json");
headers.set("Content-Type", "application/json;charset=utf-8");

export function set_API_key(key: string) {
  headers.set("X-API-KEY", key);
}
export async function fetchAPI_todouhuken(url: string) {
  const response = await fetch(url, { headers: headers });
  if (!response.ok) {
    throw new Error("API Error!");
  }
  const returndata: todouhuken_returndata = await response.json();
  return returndata.result;
}
export async function fetchAPI_population(url: string) {
  const response = await fetch(url, { headers: headers });
  if (!response.ok) {
    throw new Error("API Error!");
  }
  const returndata: population_returndata = await response.json();
  return returndata.result;
}
