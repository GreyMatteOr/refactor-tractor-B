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

  hasEnoughIngredients(recipe = []) {
    let stillNeed = recipe.ingredients.filter((food) => {
      return !(this.stock[food.id] >= food.quantity.amount)
    });
    return stillNeed.map((food) => {
        let inStock = this.stock[food.id] || 0;
        let missingAmount = food.quantity.amount - inStock;
        return {[food.id]: missingAmount};
      });
  }

  removeIngredients(recipe = []) {
    if(!this.hasEnoughIngredients(recipe).length) {
      recipe.ingredients.forEach(food => this.stock[food.id] -= food.quantity.amount)
    }
  }


}

export default Pantry;
