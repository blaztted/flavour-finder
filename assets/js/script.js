var query = "11lb brisket and fries";

//Spoonacular API
const spoonAPI = "907081a94bda4982a9136d51fa170a4d";
const spoonApiKey = '130382831c7c42c98bad843f34508788';
const spoonAPI_KEY = "907081a94bda4982a9136d51fa170a4d";
const spoonURL = "https://api.spoonacular.com/recipes/complexSearch";
const randomURL = "https://api.spoonacular.com/recipes/random";

//Ninja Nutrition API
const nutritionAPI_KEY = "cdNqZImiN0YKg9Zkpdz3ow==7vSXmA0YWuPePX5J";
const nutritionURL = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;

async function getSpoonacularData() {
  try {
    const response = await fetch(`${spoonURL}?apiKey=${spoonAPI_KEY}`);
    const data = await response.json();
    console.log("Spoonacular Data:", data);
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

const recipeSection = $('#recipe');
console.log(recipeSection);

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

getSpoonacularRandom()
  .then((recipes => {
    console.log('inside', recipes);
    recipes.forEach(recipe => {
    console.log(recipe.title);
    renderCard();
    })
}));

function renderCard() {
  console.log('inside', recipe);
  let cardEl = $('<div class="card" style="width: 18rem;>');
  let cardImg = $('<img class="card-img-top" alt="recipe img">').attr('src', recipe.image);
  let cardInfoEl = $('<div class="card-body">');
  let cardTitle = $('< class="card-title">').text(recipe.title);
  let timeIcon = $('<img class="card-img-top" alt="cooking time">');
  let caloriesIcon = $('<img class="card-img-top" alt="cooking time">');
  let favoriteIcon = $('<i class="favourite material-icons"style="font-size: 48px; color: rgb(240, 127, 127)">')
  //let favoriteIcon = $('<img class="card-img-top" alt="cooking time">').attr('src', )
  cardInfoEl.append(timeIcon, caloriesIcon, favoriteIcon);
  cardEl.append(cardImg, cardTitle, cardInfoEl);
  recipeSection.append(cardEl)
}


//getSpoonacularData();
//getNutritionData();
getSpoonacularData();
getNutritionData();

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
