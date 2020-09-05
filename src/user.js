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
    return this.favoriteRecipes.filter(recipe => recipe.tags.includes(type));
  }

  filterRecipesToCook(type) {
    return this.recipesToCook.filter(recipe => recipe.tags.includes(type));
  }

  searchForRecipe(keyword) {
    return this.favoriteRecipes.filter(recipe => recipe.name.includes(keyword) || recipe.ingredients.includes(keyword));
  }

}

module.exports = User;
