var query = "11lb brisket and fries";

//Spoonacular API
const spoonAPI = "907081a94bda4982a9136d51fa170a4d";
const spoonApiKey = "130382831c7c42c98bad843f34508788";
const spoonAPI_KEY = "907081a94bda4982a9136d51fa170a4d";
const spoonURL = "https://api.spoonacular.com/recipes/complexSearch";

const randomURL = "https://api.spoonacular.com/recipes/random";

//Ninja Nutrition API
const nutritionAPI_KEY = "cdNqZImiN0YKg9Zkpdz3ow==7vSXmA0YWuPePX5J";
const nutritionURL = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;

async function getSpoonacularData() {
  try {
    const type = "dessert";
    const response = await fetch(
      `${spoonURL}?apiKey=${spoonAPI_KEY}&type=${type}`
    );
    const data = await response.json();
    console.log("Spoonacular Data:", data);
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}

async function getSpoonacularMain() {
  try {
    const type = "main course";
    const response = await fetch(
      `${spoonURL}?apiKey=${spoonAPI_KEY}&type=${type}`
    );
    const data = await response.json();
    console.log("Spoonacular Data:", data);
    return data.recipes;
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}

async function getSpoonacularBrekfast() {
  try {
    const type = "breakfast";
    const response = await fetch(
      `${spoonURL}?apiKey=${spoonAPI_KEY}&type=${type}`
    );
    const data = await response.json();
    console.log("Spoonacular Data:", data);
    return data.recipes;
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}

async function getSpoonacularHealthy() {
  try {
    const type = "salad";
    const response = await fetch(
      `${spoonURL}?apiKey=${spoonAPI_KEY}&type=${type}`
    );
    const data = await response.json();
    console.log("Spoonacular Data:", data);
    return data.recipes;
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}

async function getSpoonacularDessert() {
  try {
    const type = "dessert";
    const response = await fetch(
      `${spoonURL}?apiKey=${spoonAPI_KEY}&type=${type}`
    );
    const data = await response.json();
    console.log("Spoonacular Data:", data);
    return data.recipes;
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}

async function getNutritionData() {
  try {
    const response = await fetch(nutritionURL, {
      headers: {
        "X-Api-Key": nutritionAPI_KEY,
      },
    });
    const data = await response.json();
    console.log("Nutrition Data:", data);
  } catch (error) {
    console.error("Error fetching Ninja Nutrition data:", error);
  }
}

async function getSpoonacularRandom() {
  try {
    const response = await fetch(`${randomURL}?number=4&apiKey=${spoonApiKey}`);
    const data = await response.json();
    console.log("random Data:", data.recipes);
    return data.recipes;
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}

getSpoonacularRandom().then((recipes => {
  recipes.forEach(recipe => {
  renderCard(recipe);
  })
}));

  
const recipeSection = $('#recipes');

function renderCard(recipe) {
  
  let cardEl = $('<div class="card" style="width: 18rem">');
 // cardEl.css('background-image', 'url(' + recipe.image + ')');
  let cardImg = $('<img class="card-img-top" alt="recipe img">').attr('src', recipe.image);
  let cardInfoEl = $('<div class="card-body">');
  let cardTitle = $('<h5 class="card-title">').text(recipe.title);
  let timeInfoEl = $('<div>');
  let cookingTime = $('<p>').text(recipe.cookingMinutes);
  let timeIcon = $('<span class="material-symbols-outlined">timer </span>');
  timeInfoEl.append(cookingTime, timeIcon);
  let caloriesIcon = $('<img width="25" height="25" src="https://img.icons8.com/external-ddara-lineal-ddara/64/external-calories-weight-loss-ddara-lineal-ddara.png" alt="external-calories-weight-loss-ddara-lineal-ddara"/>'); 
  let favoriteIcon = $('<i class="favorite material-icons" style="font-size: 35px; color: rgb(240, 127, 127)">').text('favorite');

  cardInfoEl.append(timeInfoEl, caloriesIcon, favoriteIcon);
  cardEl.append(cardImg, cardTitle, cardInfoEl);
  recipeSection.append(cardEl);
}

getSpoonacularData();
getNutritionData();


//Clickable buttons on hero section that render recepies per type:
$("#dinner").on("click", function (e) {
  // e.preventDefault();
  console.log("hi")
  getSpoonacularMain().forEach(recipe => {
    renderCard(recipe);
    })
});

$("#breakfast").on("click", function (e) {
  // e.preventDefault();
  console.log("hi")
  getSpoonacularBrekfast().forEach(recipe => {
  renderCard(recipe);
  })
});

$("#healthy").on("click", function (e) {
  // e.preventDefault();
  console.log("hi")
  getSpoonacularHealthy().forEach(recipe => {
  renderCard(recipe);
  })
});

$("#desserts").on("click", function (e) {
  // e.preventDefault();
  console.log("hi")
  getSpoonacularBrekfast().forEach(recipe => {
  renderCard(recipe);
  })
});


//TODO if recipe already on favourites, remove it after click?

function saveFavourite(recipeID) {
  // Get favourites from localStorage
  let fav = JSON.parse(localStorage.getItem("favouriteRecipes")) || [];

  //Check if its already there, otherwise push it
  if (!fav.includes(recipeID)) {
    fav.push(recipeID);

    //Save favourites
    localStorage.setItem("favouriteRecipes", JSON.stringify(fav));
    console.log(`${recipeID} added`);
  } else {
    console.log(`${recipeID} already in favourites`);
  }
}

// Click event for when the recipe is chosen as favourite
$(document).on("click", "favourite", function () {
  let recipeID = $(this).data(id); // every recipe has a different ID given by the API
  saveFavourite(recipeID);
});

// TODO Display it in the page aswell
// Function to display fav recipes
function displayFavourite() {
  // Get favourites from localStorage
  let fav = JSON.parse(localStorage.getItem("favouriteRecipes")) || [];
  console.log(fav);
}

$(document).on("click", ".material-icons", function () {
  displayFavourite();
  console.log("ding");
});

// <a href="https://www.flaticon.com/free-icons/calories" title="calories icons">Calories icons created by Smashicons - Flaticon</a>
