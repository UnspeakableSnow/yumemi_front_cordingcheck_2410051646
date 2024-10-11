<!-- APIキー入力 -->
<script setup lang="ts">
import { defineEmits, ref } from "vue";

const api_key = ref("");

const emits = defineEmits<{
  (e: "api_key_get", key: string): void;
}>();
</script>

<style scoped>
input {
  margin: 5px;
}
</style>

<template>
  <h2>API-key入力</h2>
  <form class="box_display" @submit.prevent="emits('api_key_get', api_key)">
    <label>APIキーを入力してください：</label>
    <input type="password" value="API-key" v-model="api_key" />
    <input type="submit" />
  </form>
</template>
