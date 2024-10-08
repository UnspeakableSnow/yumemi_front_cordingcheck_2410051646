// 特にjsonを受け止める型
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
