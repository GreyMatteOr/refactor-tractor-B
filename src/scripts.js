import $ from 'jquery';


import './css/variables.scss';
import './css/mixins.scss';
import './css/index.scss';
import User from './user';
import Recipe from './recipe';
import domUpdates from './domUpdates.js'
import {allRecipesBtn, buyBtn, buyUserListBtn, filterBtn, fullRecipeInfo, main, pantryBtn, savedRecipesBtn, searchBtn, searchForm, searchInput, shoppingList, showPantryRecipes, tagList, hamburgerBtn, navBtn} from './dom-loader';

let ingredientsData;
let pantryInfo = [];
let recipes = [];
let recipeData;
let users;
let user;



window.addEventListener("load", retrieveData);
allRecipesBtn.addEventListener("click", () => ( domUpdates.showAllRecipes(recipes) ));
buyBtn.addEventListener('click', buyCustomList);
buyUserListBtn.addEventListener('click', buyToCookList);
filterBtn.addEventListener("click", findCheckedBoxes);
main.addEventListener("click", addToMyRecipes);
pantryBtn.addEventListener("click", domUpdates.toggleMenu);
savedRecipesBtn.addEventListener("click", showSavedRecipes);
searchBtn.addEventListener("click", searchRecipes);
shoppingList.addEventListener('click', () => domUpdates.toggleShoppingList(user.shoppingList));
showPantryRecipes.addEventListener("click", findCheckedPantryBoxes);
searchForm.addEventListener("submit", pressEnterSearch);
// hamburgerBtn.addEventListener('click', dropDownMobile)


// RETRIEVE DATA
function retrieveData() {
  Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData'),
    fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/ingredients/ingredientsData'),
    fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/recipes/recipeData')
  ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(([u, i, r]) => {
      users = u.wcUsersData;
      ingredientsData = i.ingredientsData;
      recipeData = r.recipeData.map(recipe => new Recipe(recipe))
      // console.log(users)
      // console.log(recipeData)
      createCards();
      findTags();
      generateUser();
    })
    .catch(err => console.log(err))
}

// GENERATE A USER ON LOAD
function generateUser() {
  user = new User(users[Math.floor(Math.random() * users.length)]);
  let firstName = user.name.split(" ")[0];
  domUpdates.greetUser(firstName);
  findPantryInfo();
}

// CREATE RECIPE CARDS
function createCards() {
  recipeData.forEach(recipe => {
    let shortRecipeName = recipe.name;
    recipes.push(recipe);
    if (recipe.name.length > 40) {
      shortRecipeName = recipe.name.substring(0, 40) + "...";
    }
    domUpdates.addToDom(recipe, shortRecipeName, main)
  });
}

// FILTER BY RECIPE TAGS
function findTags() {
  let tags = [];
  recipeData.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });
  tags.sort();
  domUpdates.listTags(tags, tagList);
}

function findCheckedBoxes() {
  let tagCheckboxes = document.querySelectorAll(".checked-tag");
  let checkboxInfo = Array.from(tagCheckboxes)
  let selectedTags = checkboxInfo.filter(box => {
    return box.checked;
  })
  findTaggedRecipes(selectedTags);
}

function findTaggedRecipes(selected) {
  let filteredResults = [];
  selected.forEach(tag => {
    let allRecipes = recipes.filter(recipe => {
      return recipe.tags.includes(tag.id);
    });
    allRecipes.forEach(recipe => {
      if (!filteredResults.includes(recipe)) {
        filteredResults.push(recipe);
      }
    })
  });
  domUpdates.showAllRecipes(recipes);
  if (filteredResults.length > 0) {
    filterRecipes(filteredResults);
  }
}

function filterRecipes(filtered) {
  let foundRecipes = recipes.filter(recipe => {
    return !filtered.includes(recipe);
  });
  domUpdates.hideRecipes(foundRecipes);
}

// FAVORITE RECIPE FUNCTIONALITY
function addToMyRecipes() {
  if (event.target.className === "card-apple-icon") {
    let cardId = parseInt(event.target.closest(".recipe-card").id)
    if (!user.favoriteRecipes.includes(cardId)) {
      domUpdates.updatePicture(event.target, "./images/apple-logo.png");
      user.saveRecipe(cardId);
    } else {
      domUpdates.updatePicture(event.target, "./images/apple-logo-outline.png");
      user.removeRecipe(cardId);
    }
  } else if (event.target.id === "exit-recipe-btn") {
    domUpdates.exitRecipe(fullRecipeInfo);
  } else if (isDescendant(event.target.closest(".recipe-card"), event.target)) {
    openRecipeInfo(event);
  }
}

function isDescendant(parent, child) {
  let node = child;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function showSavedRecipes() {
  let unsavedRecipes = recipes.filter(recipe => {
    return !user.favoriteRecipes.includes(recipe.id);
  });
  domUpdates.hideRecipes(unsavedRecipes);
  domUpdates.showMyRecipesBanner();
}

// CREATE RECIPE INSTRUCTIONS
function openRecipeInfo(event) {
  domUpdates.makeInline(fullRecipeInfo);
  let recipeId = event.path.find(e => e.id).id;
  let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
  domUpdates.generateRecipeTitle(recipe, generateIngredients(recipe, ingredientsData), fullRecipeInfo, ingredientsData);
  domUpdates.addRecipeImage(recipe);
  domUpdates.generateInstructions(recipe, fullRecipeInfo);
  domUpdates.addOverlay(fullRecipeInfo);
  let inInList = user.recipesToCook.includes(recipe);
  fullRecipeInfo.innerHTML += `
    <h4 id='list-title'></h4>
    <button id='add-cart'>Add to Cart</button>
  `;
  let missingIngredients = checkPantryIngredients(recipe);
  fullRecipeInfo.innerHTML += `
    <button id='is-in-list'>${inInList ? `Remove from 'will-cook' list` : `Add to 'will-cook' list`}</button>
  `;
  document.querySelector('#is-in-list').addEventListener('click', function() {
    toggleRecipeInList(recipe);
  });
  document.querySelector('#add-cart').addEventListener('click', function() {
    if(document.querySelector('#add-cart').innerText.length === 'Add to Cart'.length) addIngredientsToList(missingIngredients);
    else {
      let emptyPantry = new Pantry();
      let all = emptyPantry.findMissingIngredients(recipe);
      addIngredientsToList(all)
    };
  });
}

function toggleRecipeInList(recipe) {
  let recipePosition = user.recipesToCook.findIndex(toCook => toCook.id === recipe.id)
  if (recipePosition === -1) {
    document.querySelector('#is-in-list').innerText = `Remove from 'will-cook' list`;
    user.recipesToCook.push(recipe)
  } else {
    document.querySelector('#is-in-list').innerText = `Add to 'will-cook' list`;
    user.recipesToCook.splice(recipePosition, 1);
  }
}

function checkPantryIngredients(recipe) {
  let missingIngredients = user.pantry.findMissingIngredients(recipe);
  if (missingIngredients.length === 0) {
    document.querySelector('#list-title').innerText = `You have everything you need to make this ${user.pantry.calculateTimesCanMake(recipe)} times!`;
    document.querySelector('#add-cart').innerText = 'Add ingredients to make again to cart';
  } else {
    document.querySelector('#add-cart').innerText = 'Add to Cart';
    document.querySelector('#list-title').innerText = 'The ingredients needed to make this recipe'
    missingIngredients.forEach(ingredient => {
      let ingredientName = ingredientsData.find(i => i.id == ingredient.id).name;
      ingredient.name = ingredientName;
      fullRecipeInfo.innerHTML += `<li class='missing-ingredient'>${ingredient.name}: ${ingredient.needs} ${ingredient.unit}</li>`;
    });
  }
  return missingIngredients;
}

function addIngredientsToList(ingredients) {
  ingredients.forEach(item => {
    let currentAmount = user.shoppingList.find(i => i.id === item.id);
    if(currentAmount) currentAmount.needs += item.needs;
    else user.shoppingList = user.shoppingList.concat(item);
  })
  document.querySelector('#list-title').innerText = 'Added to your shopping list!';
}

function generateIngredients(recipe) {
  return recipe && recipe.ingredients.map(i => {
    let ingredientName = ingredientsData.find(ingredient => ingredient.id === i.id ).name;
    return `${capitalize(ingredientName)} (${i.quantity.amount} ${i.quantity.unit})`
  }).join(", ");
}

function capitalize(words) {
  return words.split(" ").map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");

}

// SEARCH RECIPES
function pressEnterSearch(event) {
  event.preventDefault();
  searchRecipes();
}

function searchRecipes() {
  domUpdates.showAllRecipes(recipes);
  let searchedRecipes = recipeData.filter(recipe => {
    return recipe.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });
  filterNonSearched(createRecipeObject(searchedRecipes));
}

function filterNonSearched(filtered) {
  let found = recipes.filter(recipe => {
    let ids = filtered.map(f => f.id);
    return !ids.includes(recipe.id)
  })
  domUpdates.hideRecipes(found);
}


// CREATE AND USE PANTRY
function findPantryInfo() {
  user.pantry.ingredients.forEach(item => {
    let itemInfo = ingredientsData.find(ingredient => {
      return ingredient.id === item.ingredient;
    });
    let originalIngredient = pantryInfo.find(ingredient => {
      if (itemInfo) {
        return ingredient.name === itemInfo.name;
      }
    });
    if (itemInfo && originalIngredient) {
      originalIngredient.count += item.amount;
    } else if (itemInfo) {
      pantryInfo.push({name: itemInfo.name, count: item.amount});
    }
  });
  domUpdates.displayPantryInfo(pantryInfo.sort((a, b) => a.name.localeCompare(b.name)));
}

function findCheckedPantryBoxes() {
  let pantryCheckboxes = document.querySelectorAll(".pantry-checkbox");
  let pantryCheckboxInfo = Array.from(pantryCheckboxes)
  let selectedIngredients = pantryCheckboxInfo.filter(box => {
    return box.checked;
  })
  domUpdates.showAllRecipes(recipes);
  if (selectedIngredients.length > 0) {
    findRecipesWithCheckedIngredients(selectedIngredients);
  }
}

function findRecipesWithCheckedIngredients(selected) {
  let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
  let ingredientNames = selected.map(item => {
    return item.id;
  });
  recipes.forEach(recipe => {
    let allRecipeIngredients = [];
    recipe.ingredients.forEach(ingredient => {
      let name = ingredientsData.find(i => i.id === ingredient.id).name;
      allRecipeIngredients.push(name);
    });
    if (!recipeChecker(allRecipeIngredients, ingredientNames)) {
      domUpdates.hideRecipe(recipe.id);
    }
  });
}

// id: 19206
// name: "instant vanilla pudding"
// needs: 3
// unit: "Tbsp"


function buyCustomList() {
  document.querySelector(".buy-ingredient-list").innerHTML = '';
  user.shoppingList.forEach(item => {
    postBoughtItems(item);
  });
  user.shoppingList = [];
}

//function that will update the server with the stuff that they have used in the pantry
//would like those ingredients to be removed from the pantry
//removeIngredients method will remove ing from pantry once used

//passing through the ing array that is on the recipe
//each ingredient is an object
//

function cookRecipe(recipe) {
  recipe.ingredients.forEach(ingredient => {
    postRemoveItems({id: ingredient.id, needs: ingredient.quantity.amount})
  })
}


function postBoughtItems(item) {
  let data = {
    "userID": +user.id,
    "ingredientID": +item.id,
    "ingredientModification": +item.needs
  }
  let update = JSON.stringify(data);
  fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData', {
      method: 'POST',
      body: update,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(() => {
    document.querySelector(".buy-ingredient-list").innerText = 'Bought!'
    user.pantry.stock[item.id] = (user.pantry.stock[item.id] === undefined ? item.needs : user.pantry.stock[item.id] + item.needs)
  })
  .catch(() => document.querySelector(".buy-ingredient-list").innerText = 'Oops! Looks like something went wrong! Try again in a bit.')
}

function postRemoveItems(item) {
  let data = {
    "userID": +user.id,
    "ingredientID": +item.id,
    "ingredientModification": -item.needs
  }
  let update = JSON.stringify(data)
  fetch('https://fe-apps.herokuapp.com/api/v1/whats-cookin/1911/users/wcUsersData', {
      method: 'POST',
      body: update,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(() => {
    // document..... ="Cooked!"
    //once we cook it and the ingredients update we will need to update missing ingredients
    user.pantry.stock[item.id] = (user.pantry.stock[item.id] === undefined ? item.needs : user.pantry.stock[item.id] - item.needs)
  })
  .catch(() => document.querySelector(".cook-recipe-button").innerText = "Oops! Looks like something went wrong! Try again in a bit.")
}


function buyToCookList() {
  let missing = user.getAllMissingIngredients()
  let info = missing.reduce((output, item) => {
    postBoughtItems(item);
    let itemName = ingredientsData.find(ingredient => ingredient.id === item.id).name;
    return output + `\n${itemName}: ${item.needs} ${item.unit}`;
  }, 'Putting in an Order For:')
  if(info === 'Putting in an Order For:') info = 'You have everything you need!'
  alert(info);
  document.querySelector(".buy-ingredient-list").innerHTML = '';
}

// function dropDownMobile() {
//   hamburgerBtn.classList.add('hidden')
//   navBtn.classList.remove('hidden')
//   searchForm.classList.remove('hidden')
//
//   // savedRecipesBtn.classList.remove('hidden')
//   // pantryBtn.classList.remove('hidden')
// }
//
// dropDownMobile();
