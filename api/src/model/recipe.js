class Recipe {
  constructor(id, title, link) {
    this.id = id
    this.title = title;
    this.ingredients = [];
    this.directions = [];
    this.link = link;
    this.tags = [];
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
  }

  addDirection(direction) {
    this.directions.push(direction);
  }

  addTag(tag) {
    this.tags.push(tag);
  }
}

class Ingredient {
  constructor(description) {
    this.description = description;
  }
}

class Tag {
  constructor(name) {
    this.name = name;
  }
}