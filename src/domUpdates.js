let domUpdates = {
  greetUser(firstName) {
    let welcomeMsg = `
      <section class="welcome-msg">
        <img id='tag-toggle' alt='A toggle arrow that shows and hides the search-by-tag menu' src='./images/down_arrow.png'/>
        <h1>Welcome ${firstName}!</h1>
      </section>`;
    document.querySelector(".banner-image").insertAdjacentHTML("afterbegin", welcomeMsg);
  },

  addToDom(recipeInfo, shortRecipeName, node) {
    let cardHtml = `
      <section role='button' tabindex="0" class="recipe-card" id=${recipeInfo.id}><a>
        <h3 maxlength="40">${shortRecipeName}</h3>
        <section class="card-photo-container">
          <img role='img' src=${recipeInfo.image} class="card-photo-preview" alt="${recipeInfo.name} recipe" title="${recipeInfo.name} recipe">
          <section class="text">
            <section>Click for Instructions</section>
          </section>
        </section>
        <h4>${recipeInfo.tags[0]}</h4>
        <img src="./images/apple-logo-outline.png" alt="unfilled apple icon" class="card-apple-icon">
      </a></section>`
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
    node.insertAdjacentHTML("beforebegin", "<section id='overlay'></section>");
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

  toggleShoppingList(list, ingredientsData = []) {
    document.querySelector(".drop-menu").classList.add('hidden');
    let needNode = document.querySelector(".shopping-list");
    let shoppingList = document.querySelector(".buy-ingredient-list");
    needNode.classList.toggle('hidden');
    shoppingList.innerHTML = '';
    let totalCost = 0;
    list.forEach(item => {
      let itemData = ingredientsData.find(ingredient => ingredient.id === item.id)
      totalCost += itemData.estimatedCostInCents;
      console.log('TC', totalCost)
      let costString = this.roundToDollars(itemData.estimatedCostInCents);
      shoppingList.innerHTML += `
      <li id="${item.name}>
        <label for="${item.name}">${item.needs} ${item.unit} of ${item.name} : $${costString} </label>
      </li>`;
    })
    console.log('TC', totalCost)
    let costString = this.roundToDollars(totalCost);
    if(totalCost === 0) document.querySelector('.total-cost').innerText = ''
    else document.querySelector('.total-cost').innerText = `Total Cost: $${costString}`;
  },

  roundToDollars(costInCents) {
    let output = `${Math.round(+costInCents * 100) / 10000}`;
    if(!output.includes('.')) return output;
    let[whole, decimals] = output.split('.');
    while(decimals.length < 2) decimals += '0';
    return whole + '.' + decimals;
  },

  displayPantryInfo(pantry) {
    document.querySelector(".pantry-list").innerHTML = '';
    pantry.forEach(ingredient => {
      let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">
        <label for="${ingredient.name}">${ingredient.name}, ${Math.round(100 * ingredient.count) / 100}</label></li>`;
      document.querySelector(".pantry-list").insertAdjacentHTML("beforeend", ingredientHtml);
    });
  },

  hideRecipe(id) {
    let domRecipe = document.getElementById(`${id}`);
    domRecipe.style.display = "none";
  },

  addMissingIngredients(node, recipe, missingIngredients, ingredientsData, fullRecipeInfo, user) {
    node.innerHTML += `
      <h4 id='list-title'></h4>
      <button class='hidden' id='cook-it'>Cook Me!</button>
      <button id='add-cart'>Add to Cart</button>
    `;
    if (missingIngredients.length === 0) {
      document.querySelector('#list-title').innerText = `You have everything you need to make this ${user.pantry.calculateTimesCanMake(recipe)} times!`;
      document.querySelector('#add-cart').innerText = 'Add ingredients to make again to cart';
      document.querySelector('#cook-it').classList.remove('hidden');
    } else {
      document.querySelector('#add-cart').innerText = 'Add to Cart';
      document.querySelector('#list-title').innerText = 'The ingredients needed to make this recipe'
      document.querySelector('#cook-it').classList.add('hidden');
      missingIngredients.forEach(ingredient => {
        let ingredientName = ingredientsData.find(i => i.id == ingredient.id).name;
        ingredient.name = ingredientName;
        fullRecipeInfo.innerHTML += `<li class='missing-ingredient'>${ingredient.name}: ${ingredient.needs} ${ingredient.unit}</li>`;
      });
    }
    node.innerHTML += `
      <button id='is-in-list'>${user.recipesToCook.includes(recipe) ? `Remove from 'will-cook' list` : `Add to 'will-cook' list`}</button>
    `;
  },

  changeText(node, text) {
    node.innerText = text;

  }
};

export default domUpdates;
