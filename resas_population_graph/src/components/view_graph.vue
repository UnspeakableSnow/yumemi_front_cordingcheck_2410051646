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
  datasets: { label: string; borderColor: string; data: number[] }[];
}>();

const chart_data: ChartData<"line"> = {
  labels: Array.from({ length: 14 }, (v, i) => 1980 + 5 * i),
  datasets: props.datasets,
};
const options: ChartOptions<"line"> = {
  responsive: true,
  // maintainAspectRatio: false,
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

<template>
  <h1>グラフ</h1>
  <Line :data="chart_data" :options="options" />
</template>
