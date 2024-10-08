<!-- APIキー入力 -->
<script setup lang="ts">
import { defineEmits, ref } from "vue";

const api_key = ref("");

const emits = defineEmits<{
  (e: "api_key_get", key: string): void;
}>();
</script>

<template>
  <h2>API-key入力</h2>
  <form class="boxdisplay">
    <label>APIキーを入力してください：</label>
    <input type="password" value="API-key" v-model="api_key" />
    <input type="submit" @click="emits('api_key_get', api_key)" />
  </form>
</template>

<style scoped>
input {
  margin: 5px;
}
.boxdisplay {
  border: double 7px #f0f;
  margin: 0;
  padding: 5px;
}
</style>
