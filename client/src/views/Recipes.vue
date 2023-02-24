<template>
  <v-card-text>
    <h2 class="text-h6 mb-2 text-center">
      {{ recipes.length }} Recipes Available
    </h2>
    <v-row> </v-row>
    <v-card
      v-for="recipe in recipes"
      :key="recipe.id"
      class="mx-auto my-12"
      max-width="574"
    >
      <v-card-item>
        <v-card-title>{{ recipe.title }}</v-card-title>
        <v-card-subtitle>
          <h3 class="mt-2 mb-1">Ingredients</h3>
          <ul>
            <li v-for="ing in recipe.ingredients" :key="ing" class="text-wrap">
              {{ ing }}
            </li>
          </ul>
        </v-card-subtitle>
        <v-card-subtitle>
          <h3 class="mt-2 mb-1">Directions</h3>
          <ol>
            <li v-for="dir in recipe.directions" :key="dir" class="text-wrap">
              {{ dir }}
            </li>
          </ol>
        </v-card-subtitle>
      </v-card-item>

      <v-card-actions>
        <v-btn
          variant="text"
          color="primary"
          :href="'http://' + recipe.link"
          target="_blank"
          class="text-wrap"
        >
          Check on source
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-card-text>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const recipes = ref([]);

axios
  .get("http://localhost:3001/api/recipes/personalized/1")
  .then((response) => {
    recipes.value = response.data.result;
  })
  .catch((error) => {
    console.error(error);
  });
</script>

<style>
ul,
ol {
  list-style: inside;
}
</style>