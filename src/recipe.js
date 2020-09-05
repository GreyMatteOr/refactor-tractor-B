import ingredientData from '../src/data/recipe-data';

class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.tags = recipe.tags;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions
  }

  calculateIngredientsCost() {
   let totalCost = 0;
   this.ingredients.forEach(currentIngredient => {
     this.ingredientData.forEach(ingredient => {
       if (currentIngredient.id === ingredient.id) {
         totalCost += (ingredient.estimatedCostInCents * currentIngredient.quantity.amount) / 100;
       }
     });
   });
   return totalCost;
}

  getInstructions() {
    return this.instructions;
  }
}



export default Recipe;
