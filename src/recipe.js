

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.tags = recipe.tags;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions
  }

  calculateIngredientsCost(ingredientData) {
   let costData = ingredientData.filter(ingredient => this.ingredients.some(recipeIngredient => recipeIngredient.id === ingredient.id));
   return costData.reduce((totalCost, ingredient) => {
     let ingredientAmount = this.ingredients.find(i => i.id === ingredient.id).quantity.amount
     return totalCost + (ingredient.estimatedCostInCents * ingredientAmount)
   }, 0)
 }

  getInstructions() {
    return this.instructions;
  }
}



export default Recipe;
