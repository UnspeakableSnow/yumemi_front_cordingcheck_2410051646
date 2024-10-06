// API使用ユーティリティ
const headers = new Headers();
headers.set("X-API-KEY", "tHo6JXy8vlNO6dBUCtXp3hgcTqN19CQXpot93nCa");
headers.set("Accept", "application/json");
headers.set("Content-Type", "application/json;charset=utf-8");

export type todouhuken_resultdata = {
  prefCode: number;
  prefName: string;
};
export type population_resultdata = {
  boundaryYear: number;
  data: { label: string; data: { year: number; value: number }[] }[];
};
export type todouhuken_returndata = {
  message: undefined;
  result: todouhuken_resultdata[];
};
export type population_returndata = {
  message: undefined;
  result: population_resultdata;
};

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
