let domUpdates = {
  greetUser(firstName) {
    let welcomeMsg = `
      <div class="welcome-msg">
        <h1>Welcome ${firstName}!</h1>
      </div>`;
    document.querySelector(".banner-image").insertAdjacentHTML("afterbegin", welcomeMsg);
  },

  addToDom(recipeInfo, shortRecipeName, node) {
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
      </div>`
    node.insertAdjacentHTML("beforeend", cardHtml);
  },


  displayRecipeToCook() {
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
  },

  listTags(allTags, node) {
    allTags.forEach(tag => {
      let tagHtml = `<li><input type="checkbox" class="checked-tag" id="${tag}">
        <label for="${tag}">${domUpdates.capitalize(tag)}</label></li>`;
      node.insertAdjacentHTML("beforeend", tagHtml);
    });
  },

  capitalize(words) {
    return words.split(" ").map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  },

  hideRecipes(recipes) {
    recipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "none";
    });
  },

  updatePicture(node, img) {
    node.src = img;
  },

  makeInline(node) {
    node.style.display = "inline";
  },

  addOverlay(node) {
    node.insertAdjacentHTML("beforebegin", "<section id='overlay'></div>");
  },

  generateRecipeTitle(recipe, ingredients, node, ingredientsData) {
    let recipeTitle = `
      <button id="exit-recipe-btn">X</button>
      <h3 id="recipe-title">${recipe.name}</h3>
      <h4>Cost of Recipe: ${recipe.calculateIngredientsCost(ingredientsData).toFixed(2)}</h4>
      <h4>Ingredients</h4>
      <p>${ingredients}</p>`
    node.insertAdjacentHTML("beforeend", recipeTitle);
  },

  addRecipeImage(recipe) {
    document.getElementById("recipe-title").style.backgroundImage = `url(${recipe.image})`;
  },

  generateInstructions(recipe, node) {
    let instructionsList = "";
    let instructions = recipe.instructions.map(i => {
      return i.instruction
    });
    instructions.forEach(i => {
      instructionsList += `<li>${i}</li>`
    });
    node.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
    node.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
  },

  exitRecipe(node) {
    while (node.firstChild && node.removeChild(node.firstChild));
    node.style.display = "none";
    document.getElementById("overlay").remove();
  },

  showMyRecipesBanner() {
    document.querySelector(".welcome-msg").style.display = "none";
    document.querySelector(".my-recipes-banner").style.display = "block";
  },

  showWelcomeBanner() {
    document.querySelector(".welcome-msg").style.display = "flex";
    document.querySelector(".my-recipes-banner").style.display = "none";
  },

  showAllRecipes(recipes) {
    recipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "block";
    });
    domUpdates.showWelcomeBanner();
  },

  toggleMenu() {
    document.querySelector(".drop-menu").classList.toggle('hidden');
    document.querySelector(".shopping-list").classList.add('hidden');
  },

  toggleShoppingList(list) {
    document.querySelector(".drop-menu").classList.add('hidden');
    let needNode = document.querySelector(".shopping-list");
    let shoppingList = document.querySelector(".buy-ingredient-list");
    needNode.classList.toggle('hidden');
    shoppingList.innerHTML = '';
    list.forEach(item => {
      console.log(item)
      shoppingList.innerHTML += `<li id="${item.name}>
        <label for="${item.name}">${item.name}, ${item.needs} ${item.unit}</label></li>`
    })
  },

  displayPantryInfo(pantry) {
    pantry.forEach(ingredient => {
      let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
        <label for="${ingredient.name}">${ingredient.name}, ${ingredient.count}</label></li>`;
      document.querySelector(".pantry-list").insertAdjacentHTML("beforeend", ingredientHtml);
    });
  },

  hideRecipe(id) {
    let domRecipe = document.getElementById(`${id}`);
    domRecipe.style.display = "none";
  }

};

export default domUpdates;
