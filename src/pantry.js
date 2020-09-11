class Pantry {
  constructor(stock = []) {
    this.ingredients = stock;
    this.stock = stock.reduce((inventory, item) => {
      inventory[item.ingredient] = ( inventory[item.ingredient]
        ? inventory[item.ingredient] + item.amount
        : item.amount);
      return inventory;
    }, {});
  }

  findMissingIngredients(recipe = []) {
    let stillNeed = recipe.ingredients.filter((food) => {
      return !(this.stock[food.id] >= food.quantity.amount)
    });
    return stillNeed.map((food) => {
        let inStock = this.stock[food.id] || 0;
        let missingAmount = food.quantity.amount - inStock;
        return {id: food.id, needs: missingAmount, unit: food.quantity.unit};
      });
  }

  removeIngredients(recipe = []) {
    if(!this.findMissingIngredients(recipe).length) {
      recipe.ingredients.forEach(food => this.stock[food.id] -= food.quantity.amount)
    }
  }


}

export default Pantry;
