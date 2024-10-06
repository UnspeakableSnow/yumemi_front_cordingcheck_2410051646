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
import { fetchAPI_todouhuken } from "../api_service";

export default defineComponent({
  name: "input_todouhuken",
  setup() {
    interface todouhuken_resultdata {
      prefCode: number;
      prefName: string;
    }
    const todouhuken_list = ref<todouhuken_resultdata[]>([]);
    const usersApiUrl =
      "https://opendata.resas-portal.go.jp/api/v1/prefectures";
    fetchAPI_todouhuken(usersApiUrl)
      .then((data: todouhuken_resultdata[]) => (todouhuken_list.value = data))
      .catch((error) => console.error("Error :", error));
    return { todouhuken_list };
  },
  data() {
    return {
      checked: [],
      checked_old: [],
    };
  },
  methods: {
    todouhuken_checked() {
      const add: number[] = this.checked.filter(
        (i) => this.checked_old.indexOf(i) === -1
      );
      if (add.length > 0) {
        this.$emit("todouhuken_checked", {
          code: add[0],
          name: this.todouhuken_list[add[0] - 1].prefName,
        });
      } else {
        const lost = this.checked_old.filter(
          (i) => this.checked.indexOf(i) === -1
        );
        this.$emit("todouhuken_dechecked", {
          code: lost[0],
          name: this.todouhuken_list[lost[0] - 1].prefName,
        });
      }
      this.checked_old = this.checked;
    },
  },
  emits: ["todouhuken_checked", "todouhuken_dechecked"],
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
