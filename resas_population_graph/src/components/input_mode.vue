<!-- 「総人口」「年少人口」「生産年齢人口」「老年人口」切り替え -->
<template>
  <h1>モード選択</h1>
  <form class="boxdisplay">
    <label
      >総人口<input
        type="radio"
        name="mode"
        value="総人口"
        v-model="checked"
        @change="mode_changed"
        checked
      />
    </label>
    <label
      >年少人口<input
        type="radio"
        name="mode"
        value="年少人口"
        v-model="checked"
        @change="mode_changed"
      />
    </label>
    <label
      >生産年齢人口<input
        type="radio"
        name="mode"
        value="生産年齢人口"
        v-model="checked"
        @change="mode_changed"
      />
    </label>
    <label
      >老年人口<input
        type="radio"
        name="mode"
        value="老年人口"
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
      checked: "総人口",
    };
  },
  methods: {
    mode_changed() {
      this.$emit("mode_changed", this.checked);
    },
  },
  emits: ["mode_changed"],
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
