<!-- 都道府県選択 -->
<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { fetchAPI_todouhuken } from "@/api_service";
import { todouhuken_resultdata } from "@/types";

const emits = defineEmits<{
  (e: "todouhuken_checked", checked: todouhuken_resultdata): void;
  (e: "todouhuken_dechecked", checked: todouhuken_resultdata): void;
}>();

const todouhuken_list = ref<todouhuken_resultdata[]>([]);
const usersApiUrl = "https://opendata.resas-portal.go.jp/api/v1/prefectures";

const checked = ref<number[]>([]);
const checked_old = ref<number[]>([]);

fetchAPI_todouhuken(usersApiUrl)
  .then((data: todouhuken_resultdata[]) => (todouhuken_list.value = data))
  .catch((error) => console.error("Error :", error));

function todouhuken_checked() {
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
  border: solid 1px #444;
  border-radius: 5px;
  margin: 2px;
  padding-bottom: 1px;
  padding-left: 2px;
}
.boxdisplay {
  border: double 7px #f0f;
  margin: 0;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
}
@media screen and (max-width: 480px) {
  .boxdisplay {
    flex-direction: column;
  }
}
</style>

<template>
  <h2>都道府県を選択</h2>
  <div class="boxdisplay">
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
