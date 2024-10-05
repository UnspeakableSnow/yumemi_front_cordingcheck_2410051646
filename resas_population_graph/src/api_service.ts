// API使用ユーティリティ
const headers = new Headers();
headers.set("X-API-KEY", "tHo6JXy8vlNO6dBUCtXp3hgcTqN19CQXpot93nCa");
headers.set("Accept", "application/json");
headers.set("Content-Type", "application/json;charset=utf-8");

interface returndata {
  message: undefined;
  result: [];
}
export async function fetchUsers(url: string) {
  const response = await fetch(url, { headers: headers });
  if (!response.ok) {
    throw new Error("API Error!");
  }
  const returndata: returndata = await response.json();
  return returndata.result;
}
