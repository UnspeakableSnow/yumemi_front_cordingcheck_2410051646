<!-- 枠組み、全体デザイン、データパイプ -->
<script setup lang="ts">
const test_input = [1, 4, 6, 12];
</script>

<template>
  <input_todouhuken @todouhuken_checked="todouhuken_check" />
  <input_mode @mode_changed="mode_change" />
  <view_graph :selected="test_input" />
  <p>{{ todouhuken_checked }}</p>
  <p>{{ mode_changed }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import input_todouhuken from "./components/input_todouhuken.vue";
import input_mode from "./components/input_mode.vue";
import view_graph from "./components/view_graph.vue";

export default defineComponent({
  name: "App",
  components: {
    input_todouhuken,
    input_mode,
    view_graph,
  },
  data() {
    return {
      todouhuken_checked: ref([]),
      mode_changed: ref("総人口"),
    };
  },
  methods: {
    todouhuken_check(checked: []) {
      this.todouhuken_checked = checked;
    },
    mode_change(checked: string) {
      this.mode_changed = checked;
    },
  },
});
</script>
