<!-- 「総人口」「年少人口」「生産年齢人口」「老年人口」切り替え -->
<template>
  <h1>モード選択</h1>
  <form class="boxdisplay">
    <label
      >総人口<input
        type="radio"
        name="mode"
        value="0"
        v-model="checked"
        @change="mode_changed"
        checked
      />
    </label>
    <label
      >年少人口<input
        type="radio"
        name="mode"
        value="1"
        v-model="checked"
        @change="mode_changed"
      />
    </label>
    <label
      >生産年齢人口<input
        type="radio"
        name="mode"
        value="2"
        v-model="checked"
        @change="mode_changed"
      />
    </label>
    <label
      >老年人口<input
        type="radio"
        name="mode"
        value="3"
        v-model="checked"
        @change="mode_changed"
      />
    </label>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "input_mode",
  data() {
    return {
      checked: "0",
    };
  },
  methods: {
    mode_changed() {
      this.$emit("mode_changed", Number(this.checked));
    },
  },
  emits: ["mode_changed"],
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
