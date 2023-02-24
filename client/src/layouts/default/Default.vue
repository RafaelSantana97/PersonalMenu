<template>
  <v-app :theme="theme">
    <default-bar @update-theme="updateTheme" />

    <default-view />
  </v-app>
</template>

<script setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import { ref } from "vue";

const theme = ref("light");

const updateTheme = (newData) => {
  theme.value = newData;
};

defineExpose({
  theme,
  updateTheme,
});
</script>
