//Spoonacular API
const query = "Pasta";


 

const spoonAPI_KEY_1 = "d5aa2db1f74941d1937230d905801cb1";
const spoonAPI = "f4958189b1e84bb29420f09a80d787a4";
const spoonApiKey = "f4958189b1e84bb29420f09a80d787a4";

//Spoonacular API

const spoonAPI_1 = "d5aa2db1f74941d1937230d905801cb1";

const spoonApiKey_1 = "30eb761ad0f148338c37b0972f3b9212";
 

const spoonAPI_KEY_1 = "d5aa2db1f74941d1937230d905801cb1";
const spoonAPI = "15f9f07b82a14f49b23101fccee1a8ce";
const spoonApiKey = "15f9f07b82a14f49b23101fccee1a8ce";
const spoonAPI_KEY = "15f9f07b82a14f49b23101fccee1a8ce";
>>>>>>> 4a528c53899827becc38cf0fa560449fe08c8359
const spoonURL = "https://api.spoonacular.com/recipes/complexSearch";

const spoonacularURL = "https://api.spoonacular.com/recipes";
// https://api.spoonacular.com/recipes/{id}/card


// Ninja Nutrition API
const nutritionAPI_KEY = "cdNqZImiN0YKg9Zkpdz3ow==7vSXmA0YWuPePX5J";
//const nutritionURL = `https://api.api-ninjas.com/v1/nutrition?query=${ingredient}`;

async function getSpoonacularData() {
  try {
    const type = "dessert";
    const response = await fetch(
      `${spoonURL}?apiKey=${spoonApiKey}&type=${type}`
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
      `${spoonURL}?number=4&apiKey=${spoonApiKey}&type=${type}`
    );
    const data = await response.json();
    console.log("Spoonacular Data:", data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}

async function getSpoonacularBreakfast() {
  try {
    const type = "breakfast";
    const response = await fetch(
      `${spoonURL}?apiKey=${spoonApiKey}&type=${type}`
    );
    const data = await response.json();
    console.log("Spoonacular Data:", data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}

async function getSpoonacularHealthy() {
  try {
    const type = "salad";
    const response = await fetch(
      `${spoonURL}?apiKey=${spoonApiKey}&type=${type}`
    );
    const data = await response.json();
    console.log("Spoonacular Data:", data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}

async function getSpoonacularDessert() {
  try {
    const type = "dessert";
    const response = await fetch(
      `${spoonURL}?apiKey=${spoonApiKey}&type=${type}`
    );
    const data = await response.json();
    console.log("Spoonacular Data:", data.results);
    return data.results;
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}

// async function getNutritionData() {
//   try {
//     const response = await fetch(nutritionURL, {
//       headers: {
//         "X-Api-Key": nutritionAPI_KEY,
//       },
//     });
//     const data = await response.json();
//     console.log("Nutrition Data pumpkin:", data);
//   } catch (error) {
//     console.error("Error fetching Ninja Nutrition data:", error);
//   }
// }

//Get the recipe details by the Id
async function getDetailsById(recipeId) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${spoonApiKey}`
    );
    const data = await response.json();

    console.log("API Response for Recipe Details:", data);

    return { name: data.title, link: data.sourceUrl };
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
}

// -----------------------------------------------------------------------------------------------------------
// function that get random recipes
async function getSpoonacularRandom() {
  try {
    const response = await fetch(`${spoonacularURL}/random?number=4&apiKey=${spoonApiKey}`);
    const data = await response.json();
    console.log("random Data:", data.recipes);

    for (const recipe of data.recipes) {
      try {
        // Extract an ingredient from the recipe
        const ingredient =
          recipe.extendedIngredients.length > 0
            ? recipe.extendedIngredients[0].name
            : "defaultIngredient";

        const nutritionResponse = await fetch(
          `https://api.api-ninjas.com/v1/nutrition?query=${ingredient}`,
          {
            headers: {
              "X-Api-Key": nutritionAPI_KEY,
            },
          }
        );

        const nutritionData = await nutritionResponse.json();
        console.log("Nutrition Data for", ingredient, ":", nutritionData);
        const caloriesNinja = `${nutritionData[0]?.name} : ${Math.floor(
          nutritionData[0]?.calories
        )}`;

        // Render the card with the obtained nutrition information
        renderCard(recipe, caloriesNinja, recipe.id);
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
      }
    }
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}

async function renderDescriptionCard(id) {
  try {
    const response = await fetch(`${spoonacularURL}/${id}/card?apiKey=${spoonApiKey}`);
    const data = await response.json();
    let recipeCardDiscreption = $('<img>', {
      src: data.url,
      alt: 'Recipe description'
    });
    $('.modal-body').append(recipeCardDiscreption);
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}



getSpoonacularRandom().then(async (recipes) => {
  for (const recipe of recipes) {
    try {
      const response2 = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/nutritionWidget.json?apiKey=${spoonApiKey}`
      );
      const data2 = await response2.json();
      renderCard(recipe, data2.calories, recipe.id);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error as needed
    }
  }

  $(".card").on("click", (e) => {
    e.preventDefault();
    const card = e.currentTarget;
    const cardId = card.getAttribute("data-id");
    renderDescriptionCard(cardId);
    console.log(cardId);
    modal.showModal();
    $('.modal-body').text('');
  });

  $(".favoriteIcon").on("click", (e) => {
    e.preventDefault();
    const cardF = e.currentTarget;
    const cardIdF = cardF.getAttribute("data-id");
    saveFavourite(cardIdF);
  });
});

// function that render recipes cards
const recipesContainer = $("#recipes");
const modal = document.querySelector("dialog");

function renderCard(recipe, calories, id) {
  let cardEl = $('<div class="card" style="width: 470px; height:470px;">').attr("data-id", id);
  let cardImg = $('<img class="card-img-top" alt="recipe img">').attr(
    "src",
    recipe.image
  );
  let cardBody = $('<div class="card-body">');
  let cardTitle = $('<h5 class="card-title">').text(recipe.title);
  let cookingTime = $('<p class="card-text">').text(
    `${recipe.readyInMinutes} min`
  );

  // row to hold card-text and favorite icon
  let bottomRow = $('<div class="row align-items-center">');

  // Cooking time column
  let timeColumn = $('<div class="col">');
  let clockIcon = $('<span class="material-symbols-outlined">timer</span>');
  timeColumn.append(clockIcon, cookingTime);

  // Nutrition column
  let caloriesColumn = $('<div class="col">').append(
    $(
      '<img width="25" height="25" src="./assets/images/icons/calorie.png" alt="Nutrition Icon"/>'
    ),
    $('<p class="card-text">').text(`${calories} kal`)
  );

  // Favorite icon column
  let iconColumn = $('<div class="col-auto">');
  let favouriteIcon = $(
    '<img class="favouriteIcon" width="25" height="25" src="./assets/images/icons/notfavourite.png" alt="Not Favorite Icon"/>'
  );
  iconColumn.append(favouriteIcon);

  bottomRow.append(timeColumn, caloriesColumn, iconColumn);

  cardBody.append(cardTitle, bottomRow);
  cardEl.append(cardImg, cardBody);

  // Append each card to the card deck
  $(".card-deck").append(cardEl);

  // favorite icon click event
  favouriteIcon.on("click", function () {
    // Toggle between icons
    if (
      favouriteIcon.attr("src") === "./assets/images/icons/notfavourite.png"
    ) {
      favouriteIcon.attr("src", "./assets/images/icons/favourite.png");

      // Save to Fave
      saveFavourite(id);
    } else {
      favouriteIcon.attr("src", "./assets/images/icons/notfavourite.png");
      // Remove from Favs
      removeFavourite(id);
    }
  });

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

  function removeFavourite(recipeID) {
    let fav = JSON.parse(localStorage.getItem("favouriteRecipes")) || [];

    // Check if the recipeID is in the favs
    let index = fav.indexOf(recipeID);
    if (index !== -1) {
      // Remove it
      fav.splice(index, 1);
      localStorage.setItem("favouriteRecipes", JSON.stringify(fav));
      console.log(`${recipeID} removed from favourites`);
    }
  }
}

$(".close").on("click", (e) => {
  e.preventDefault();
  modal.close();
});

// ----------------------------------------------------------------------------------------------------------

//getSpoonacularData();

//getNutritionData();

//Clickable buttons on hero section that render recepies per type:
$("#dinner").on("click", function (e) {
  // e.preventDefault();
  getSpoonacularMain().then((results) => {
    console.log(results);
    cleanRenderCard();
    for (let i = 0; i < 4; i++) {
      renderCard(results[i]);
    }
  });
});

$("#breakfast").on("click", function (e) {
  // e.preventDefault();
  getSpoonacularBreakfast().then((results) => {
    console.log(results);
    cleanRenderCard();
    for (let i = 0; i < 4; i++) {
      renderCard(results[i]);
    }
  });
});

/********* PUSH ORIGIN THESE BUTTONS, INSTEAD OF 1 NOW THEY DISPLAY 4 RECIPES  */

$("#healthy").on("click", function (e) {
  // e.preventDefault();
  getSpoonacularHealthy().then((results) => {
    console.log(results);
    cleanRenderCard();
    for (let i = 0; i < 4; i++) {
      renderCard(results[i]);
    }
  });
});

$("#desserts").on("click", function (e) {
  // e.preventDefault();
  getSpoonacularDessert().then((results) => {
    console.log(results);
    cleanRenderCard();
    for (let i = 0; i < 4; i++) {
      renderCard(results[i]);
    }
  });
});

function cleanRenderCard() {
  const recipeSection = $("#recipes");
  recipeSection.empty();
}


//TODO if recipe already on favourites, remove it after click?

// Click event for when the recipe is chosen as favourite
$(document).on("click", "favourite", function () {
  let recipeID = $(this).data(id); // every recipe has a different ID given by the API
  saveFavourite(recipeID);
});


// // Function to display fav recipes
// function displayFavourite() {
//   // Get favourites from localStorage
//   let fav = JSON.parse(localStorage.getItem("favouriteRecipes")) || [];

//   console.log(fav);
// }

function displayFavouriteDetails() {
  let fav = JSON.parse(localStorage.getItem("favouriteRecipes")) || [];
  // Log details for each favorite recipe
  fav.forEach(async (recipeId) => {
    const recipeDetails = await getDetailsById(recipeId);
    if (recipeDetails) {
      console.log(
        `Recipe Name: ${recipeDetails.name}, Recipe Link: ${recipeDetails.link}`
      );
    }
  });

// Function to display fav recipes
function displayFavourite() {
  // Get favourites from localStorage
  let fav = JSON.parse(localStorage.getItem("favouriteRecipes")) || [];

  console.log(fav);
}

$(document).on("click", ".material-icons", function () {
  displayFavouriteDetails();
});

//Refresh page when title is clicked
document.getElementById("refresh").addEventListener("click", function (event) {
  event.preventDefault();
  location.reload();
});

// function removeAllFavorites() {
//   localStorage.removeItem("favouriteRecipes");
//   console.log("All favorites removed from local storage");
// }

// <a href="https://www.flaticon.com/free-icons/calories" title="calories icons">Calories icons created by Smashicons - Flaticon</a>
