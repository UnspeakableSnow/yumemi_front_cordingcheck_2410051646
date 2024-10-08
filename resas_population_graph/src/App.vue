<!-- 枠組み、全体デザイン、グラフ用データ成型 -->
<script setup lang="ts">
import { ref } from "vue";
import input_todouhuken from "./components/input_todouhuken.vue";
import input_mode from "./components/input_mode.vue";
import view_graph from "./components/view_graph.vue";
import api_key_listener from "./components/api_key_listener.vue";
import { fetchAPI_population, set_API_key } from "./api_service";
import { todouhuken_resultdata, population_resultdata } from "./types";

// キーとして監視するためref
const api_key_got = ref<boolean>(false);
const rewrite_key = ref<number>(0);
let mode_changed = 0;

let datalist: { label: string; data: population_resultdata }[] = [];
let datasets: { label: string; borderColor: string; data: number[] }[] = [];

async function getData(terget: todouhuken_resultdata) {
  const usersApiUrl =
    "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" +
    String(terget.prefCode);
  await fetchAPI_population(usersApiUrl)
    .then((data: population_resultdata) => {
      datalist.push({ label: terget.prefName, data: data });
    })
    .catch((error) => console.error("Error :", error));
}

async function todouhuken_check(checked: todouhuken_resultdata) {
  await getData(checked);
  create_datasets();
}
function todouhuken_decheck(checked: todouhuken_resultdata) {
  datalist.splice(
    datalist.findIndex((data) => data.label === checked.prefName),
    1
  );
  create_datasets();
}
function mode_change(checked: number) {
  mode_changed = checked;
  create_datasets();
}
function api_key_get(key: string) {
  set_API_key(key);
  api_key_got.value = true;
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
  rewrite_key.value++;
}
</script>

<template>
  <h1>
    県別人口推移グラフ<br />
    Population transition graph
  </h1>
  <api_key_listener @api_key_get="api_key_get" v-if="!api_key_got" />
  <div v-else>
    <input_todouhuken
      @todouhuken_checked="todouhuken_check"
      @todouhuken_dechecked="todouhuken_decheck"
    />
    <input_mode @mode_changed="mode_change" />
    <view_graph :datasets="datasets" :key="rewrite_key" />
  </div>
</template>
