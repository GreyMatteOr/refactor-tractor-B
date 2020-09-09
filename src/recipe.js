

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
   let costData = this.ingredients.filter(ingredient => this.ingredients.some(recipeIngredient => recipeIngredient.id === ingredient.id));
   return costData.reduce((totalCost, ingredient) => {
     let ingredientAmount = ingredient.quantity.amount
     let costInDollars = ingredientData.find(i => i.id === ingredient.id).estimatedCostInCents / 100
     return totalCost = (costInDollars * ingredientAmount)
   }, 0)
 }


  getInstructions() {
    return this.instructions;
  }
}



export default Recipe;
