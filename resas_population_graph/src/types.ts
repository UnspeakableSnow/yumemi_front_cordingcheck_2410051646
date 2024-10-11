// 特にjsonを受け止める型の定義
export type todouhuken_data = {
  prefCode: number;
  prefName: string;
};
export type population_data = {
  boundaryYear: number;
  data: { label: string; data: { year: number; value: number }[] }[];
};
export type todouhuken_return_data = {
  // エラー時のみ文字列
  message: string | null;
  result: todouhuken_data[];
};
export type population_return_data = {
  message: string | null;
  result: population_data;
};
