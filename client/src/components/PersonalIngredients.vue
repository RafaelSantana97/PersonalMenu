<template>
  <v-card-text>
    <h2 class="text-h6 mb-2">Select what you have on your pantry and fridge</h2>

    <v-chip-group v-model="owned" column multiple>
      <v-chip
        v-for="(i, idx) in ingredients"
        :key="i.id"
        filter
        variant="outlined"
        selected-class="text-primary"
        @click="toggle(idx)"
      >
        {{ i.ingredient }}
      </v-chip>
    </v-chip-group>
  </v-card-text>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const userId = 1;
const owned = ref([]);
const ingredients = ref([]);

axios
  .get("http://localhost:3001/api/ingredients/with-personal-selection")
  .then((response) => {
    ingredients.value = response.data.result;

    for (let i = 0; i < ingredients.value.length; i++) {
      if (ingredients.value[i].owned) owned.value.push(i);
    }
  })
  .catch((error) => {
    console.error(error);
  });

const toggle = (idx) => {
  if (ingredients.value[idx].owned) {
    axios
      .delete(
        `http://localhost:3001/api/ingredients/delete-personal-selection/${userId}/${ingredients.value[idx].id}`
      )
      .then(() => {
        ingredients.value[idx].owned = 0;
      })
      .catch((error) => {
        console.error(error);
        ingredients.value[idx].owned = 0;
      });
  } else {
    axios
      .put(
        `http://localhost:3001/api/ingredients/add-personal-selection/${userId}/${ingredients.value[idx].id}`
      )
      .then(() => {
        ingredients.value[idx].owned = 1;
      })
      .catch((error) => {
        console.error(error);
        ingredients.value[idx].owned = 1;
      });
  }
};
</script>