import $ from 'jquery';


import './css/variables.scss';
import './css/mixins.scss';
import './css/index.scss';
import User from './user';
import Recipe from './recipe';
import domUpdates from './domUpdates.js'
import {allRecipesBtn, filterBtn, fullRecipeInfo, main, pantryBtn, savedRecipesBtn, searchBtn, searchForm, searchInput, shoppingList, showPantryRecipes, tagList} from './dom-loader';

let ingredientsData;
let pantryInfo = [];
let recipes = [];
let recipeData;
let users;
let user;

window.addEventListener("load", retrieveData);
allRecipesBtn.addEventListener("click", () => ( domUpdates.showAllRecipes(recipes) ));
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
      console.log(ingredientsData)
      console.log(recipeData)
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

function addToDom(recipeInfo, shortRecipeName) {
  let cardHtml = `
    <div class="recipe-card" id=${recipeInfo.id}>
      <h3 maxlength="40">${shortRecipeName}</h3>
      <div class="card-photo-container">
        <img src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
        <div class="text">
          <div>Click for Instructions</div>
        </div>
      </div>
      <h4>${recipeInfo.tags[0]}</h4>
      <img src="./images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
      <button class="cook-me">Cook Me!</button>
    </div>`
  main.insertAdjacentHTML("beforeend", cardHtml);
}

function displayRecipeToCook() {
  if (user.recipesToCook.length > 0) {
    const card = `
  <article class="recipe-card-to-cook" data-id="${user.recipesToCook[0].id}">
  <img class="white-star" src="../assets/star.svg">
  <img class="red-star hidden" src="../assets/star-active.svg">
    <section class="hidden-card-to-cook">
    </section>
    <section class="displayed-card">
      <img class="recipe-img" src=${user.recipesToCook[0].image}>
      <p class="recipe-to-cook-name">${user.recipesToCook[0].name}</p>
      <p class="recipe-to-cook-text">Recipe To Cook</p>
    </section>
  </article>`
    document.querySelector(`.user-recipes`).insertAdjacentHTML('afterbegin', card);
    displayHiddenIngredients(user.recipesToCook[0], 'to-cook'); //refactor
    displayHiddenInstructions(user.recipesToCook[0], 'to-cook');
  }
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
  fullRecipeInfo.innerHTML += "<button id='cook-me'>Cook Me</button>";
  document.querySelector('#cook-me').addEventListener('click', function() {
    checkPantryIngredients(recipe, user.pantry);
  });
}

function checkPantryIngredients(recipe, pantry) {
  let missingIngredients = pantry.findMissingIngredients(recipe);
  fullRecipeInfo.innerHTML += `
  <h4> Ingredients you are missing to complete this recipe </h4>
  `
  missingIngredients.forEach(ingredient => {
    let ingredientName = ingredientsData.find(i => i.id == ingredient.id).name;
    ingredient.name = ingredientName;
    fullRecipeInfo.innerHTML += `<li>${ingredient.name}: ${ingredient.needs} ${ingredient.unit}</li>`;
  });
  fullRecipeInfo.innerHTML += `
  <button id='add-cart'>Add to Cart</button>
  `;
  document.querySelector('#add-cart').addEventListener('click', function() {
    addIngredientsToList(missingIngredients);
  })
}

function addIngredientsToList(ingredients) {
  ingredients.forEach(item => {
    let exists = user.shoppingList.find(i => i.id === item.id);
    if(exists) exists.needs += item.needs;
    else user.shoppingList = user.shoppingList.concat(item);
  })
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
