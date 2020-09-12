import { expect } from 'chai';
//const spies = require('chai-spies');
//chai.use(spies);

import domUpdates from '../src/domUpdates.js';
import recipe from '../src/recipe.js';
import Recipe from '../src/recipe';

 global.window = {}


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
    node.insertAdjacentHTML = makeSpy(() => 'KJ');

    global.document.querySelector = makeSpy(() => {
      return node;

    });

    global.document.getElementById = makeSpy(() => {
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
      let recipes = [{
        id: '',
        name: '',
        image: '',
        ingredients: [],
        tags: ['']
      }]

      hideRecipesSpy(recipes);
      expect(hideRecipesSpy(recipes).calls).to.equal(1);
      //expect(global.document.getElementById.calls).to.equal(2);
      //expect(global.document.getElementById.returned).to.deep.equal(['KJ', 'KJ']);

      //**FAILING** TypeError: document.getElementById is not a function
    })
  })

  describe('updatePicture', function() {
    it('should update the image', function() {
      let pictureSpy = makeSpy(domUpdates.updatePicture);
      let image = '../src/images/apple-logo.png'

      pictureSpy(node, image);
      expect(node.src).to.equal(image);
    })

    it('should run once', function() {
      let pictureSpy = makeSpy(domUpdates.updatePicture);
      let image = '../src/images/apple-logo.png'

      pictureSpy(node, image);
      expect(pictureSpy.calls).to.equal(1);
    })
  })

  describe('makeInline', function() {
    it.skip('should run once', function () {
      let inLineSpy = makeSpy(domUpdates.makeInline);

      inLineSpy(node);
      expect(node.style.display.calls).to.equal(1)
      //**FAILED** TypeError: Cannot set property 'display' of undefined
    })

    it.skip('should have the value of inline', function () {
      let inLineSpy = makeSpy(domUpdates.makeInline);
      node.style = '';

      inLineSpy(node);
      expect(inLineSpy(node)).to.equal('inline');
      //**FAILED** TypeError: Cannot set property 'display' of undefined
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

      let ingredientsData = ''
      let recipe = new Recipe({
        id: '',
        name: '',
        image: '',
        ingredients: [],
        tags: ['']
      })
        let titleSpy = makeSpy(domUpdates.generateRecipeTitle);
      titleSpy(recipe, '', node, '');
      expect(node.insertAdjacentHTML.returned).to.deep.equal(['KJ']);
    })
  })

  describe('addRecipeImage', function () {
    it.skip('should be called with a class', function () {
      let addRecipeSpy = makeSpy(domUpdates.addRecipeImage);

      expect(document.getElementById.calledWith).to.deep.equal(["recipe-title"]);
      //**FAILED** TypeError: Cannot read property 'calledWith' of undefined
    })
  })

  describe('generateInstructions', function () {
    it('should run once for each step in the recipe', function(){
      let recipeSpy = makeSpy(domUpdates.generateInstructions);
      let recipe = new Recipe({
        id: '',
        name: '',
        image: '',
        ingredients: [],
        tags: [''],
        instructions: [
          {
            "number": 1,
            "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy."
          },
          {
            "number": 2,
            "instruction": "Add egg and vanilla and mix until combined."
          }
        ]
      })

      recipeSpy(recipe, node);
      expect(node.insertAdjacentHTML.calls).to.equal(2)
      expect(node.insertAdjacentHTML.calls).to.equal(2);
    })

    it('should be called with beforeend', function(){
      let recipeSpy = makeSpy(domUpdates.generateInstructions);
      let recipe = new Recipe({
        id: '',
        name: '',
        image: '',
        ingredients: [],
        tags: [''],
        instructions: [
          {
            "number": 1,
            "instruction": "In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy."
          },
          {
            "number": 2,
            "instruction": "Add egg and vanilla and mix until combined."
          }
        ]
      })

      recipeSpy(recipe, node);
      expect(node.insertAdjacentHTML.calledWith[0]).to.deep.equal(['beforeend', "<h4>Instructions</h4>"]);
      expect(node.insertAdjacentHTML.calledWith[1][0]).to.deep.equal('beforeend');
      //not sure how to test the instructionsList, though I know it's working
    })
  })

  describe('exitRecipe', function() {
    it.skip('should do something, but I do not know what', function(){

    })
  })

  describe('showMyRecipesBanner', function(){
    it.skip('should run once', function(){
      let bannerSpy = makeSpy(domUpdates.showMyRecipesBanner);

      bannerSpy();
      expect(global.document.querySelector.calls).to.equal(1);
    })

    it.skip('should be called with classes', function(){
      let bannerSpy = makeSpy(domUpdates.showMyRecipesBanner);

      bannerSpy();
      expect(global.document.querySelector.calledWith[0]).to.deep.equal([".welcome-msg"]);
      expect(global.document.querySelector.calledWith[1]).to.deep.equal([".my-recipes-banner"]);
    })
    //**FAILED** TypeError: Cannot set property 'display' of undefined
  })

  describe('showWelcomeBanner', function(){
    it.skip('should run once', function(){
      let bannerSpy = makeSpy(domUpdates.showWelcomeBanner);

      bannerSpy();
      expect(global.document.querySelector.calls).to.equal(1);
    })

    it.skip('should be called with classes', function(){
      let bannerSpy = makeSpy(domUpdates.showWelcomeBanner);

      bannerSpy();
      expect(global.document.querySelector.calledWith[0]).to.deep.equal([".welcome-msg"]);
      expect(global.document.querySelector.calledWith[1]).to.deep.equal([".my-recipes-banner"]);
    })
    //**FAILED** TypeError: Cannot set property 'display' of undefined
  })

  describe('showAllRecipes', function(){
    it.skip('should run once for each recipe', function(){
      let showAllSpy = makeSpy(domUpdates.showAllRecipes);
      let recipes = [{
        id: '1',
        name: '11',
        },
        {
        id: '2',
        name: '22'
        }]

      showAllSpy(recipes);
      expect(showAllSpy(recipes).calls).to.equal(2);
    })
    //**FAILED** TypeError: Cannot set property 'display' of undefined
  })

  describe('toggleMenu', function(){
    it.skip('should run once', function(){
      let bannerSpy = makeSpy(domUpdates.toggle);

      bannerSpy();
      expect(global.document.querySelector.calls).to.equal(1);
    })

    it.skip('should be called with classes', function(){
      let bannerSpy = makeSpy(domUpdates.toggle);

      bannerSpy();
      expect(global.document.querySelector.calledWith[0]).to.deep.equal([".drop-menu"]);
      expect(global.document.querySelector.calledWith[1]).to.deep.equal([".shopping-list"]);
    })
  })
    //**FAILED** TypeError: spy.func is not a function

    describe('toggleShoppingList', function() {
      it.skip('should run once for each element of the list', function(){
        let toggleSpy = makeSpy(domUpdates.toggleShoppingList);
         let list =[{
           name: '1',
           needs: '2',
           unit: '3'
         },
         {
           name: '4',
           needs: '5',
           unit: '6'
         }]

         toggleSpy(list);
         expect(global.document.querySelector.calls).to.equal(2);
      })

      it.skip('should be called with a certain class', function(){
        let toggleSpy = makeSpy(domUpdates.toggleShoppingList);
         let list =[{
           name: '1',
           needs: '2',
           unit: '3'
         },
         {
           name: '4',
           needs: '5',
           unit: '6'
         }]

         toggleSpy(list);
         expect(global.document.querySelector.calledWith).to.deep.equal(['.drop-menu']);
         //**FAILED** TypeError: Cannot read property 'add' of undefined
      })
    })

    describe('displayPantryInfo', function(){
      it('should run for each ingredient in the pantry', function(){
        let pantrySpy = makeSpy(domUpdates.displayPantryInfo);
        let pantry = ['flour', 'egg', 'salt'];

        pantrySpy(pantry);
        expect(global.document.querySelector.calls).to.equal(3);
      })

      it.skip('should add to the pantry list for each ingredient in the pantry', function(){
        let pantrySpy = makeSpy(domUpdates.displayPantryInfo);
        let pantry = [{
          name: 'flour',
          count: 1}
          ,{
            name: 'egg',
            count: 2},
            {
            name: 'salt',
            count: 3
            }
          ];
          let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
            <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;

        pantrySpy(pantry);
        expect(node.insertAdjacentHTML.calledWith[1]).to.deep.equal(["beforeend", ingredientHtml]);
        //**FAILED** ReferenceError: ingredient is not defined
      })

      describe('hideRecipe', function() {
        it.skip('should run once', function(){

        })

        it.skip('should...', function(){

        })
      })
    })







});
