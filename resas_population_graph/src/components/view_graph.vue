<!-- グラフ表示 -->
<template>
  <h1>グラフ</h1>
  <p :key="index" v-for="(data, index) in selected">
    {{ data }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";

export default defineComponent({
  name: "view_graph",
  props: {
    selected: Array as PropType<number[]>,
  },
  setup(props) {
    console.log(props.selected); // コンソールにnumberが表示される
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
