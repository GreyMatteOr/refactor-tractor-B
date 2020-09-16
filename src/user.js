import Pantry from './pantry'

class User {
  constructor(userData) {
    this.userData = userData
    this.id = userData.id;
    this.name = userData.name;
    this.pantry = new Pantry(userData.pantry)
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.shoppingList = [];
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

  getAllMissingIngredients() {
    let output = [];
    this.recipesToCook.forEach(recipe => {
      let missing = this.pantry.findMissingIngredients(recipe);
      missing.forEach(ingredient => {
        let current = output.find(i => i.id === ingredient.id);
        if (current === undefined) {
          output.push(ingredient);
        } else {
          current.needs += ingredient.needs;
        }
      });
    });
    return output;
  }
}

export default User;
