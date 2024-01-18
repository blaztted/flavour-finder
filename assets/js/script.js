console.log("ding");

var query = "11lb brisket and fries";

//Spoonacular API
const spoonAPI = "907081a94bda4982a9136d51fa170a4d";
const spoonApiKey = '130382831c7c42c98bad843f34508788';
const spoonURL = "https://api.spoonacular.com/recipes/complexSearch";
const randomURL = "https://api.spoonacular.com/recipes/random";

//Ninja Nutrition API
const nutritionAPI = "cdNqZImiN0YKg9Zkpdz3ow==7vSXmA0YWuPePX5J";
const nutritionURL = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;

async function getSpoonacularData() {
  try {
    const response = await fetch(`${spoonURL}?apiKey=${spoonAPI}`);
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
        "X-Api-Key": nutritionAPI,
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
