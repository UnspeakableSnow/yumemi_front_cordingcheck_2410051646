<!-- 都道府県選択 -->
<template>
  <h1>都道府県選択</h1>
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

<script lang="ts">
import { defineComponent, ref } from "vue";
import { fetchUsers } from "../api_service";

export default defineComponent({
  name: "input_todouhuken",
  setup() {
    interface resultdata {
      prefCode: number;
      prefName: string;
    }
    const todouhuken_list = ref<resultdata[]>([]);
    const usersApiUrl =
      "https://opendata.resas-portal.go.jp/api/v1/prefectures";
    fetchUsers(usersApiUrl)
      .then((data: resultdata[]) => (todouhuken_list.value = data))
      .catch((error) => console.error("Error :", error));
    return { todouhuken_list };
  },
  data() {
    return {
      checked: [],
    };
  },
  methods: {
    todouhuken_checked() {
      this.$emit("todouhuken_checked", this.checked);
    },
  },
  emits: ["todouhuken_checked"],
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label {
  border: solid 1px #444;
  border-radius: 5px;
  margin: 2px;
  padding-bottom: 1px;
  padding-left: 1px;
}
.boxdisplay {
  border: double 7px #f0f;
  margin: 0;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
}
</style>
