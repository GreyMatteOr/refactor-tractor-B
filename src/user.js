class User {
  constructor(userData) {
    this.userData = userData
    this.id = userData.id;
    this.name = userData.name;
    this.pantry = userData.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }

  saveRecipe(recipe) {
    this.favoriteRecipes.push(recipe);
  }

  removeRecipe(recipe) {
    let i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1);
  }

  decideToCook(recipe) {
    this.recipesToCook.push(recipe);
  }

  filterFavoriteRecipes(type) {
    let filteredFavorites = this.favoriteRecipes.filter(recipe => {
      return recipe.tags.includes(type);
  })
  return filteredFavorites;
  }

  filterRecipesToCook(type) {
    let filteredtoCook = this.recipesToCook.filter(recipe => {
      return recipe.tags.includes(type);
  })
  return filteredtoCook;
 }

  searchSavedRecipes(keyword) {
    let filteredSavedRecipes = this.favoriteRecipes.filter(recipe => {
      return recipe.name.includes(keyword) || recipe.ingredients.some(ingredient => ingredient.name.includes(keyword));
  })
  return filteredSavedRecipes;
  }
}

module.exports = User;
