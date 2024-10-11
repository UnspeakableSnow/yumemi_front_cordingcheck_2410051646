<!-- 枠組み、全体デザイン、グラフ用データ成型 -->
<script setup lang="ts">
import { ref } from "vue";
import input_todouhuken from "./components/input_todouhuken.vue";
import input_mode from "./components/input_mode.vue";
import view_graph from "./components/view_graph.vue";
import api_key_listener from "./components/api_key_listener.vue";
import { fetch_api_population, set_api_key } from "./api_service";
import { todouhuken_data, population_data } from "./types";

// 描画キーとして監視するためref
const api_key_got = ref<boolean>(false);
const rewrite_key = ref<number>(0);

let mode_changed = 0;
let raw_data_list: { label: string; data: population_data }[] = [];
let data_sets: {
  label: string;
  borderColor: string;
  data: number[];
  borderDash: number[];
}[] = [];

// APIで都道府県別人口推移データを取得
async function get_population_data(terget: todouhuken_data) {
  await fetch_api_population(terget.prefCode)
    .then((data: population_data) => {
      raw_data_list.push({ label: terget.prefName, data: data });
    })
    .catch((error) => console.error("Error :", error));
}

// データ成型
function create_data_sets() {
  data_sets = [];
  let coler_counter = 0;
  raw_data_list.forEach((d) => {
    data_sets.push({
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
      ][coler_counter % 9],
      data: d.data.data[mode_changed].data.slice(0, 9).map((single_data) => {
        return single_data.value;
      }),
      borderDash: [],
    });
    data_sets.push({
      label: d.label + " 予測値",
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
      ][coler_counter % 9],
      data: Array.from({ length: 8 }, () => NaN).concat(
        d.data.data[mode_changed].data.slice(8, 15).map((single_data) => {
          return single_data.value;
        })
      ),
      borderDash: [5, 3],
    });
    coler_counter++;
  });
  rewrite_key.value++;
}

async function todouhuken_check(checked: todouhuken_data) {
  await get_population_data(checked);
  create_data_sets();
}
function todouhuken_decheck(checked: todouhuken_data) {
  raw_data_list.splice(
    raw_data_list.findIndex((data) => data.label === checked.prefName),
    1
  );
  create_data_sets();
}
function mode_change(checked: number) {
  mode_changed = checked;
  create_data_sets();
}
function api_key_get(key: string) {
  set_api_key(key);
  api_key_got.value = true;
}
function api_error() {
  api_key_got.value = false;
  alert(
    "APIにエラーが発生しました。APIキーが有効であることを確認してください。"
  );
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
      @api_error="api_error"
    />
    <input_mode @mode_changed="mode_change" />
    <view_graph :data_sets="data_sets" :key="rewrite_key" />
  </div>
</template>
