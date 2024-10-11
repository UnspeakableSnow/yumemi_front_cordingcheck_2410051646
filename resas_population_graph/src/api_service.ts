// API使用ユーティリティ
import { todouhuken_return_data, population_return_data } from "./types";

const headers = new Headers();
headers.set("Accept", "application/json");
headers.set("Content-Type", "application/json;charset=utf-8");

export function set_api_key(key: string) {
  headers.set("X-API-KEY", key);
}
export async function fetch_api_todouhuken() {
  const response = await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    { headers: headers }
  );
  const return_data: todouhuken_return_data = await response.json();
  // エラーがないならnull
  if (return_data.message != null) {
    console.error(return_data.message);
    throw new Error();
  }
  return return_data.result;
}
export async function fetch_api_population(code: number) {
  const response = await fetch(
    "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
      String(code),
    { headers: headers }
  );
  const return_data: population_return_data = await response.json();
  if (return_data.message != null) {
    console.error(return_data.message);
    throw new Error();
  }
  return return_data.result;
}
