import { expect } from 'chai';

import Pantry from '../src/pantry';

describe('Pantry', function() {
  let recipe1, recipe2, pantry, stock, recipe;

  beforeEach(function() {
    stock = [
      {
        "ingredient": 1,
        "amount": 2
      },
      {
        "ingredient": 2,
        "amount": 3
      },
      {
        "ingredient": 3,
        "amount": 4
      },
      {
        "ingredient": 4,
        "amount": 0.5,
      }
    ];
    recipe1 = {
      "ingredients": [
        {
          "id": 1,
          "quantity": {
            "amount": 1.5,
            "unit": "c"
          }
        }
      ]
    };
    recipe2 = {
      "ingredients": [
        {
          "id": 2,
          "quantity": {
            "amount": 0.5,
            "unit": "tsp"
          }
        },
        {
          "id": 3,
          "quantity": {
            "amount": 1,
            "unit": "large"
          }
        }
      ]
    };
    pantry = new Pantry(stock);
  });

  describe('Initialization', function() {

    it('should be a function', function() {
      expect(Pantry).to.be.a('function');
    });

    it('should be an instance of Pantry', function() {
      expect(pantry).to.be.an.instanceof(Pantry);
    });

    it('should hold an array of ingredients', function() {
      let inventory = {1: 2, 2: 3, 3: 4, 4: 0.5};
      expect(pantry.stock).to.deep.equal(inventory);
    });
  });

  describe('findMissingIngredients()', function() {

    it('should return `[]` if it has enough ingredients to make a given recipe', function() {
      expect(pantry.findMissingIngredients(recipe1)).to.deep.equal([]);
      expect(pantry.findMissingIngredients(recipe2)).to.deep.equal([]);
    });

    it('should return an amount of each item still needed to complete a given recipe if the pantry doesn\'t contain enough', function() {
      let doesNotHave = {
        "ingredients": [
          {
            "id": 5,
            "quantity": {
              "amount": 1,
              "unit": "tsp"
            }
          }
        ]
      }
      pantry.stock[1] = 0;
      pantry.stock[2] = 0;
      pantry.stock[3] = 0;
      let recipe1Needs = [{id: 1, needs: 1.5, unit: 'c'}]
      let recipe2Needs = [{id: 2, needs: 0.5, unit: 'tsp'}, {id: 3, needs: 1, unit: 'large'}]
      expect(pantry.findMissingIngredients(doesNotHave)).to.deep.equal([{id: 5, needs: 1, unit: 'tsp'}]);
      expect(pantry.findMissingIngredients(recipe1)).to.deep.equal(recipe1Needs);
      expect(pantry.findMissingIngredients(recipe2)).to.deep.equal(recipe2Needs);
    });

    // sadpath: empty array

    // sadpath: invalid argument String. Number. Object
  });

  describe('removeIngredients()', function() {

    it('should update the pantry\'s inventory based on a given recipe', function() {
      pantry.removeIngredients(recipe1)
      expect(pantry.stock).to.deep.equal({1: 0.5, 2: 3, 3: 4, 4: 0.5});

      pantry.removeIngredients(recipe2)
      expect(pantry.stock).to.deep.equal({1: 0.5, 2: 2.5, 3: 3, 4: 0.5});
    });

    it('should not remove any ingredients unless the recipe can be made', function() {
      recipe1.ingredients[0].quantity.amount = 3;
      pantry.removeIngredients(recipe1)
      expect(pantry.stock).to.deep.equal({1: 2, 2: 3, 3: 4, 4: 0.5});

      let doesNotHave = {
        "ingredients": [
          {
            "id": 5,
            "quantity": {
              "amount": 1,
              "unit": "tsp"
            }
          }
        ]
      }
      pantry.removeIngredients(doesNotHave)
      expect(pantry.stock).to.deep.equal({1: 2, 2: 3, 3: 4, 4: 0.5});
    });
  });
});
