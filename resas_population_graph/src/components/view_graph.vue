<!-- グラフ表示 -->
<script setup lang="ts">
import { defineProps } from "vue";
import type { ChartData, ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Filler,
  LineElement,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  RadialLinearScale,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const props = defineProps<{
  data_sets: {
    label: string;
    borderColor: string;
    data: number[];
    borderDash: number[];
  }[];
}>();

const window_width = window.innerWidth;

const chart_data: ChartData<"line"> = {
  labels: Array.from({ length: 14 }, (v, i) => 1980 + 5 * i),
  datasets: props.data_sets,
};
const options: ChartOptions<"line"> = {
  responsive: true,
};
</script>

<style scoped>
.fadein_case {
  opacity: 0;
  animation-name: fadein;
  animation-duration: 0.8s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}
@keyframes fadein {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(20px);
  }
}
</style>

<template>
  <h2>グラフ表示</h2>
  <div class="fadein_case">
    <!-- レスポンシブデザイン -->
    <Line :data="chart_data" :options="options" v-if="window_width > 480" />
    <Line :data="chart_data" :options="options" height="500" v-else />
  </div>
</template>
