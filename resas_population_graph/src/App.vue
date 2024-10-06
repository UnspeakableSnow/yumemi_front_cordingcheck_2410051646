<!-- 枠組み、全体デザイン、グラフ用データ成型 -->
<script setup lang="ts">
import { ref } from "vue";
import input_todouhuken from "./components/input_todouhuken.vue";
import input_mode from "./components/input_mode.vue";
import view_graph from "./components/view_graph.vue";
import { fetchAPI_population } from "./api_service";

let rewrite_key = ref(0);
let mode_changed = 0;

export type population_resultdata = {
  boundaryYear: number;
  data: { label: string; data: { year: number; value: number }[] }[];
};
export type code_name_set = {
  code: number;
  name: string;
};

let datalist: { label: string; data: population_resultdata }[] = [];
let datasets: { label: string; borderColor: string; data: number[] }[] = [];

async function todouhuken_check(checked: { code: number; name: string }) {
  await getData(checked);
  create_datasets();
}
function todouhuken_decheck(checked: { code: number; name: string }) {
  datalist.splice(
    datalist.findIndex((data) => data.label === checked.name),
    1
  );
  create_datasets();
}
function mode_change(checked: number) {
  mode_changed = checked;
  create_datasets();
}

async function getData(terget: { code: number; name: string }) {
  const usersApiUrl =
    "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
    String(terget.code);
  await fetchAPI_population(usersApiUrl)
    .then((data: population_resultdata) => {
      datalist.push({ label: terget.name, data: data });
    })
    .catch((error) => console.error("Error :", error));
}
function create_datasets() {
  datasets = [];
  let coler_conter = 0;
  datalist.forEach((d) => {
    datasets.push({
      label: d.label,
      borderColor: [
        "rgba(255,0,255,0.8)",
        "rgba(0,255,255,0.8)",
        "rgba(255,255,0,0.8)",
        "rgba(255,0,255,0.5)",
        "rgba(0,255,255,0.5)",
        "rgba(255,255,0,0.5)",
        "rgba(255,0,255,0.2)",
        "rgba(0,255,255,0.2)",
        "rgba(255,255,0,0.2)",
      ][coler_conter % 9],
      data: d.data.data[mode_changed].data.map((single_data) => {
        return single_data.value;
      }),
    });
    coler_conter++;
  });
  console.log(datalist);
  rewrite_key.value++;
}
</script>

<template>
  <input_todouhuken
    @todouhuken_checked="todouhuken_check"
    @todouhuken_dechecked="todouhuken_decheck"
  />
  <input_mode @mode_changed="mode_change" />
  <view_graph :datasets="datasets" :key="rewrite_key" />
</template>
