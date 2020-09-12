import { expect } from 'chai';
//const spies = require('chai-spies');
//chai.use(spies);

import domUpdates from '../src/domUpdates.js';
import recipe from '../src/recipe.js';
import Recipe from '../src/recipe';

function makeSpy(toTest) {
  function spy() {
    spy.calledWith.push(Array.from(arguments))
    spy.calls++;
    let result = spy.func(...arguments);
    spy.returned.push(result)
    return result;
  }
  spy.func = toTest;
  spy.calledWith = [];
  spy.returned = [];
  spy.calls = 0;
  return spy;
}
var node;
describe.only('Dom Update Object', function() {
  beforeEach(function () {
    global.document = {};
    node = {};
    node.insertAdjacentHTML = makeSpy(() => 'KJ')
    global.document.querySelector = makeSpy(() => {
      return node;
    });
  });

  describe('greetUser', function() {
    it('should receive a string as a parameter', function() {
      let babySpy = makeSpy(domUpdates.greetUser);
      babySpy('Gertrude');
      expect(babySpy.calls).to.equal(1);
      expect(babySpy.calledWith).to.deep.equal([['Gertrude']]);

      expect(global.document.querySelector.returned).to.deep.equal([node]);
      expect(global.document.querySelector.calls).to.equal(1);
      expect(global.document.querySelector.calledWith).to.deep.equal([[".banner-image"]]);

      expect(node.insertAdjacentHTML.returned).to.deep.equal(['KJ']);
      expect(node.insertAdjacentHTML.calls).to.equal(1);
      expect(node.insertAdjacentHTML.calledWith[0][0]).to.equal("afterbegin");

      babySpy('Batilba');
      expect(babySpy.calls).to.equal(2);
      expect(babySpy.calledWith).to.deep.equal([['Gertrude'],['Batilba']]);
    });
  });

  describe('addToDom', function() {
    it('should return nothing', function() {
      let spyGuys = makeSpy(domUpdates.addToDom);
      let recipeInfo = {
        id: '',
        name: '',
        image: '',
        tags: ['']
      }
      spyGuys(recipeInfo, '', node)
      expect(spyGuys.returned).to.deep.equal([undefined])
    })

    it('should run insertAdjacentHTML once', function() {
      let spyGuys = makeSpy(domUpdates.addToDom);
      let recipeInfo = {
        id: '',
        name: '',
        image: '',
        tags: ['']
      }
      spyGuys(recipeInfo, '', node)
      expect(node.insertAdjacentHTML.calls).to.equal(1);
    })

    it('should be called with beforeend', function() {
      let spyGuys = makeSpy(domUpdates.addToDom);
      let recipeInfo = {
        id: '',
        name: '',
        image: '',
        tags: ['']
      }
      let testString = `
      <div class="recipe-card" id=>
        <h3 maxlength="40"></h3>
        <div class="card-photo-container">
          <img src= class="card-photo-preview" alt=" recipe" title=" recipe">
          <div class="text">
            <div>Click for Instructions</div>
          </div>
        </div>
        <h4></h4>
        <img src="./images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
      </div>`
      spyGuys(recipeInfo, '', node)
      expect(node.insertAdjacentHTML.calledWith[0]).to.deep.equal(['beforeend', testString]);
    })
  })

  describe('listTags', function() {
    it('should run insertAdjacentHTML for each element of allTags', function() {
      let listSpy = makeSpy(domUpdates.listTags);
      let allTags = [
        'breakfast',
        'lunch',
        'dinner'
      ]

      listSpy(allTags, node);
      expect(node.insertAdjacentHTML.calls).to.equal(3);
      expect(node.insertAdjacentHTML.returned).to.deep.equal(['KJ', 'KJ', 'KJ']);
    })

    it('should be called with beforeend', function() {
      let listSpy = makeSpy(domUpdates.listTags);
      let allTags = [
        'breakfast',
        'lunch',
        'dinner'
      ]

      listSpy(allTags, node);
      expect(node.insertAdjacentHTML.calledWith[0][0]).to.deep.equal('beforeend');
    })
  })

  describe('capitalize', function() {
    it('should return an array of capitalized words', function() {
      let sampleWords = 'zebra elephant giraffe'

      domUpdates.capitalize(sampleWords);
      expect(domUpdates.capitalize(sampleWords)).to.deep.equal('Zebra Elephant Giraffe');
    })
  })

  describe('hideRecipes', function() {
    it.skip('should run for each recipe', function() {
      let hideRecipesSpy = makeSpy(domUpdates.hideRecipes);

      let sampleRecipe = [{
        name: '',
        id: ''
      },
      { name: '',
        id: ''
      }]

      hideRecipesSpy(sampleRecipe);
      expect(hideRecipesSpy(sampleRecipe).calls).to.equal(2);
      //expect(global.document.getElementById.calls).to.equal(2);
      //expect(global.document.getElementById.returned).to.deep.equal(['KJ', 'KJ']);

      //**FAILING** TypeError: document.getElementById is not a function
    })
  })

  describe('updatePicture', function() {
    it.skip('should...', function() {

    })
  })

  describe('makeInline', function() {
    it.skip('should ...', function () {

    })
  })

  describe('addOverlay', function() {
    it('should add text', function () {
    let overlaySpy = makeSpy(domUpdates.addOverlay)
    overlaySpy(node);

    expect(node.insertAdjacentHTML.returned).to.deep.equal(['KJ']);
    })

    it('should be called once', function () {
    let overlaySpy = makeSpy(domUpdates.addOverlay)
    overlaySpy(node);

    expect(node.insertAdjacentHTML.calls).to.equal(1);
    })

    it('should be called with beforebegin and end of the div', function () {
    let overlaySpy = makeSpy(domUpdates.addOverlay)
    overlaySpy(node);

    expect(node.insertAdjacentHTML.calledWith[0][0]).to.equal("beforebegin");
    expect(node.insertAdjacentHTML.calledWith[0][1]).to.equal("<section id='overlay'></div>");
    })
  })

  describe('generateRecipeTitle', function() {
    it('should be called with beforeend', function () {
      let titleSpy = makeSpy(domUpdates.generateRecipeTitle);
      let ingredientsData = ''
      let testString = `
      <button id="exit-recipe-btn">X</button>
      <h3 id="recipe-title"></h3>
      <h4>Cost of Recipe: 0.00</h4>
      <h4>Ingredients</h4>
      <p></p>`;

        let recipe = new Recipe({
          id: '',
          name: '',
          image: '',
          ingredients: [],
          tags: ['']
        })

      titleSpy(recipe, '', node, '');
      expect(node.insertAdjacentHTML.calledWith[0]).to.deep.equal(['beforeend', testString]);
    })

    it('should be called once', function() {
      let titleSpy = makeSpy(domUpdates.generateRecipeTitle);
      let ingredientsData = ''
      let recipe = new Recipe({
        id: '',
        name: '',
        image: '',
        ingredients: [],
        tags: ['']
      })

      titleSpy(recipe, '', node, '');
      expect(node.insertAdjacentHTML.calls).to.equal(1);
    })

    it('should return nothing', function() {
      let titleSpy = makeSpy(domUpdates.generateRecipeTitle);
      let ingredientsData = ''
      let recipe = new Recipe({
        id: '',
        name: '',
        image: '',
        ingredients: [],
        tags: ['']
      })

      titleSpy(recipe, '', node, '');
      expect(node.insertAdjacentHTML.returned).to.deep.equal(['KJ']);
    })
  })

  describe('addRecipeImage', function () {
    it.skip('should', function () {
      let addRecipeSpy = makeSpy(domUpdates.addRecipeImage);

      expect(document.getElementById.calledWith).to.deep.equal([[".recipe-title"]]);
    })

  })

});
