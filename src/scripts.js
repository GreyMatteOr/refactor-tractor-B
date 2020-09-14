import $ from 'jquery';

import './css/variables.scss';
import './css/mixins.scss';
import './css/index.scss';
import User from './user';
import Recipe from './recipe';
import domUpdates from './domUpdates.js'
import goFetch from './fetch-requests.js'
import {allRecipesBtn, buyBtn, buyUserListBtn, filterBtn, fullRecipeInfo, main, pantryBtn, savedRecipesBtn, searchBtn, searchForm, searchInput, shoppingList, showPantryRecipes, tagList} from './dom-loader';

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


// RETRIEVE DATA
function retrieveData() {
  goFetch.getServerData()
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(([u, i, r]) => {
    users = u.wcUsersData;
    ingredientsData = i.ingredientsData;
    recipeData = r.recipeData.map(recipe => new Recipe(recipe))
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
  let recipeId = event.path.find(e => e.id).id;
  refreshRecipeCard(recipeId);
}

function refreshRecipeCard(recipeId) {
  domUpdates.makeInline(fullRecipeInfo);
  let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
  domUpdates.generateRecipeTitle(recipe, generateIngredients(recipe, ingredientsData), fullRecipeInfo, ingredientsData);
  domUpdates.addRecipeImage(recipe);
  domUpdates.generateInstructions(recipe, fullRecipeInfo);
  domUpdates.addOverlay(fullRecipeInfo);
  let missingIngredients = user.pantry.findMissingIngredients(recipe);
  domUpdates.addMissingIngredients(fullRecipeInfo, recipe, missingIngredients, ingredientsData, fullRecipeInfo, user);
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
  document.querySelector('#cook-it').addEventListener('click', function() {
    cookRecipe(recipe);
  });
}

function toggleRecipeInList(recipe) {
  let recipePosition = user.recipesToCook.findIndex(toCook => toCook.id === recipe.id)
  if (recipePosition === -1) {
    domUpdates.changeText(document.querySelector('#is-in-list'), `Remove from 'will-cook' list`);
    user.recipesToCook.push(recipe)
  } else {
    domUpdates.changeText(document.querySelector('#is-in-list'), `Add to 'will-cook' list`);
    user.recipesToCook.splice(recipePosition, 1);
  }
}

function addIngredientsToList(ingredients) {
  ingredients.forEach(item => {
    let currentAmount = user.shoppingList.find(i => i.id === item.id);
    if(currentAmount) currentAmount.needs += item.needs;
    else user.shoppingList = user.shoppingList.concat(item);
  })
  domUpdates.changeText(document.querySelector('#list-title'), 'Added to your shopping list!');
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

function buyCustomList() {
  document.querySelector(".buy-ingredient-list").innerHTML = '';
  postBuy(user.shoppingList)
  user.shoppingList = [];
}

function buyToCookList() {
  let missing = user.getAllMissingIngredients()
  postBuy(missing);
  let info = missing.reduce((output, item) => {
    let itemName = ingredientsData.find(ingredient => ingredient.id === item.id).name;
    return output + `\n${itemName}: ${item.needs} ${item.unit}`;
  }, 'Putting in an Order For:')
  if(info === 'Putting in an Order For:') info = 'You have everything you need!'
  alert(info);
}

function cookRecipe(recipe) {
  Promise.all(recipe.ingredients.map(ingredient => goFetch.post({id: ingredient.id, needs: -ingredient.quantity.amount}, user)))
  .then(() => {
    recipe.ingredients.forEach(item => {
      console.log(item)
      console.log(user.pantry.stock[item.id])
      user.pantry.stock[item.id] -= item.quantity.amount;
      console.log(user.pantry.stock[item.id])

    })
    domUpdates.exitRecipe(document.querySelector(".recipe-instructions"));
    refreshRecipeCard(recipe.id);
  })
  .catch(() => domUpdates.changeText(document.querySelector("#cook-it"), "Oops! Looks like something went wrong! Try again in a bit."));
}

function postBuy(list) {
  Promise.all(list.map(item => goFetch.post(item, user)))
  .then(() => {
    domUpdates.changeText(document.querySelector(".buy-ingredient-list"), 'Bought!')
    list.forEach(item => {
      let current = user.pantry.stock[item.id]
      user.pantry.stock[item.id] = (current === undefined ? item.needs : current + item.needs)
    })
  })
  .catch(() => domUpdates.changeText(document.querySelector(".buy-ingredient-list"), 'Oops! Looks like something went wrong! Try again in a bit.'))
}
