<!-- 都道府県選択 -->
<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { fetch_api_todouhuken } from "@/api_service";
import { todouhuken_data } from "@/types";

const emits = defineEmits<{
  (e: "todouhuken_checked", checked: todouhuken_data): void;
  (e: "todouhuken_dechecked", checked: todouhuken_data): void;
  (e: "api_error"): void;
}>();

const todouhuken_list = ref<todouhuken_data[]>([]);

const checked = ref<number[]>([]);
const checked_old = ref<number[]>([]);

fetch_api_todouhuken()
  .then((data: todouhuken_data[]) => (todouhuken_list.value = data))
  .catch(() => emits("api_error"));

function todouhuken_checked() {
  // checkedにあってchecked_oldにない値（増えた値）を検索
  const add: number[] = checked.value.filter(
    (i: number) => checked_old.value.indexOf(i) === -1
  );
  if (add.length > 0) {
    emits("todouhuken_checked", {
      prefCode: add[0],
      prefName: todouhuken_list.value[add[0] - 1].prefName,
    });
  } else {
    const lost = checked_old.value.filter(
      (i: number) => checked.value.indexOf(i) === -1
    );
    emits("todouhuken_dechecked", {
      prefCode: lost[0],
      prefName: todouhuken_list.value[lost[0] - 1].prefName,
    });
  }
  checked_old.value = checked.value;
}
</script>

<style scoped>
label {
  border: solid 1px #aa4;
  border-radius: 5px;
  margin: 2px;
  padding-bottom: 1px;
  padding-left: 2px;
}
.box_display {
  display: flex;
  flex-wrap: wrap;
}
@media screen and (max-width: 480px) {
  .box_display {
    flex-direction: column;
  }
}
</style>

<template>
  <h2>都道府県を選択</h2>
  <div class="box_display">
    <label v-for="(todouhuken, id) in todouhuken_list" :key="id">
      {{ todouhuken.prefName
      }}<input
        type="checkbox"
        :value="todouhuken.prefCode"
        v-model="checked"
        @change="todouhuken_checked"
      />
    </label>
  </div>
</template>
