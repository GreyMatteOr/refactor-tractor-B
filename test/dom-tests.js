import { expect } from 'chai';

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
describe('Dom Update Object', function() {
  beforeEach(function () {
    global.document = {};
    node = {};
    node.insertAdjacentHTML = makeSpy(() => 'KJ');
    node.style = {};

    global.document.querySelector = makeSpy(() => {
      return node;

    });

    global.document.getElementById = makeSpy(() => {
      return node;
    });

    global.document.querySelector.classList = [];
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
    it('should run for each recipe', function() {
      let hideRecipesSpy = makeSpy(domUpdates.hideRecipes);
      let recipes = [{
        id: '',
        name: '',
        image: '',
        ingredients: [],
        tags: ['']
      },
      {
        id: '',
        name: '',
        image: '',
        ingredients: [],
        tags: ['']
      }]

      hideRecipesSpy(recipes);
      expect(global.document.getElementById.calls).to.equal(2);
    })

    it('should assign the style display', function() {
      let hideRecipesSpy = makeSpy(domUpdates.hideRecipes);
      let recipes = [{
        id: '',
        name: '',
        image: '',
        ingredients: [],
        tags: ['']
      },
      {
        id: '',
        name: '',
        image: '',
        ingredients: [],
        tags: ['']
      }]

      hideRecipesSpy(recipes);
      expect(node.style.display).to.equal('none');
    })

    it('should return nothing', function() {
      let hideRecipesSpy = makeSpy(domUpdates.hideRecipes);
      let recipes = [{
        id: '',
        name: '',
        image: '',
        ingredients: [],
        tags: ['']
      }]

      hideRecipesSpy(recipes);
      expect(global.document.getElementById.returned).to.deep.equal([node]);
    })
  })

  describe('updatePicture', function() {
    it('should update the image', function() {
      let pictureSpy = makeSpy(domUpdates.updatePicture);
      let image = '../src/images/apple-logo.png'

      pictureSpy(node, image);
      expect(node.src).to.equal(image);
    })
  })

  describe('makeInline', function() {
    it('should set the style.display to inline', function () {
      let inLineSpy = makeSpy(domUpdates.makeInline);

      inLineSpy(node);
      expect(node.style.display).to.equal('inline');
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
    it('should be called with a class', function () {
      let addRecipeSpy = makeSpy(domUpdates.addRecipeImage);

      addRecipeSpy(recipe);
      expect(document.getElementById.calledWith[0]).to.deep.equal(["recipe-title"]);
      expect(document.getElementById.calls).to.equal(1);
      expect(document.getElementById("recipe-title").style.backgroundImage).to.equal(`url(${recipe.image})`);
    })

    it('should run once', function () {
      let addRecipeSpy = makeSpy(domUpdates.addRecipeImage);

      addRecipeSpy(recipe);

      expect(document.getElementById.calls).to.equal(1);
    })

    it('should add a background image to a recipe title', function () {
      let addRecipeSpy = makeSpy(domUpdates.addRecipeImage);

      addRecipeSpy(recipe);
      expect(document.getElementById("recipe-title").style.backgroundImage).to.equal(`url(${recipe.image})`);
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

  describe('showMyRecipesBanner', function(){
    it('should run twice', function(){
      let bannerSpy = makeSpy(domUpdates.showMyRecipesBanner);

      bannerSpy();
      expect(global.document.querySelector.calls).to.equal(2);
    })

    it('should be called with classes', function(){
      let bannerSpy = makeSpy(domUpdates.showMyRecipesBanner);

      bannerSpy();
      expect(global.document.querySelector.calledWith[0]).to.deep.equal([".welcome-msg"]);
      expect(global.document.querySelector.calledWith[1]).to.deep.equal([".my-recipes-banner"]);
    })

    it('should alter display type', function(){
      let bannerSpy = makeSpy(domUpdates.showMyRecipesBanner);

      bannerSpy();
      expect(document.querySelector(".my-recipes-banner").style.display).to.equal('block');
    })
  })

  describe('showWelcomeBanner', function(){
    it('should run twice', function(){
      let bannerSpy = makeSpy(domUpdates.showWelcomeBanner);

      bannerSpy();
      expect(global.document.querySelector.calls).to.equal(2);
    })

    it('should be called with classes', function(){
      let bannerSpy = makeSpy(domUpdates.showWelcomeBanner);

      bannerSpy();
      expect(global.document.querySelector.calledWith[0]).to.deep.equal([".welcome-msg"]);
      expect(global.document.querySelector.calledWith[1]).to.deep.equal([".my-recipes-banner"]);
    })

    it('should alter display type', function(){
      let bannerSpy = makeSpy(domUpdates.showWelcomeBanner);

      bannerSpy();
      expect(document.querySelector(".my-recipes-banner").style.display).to.equal('none');
    })
  })

  describe('showAllRecipes', function(){
    it('should run once for each recipe', function(){
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
      expect(document.getElementById.calls).to.equal(2);
    })

    it('should invoke showWelcomeBanner()', function() {
      let showAllSpy = makeSpy(domUpdates.showAllRecipes);
      let recipes = [{
        id: '1',
        name: '11',
        }]
      showAllSpy(recipes);
      expect(global.document.querySelector.calls).to.equal(2);
    })
  })

  describe('displayPantryInfo', function(){
      it('should run for each ingredient in the pantry', function(){
        let pantrySpy = makeSpy(domUpdates.displayPantryInfo);
        let pantry = ['flour', 'egg', 'salt'];

        pantrySpy(pantry);
        expect(global.document.querySelector.calls).to.equal(3);
      })

      it('should add to the pantry list for each ingredient in the pantry', function(){
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
          let ingredient = pantry[1];
          let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
        <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;

        pantrySpy(pantry);
        expect(node.insertAdjacentHTML.calledWith[1]).to.deep.equal(["beforeend", ingredientHtml]);
      })
  })

  describe('hideRecipe', function() {
      it('should display the ID taken in as parameter', function(){
        let hideSpy = makeSpy(domUpdates.hideRecipe);
        let id = 1;

        hideSpy(id);
        expect(document.getElementById.calledWith[0]).to.deep.equal([`${id}`]);
      })

      it('should be called once', function(){
        let hideSpy = makeSpy(domUpdates.hideRecipe);
        let id = 1;

        hideSpy(id);
        expect(document.getElementById.calls).to.equal(1);
      })

      it('should assign style display property', function(){
        let hideSpy = makeSpy(domUpdates.hideRecipe);
        let id = 1;

        expect(node.style.display).to.equal(undefined);
        hideSpy(id);
        expect(node.style.display).to.equal('none');
      })
    })
});
