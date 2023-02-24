<template>
  <v-app-bar
    app
    :color="theme === 'dark' ? 'background' : 'primary'"
    dense
    hide-on-scroll
  >
    <v-app-bar-nav-icon @click="drawer = true"> </v-app-bar-nav-icon>

    <v-app-bar-title>Personal Menu</v-app-bar-title>

    <v-btn
      :prepend-icon="
        theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
      "
      @click="onClick"
      >Toggle Theme</v-btn
    >
  </v-app-bar>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["update-theme"]);
const theme = ref("light");

const onClick = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  emit("update-theme", theme.value);
};

</script>