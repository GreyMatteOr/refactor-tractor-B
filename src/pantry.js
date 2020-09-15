class Pantry {
  constructor(stock = []) {
    this.ingredients = stock.sort((a, b) => a.id - b.id);
    this.stock = stock.reduce((inventory, item) => {
      inventory[item.ingredient] = (
        inventory[item.ingredient] === undefined
        ? item.amount
        : inventory[item.ingredient] + item.amount
      );
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

  calculateTimesCanMake(recipe = []) {
    if (recipe.length === 0) return null;
    return recipe.ingredients.reduce((lowest, current) => {
      let inStock = (this.stock[current.id] === undefined ? 0 : this.stock[current.id])
      let timesCanMake = Math.floor(inStock / current.quantity.amount)
      if(lowest !== null) return Math.min(lowest, timesCanMake)
      return timesCanMake;
    }, null);
  }

  update(){
    Object.keys(this.stock).forEach(ingID => {
      let exists = this.ingredients.find(item => item.ingredient === +ingID);
      if (exists) exists.amount = this.stock[ingID];
      else {
        let newIng = {
          "ingredient": +ingID,
          "amount": this.stock[ingID]
        }
        this.ingredients.push(newIng);
      }
    })
    this.ingredients.sort((a, b) => a.id - b.id);
  }
}

export default Pantry;
