<!-- 「総人口」「年少人口」「生産年齢人口」「老年人口」切り替え -->
<script setup lang="ts">
import { defineEmits, ref } from "vue";

const checked = ref(0);

const emits = defineEmits<{
  (e: "mode_changed", checked: number): void;
}>();

function mode_changed() {
  emits("mode_changed", checked.value);
}
</script>

<template>
  <h2>モードを選択</h2>
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

<style scoped>
label {
  border-radius: 5px;
  margin: 5px;
  padding-bottom: 1px;
  padding-left: 2px;
}
.boxdisplay {
  border: double 7px #f0f;
  margin: 0;
  padding: 5px;
}
@media screen and (max-width: 550px) {
  .boxdisplay {
    display: flex;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 480px) {
  .boxdisplay {
    flex-direction: column;
  }
}
</style>
