//Spoonacular API

const spoonAPI_KEY = "e45feb6b607140ccb6606be1e50094dc";
const spoonURL = "https://api.spoonacular.com/recipes/complexSearch";
const spoonacularURL = "https://api.spoonacular.com/recipes";

// Ninja Nutrition API
const nutritionAPI_KEY = "cdNqZImiN0YKg9Zkpdz3ow==7vSXmA0YWuPePX5J";

async function getSpoonacularMain() {
  try {
    const type = "main";
    const response = await fetch(
      `${spoonURL}?number=4&apiKey=${spoonAPI_KEY}&type=${type}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    displayErrorMessage();
  }
}

async function getSpoonacularBreakfast() {
  try {
    const type = "breakfast";
    const response = await fetch(
      `${spoonURL}?number=4&apiKey=${spoonAPI_KEY}&type=${type}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    displayErrorMessage();
  }
}

async function getSpoonacularHealthy() {
  try {
    const type = "salad";
    const response = await fetch(
      `${spoonURL}?number=4&apiKey=${spoonAPI_KEY}&type=${type}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    displayErrorMessage();
  }
}

async function getSpoonacularDessert() {
  try {
    const type = "dessert";
    const response = await fetch(
      `${spoonURL}?number=4&apiKey=${spoonAPI_KEY}&type=${type}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    displayErrorMessage();
  }
}

// function that get random recipes
async function getSpoonacularRandom() {
  try {
    const response = await fetch(
      `${spoonacularURL}/random?number=4&apiKey=${spoonAPI_KEY}`
    );
    const data = await response.json();

    for (const recipe of data.recipes) {
      try {
        // Extract all ingredients from the recipe
        const ingredients = recipe.extendedIngredients.map(
          (ingredient) => ingredient.name
        );

        // Get nutrition information for all ingredients
        const nutritionPromises = ingredients.map((ingredient) =>
          fetch(`https://api.api-ninjas.com/v1/nutrition?query=${ingredient}`, {
            headers: {
              "X-Api-Key": nutritionAPI_KEY,
            },
          })
        );

        const nutritionResponses = await Promise.all(nutritionPromises);
        const nutritionData = await Promise.all(
          nutritionResponses.map((response) => response.json())
        );

        // Calculate total calories for all ingredients/100g
        const totalCalories =
          nutritionData.reduce((sum, nutrient) => {
            const calories = nutrient[0]?.calories || 0;
            return sum + calories;
          }, 0) / 10;

        const caloriesNinja = ` ${Math.floor(totalCalories)}`;

        // Render the card with the obtained nutrition information
        renderCard(recipe, caloriesNinja, recipe.id);
      } catch (error) {
        displayErrorMessage();
      }
    }
    addCardEventListener();
  } catch (error) {
    displayErrorMessage();
  }
}

//Get the recipe details by the Id
async function getDetailsById(recipeId) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${spoonAPI_KEY}`
    );
    const data = await response.json();
    return { name: data.title, link: data.sourceUrl };
  } catch (error) {
    displayErrorMessage();
  }
}

// Get time and calories for the clickable buttons on hero section that render recepies per type (dinner, breakfast, healthy and dessert):

async function timeCalTypeRecipeRender(results) {
  cleanRenderCard();
  // when we get a 402 error, this does not go to catch as we are succesfully fetching, problem is we're getting the wrong result (402). But we still want to show error message when this happens.
  if (results == null) {
    displayErrorMessage();
  }

  for (const result of results) {
    try {
      const moreInfo = await fetch(
        `https://api.spoonacular.com/recipes/${result.id}/information?apiKey=${spoonAPI_KEY}`
      );
      const info = await moreInfo.json();

      const response2 = await fetch(
        `https://api.spoonacular.com/recipes/${result.id}/nutritionWidget.json?apiKey=${spoonAPI_KEY}`
      );
      const data2 = await response2.json();
      result.readyInMinutes = info.readyInMinutes;
      renderCard(result, data2.calories, result.id);
    } catch (error) {
      displayErrorMessage();
    }
  }

  addCardEventListener();
}

// -----------------------------------------------------------------------------------------------------------

// function that render recipe description

async function renderDescriptionCard(id) {
  try {
    const response = await fetch(
      `${spoonacularURL}/${id}/card?apiKey=${spoonAPI_KEY}`
    );
    const data = await response.json();
    let recipeCardDiscreption = $("<img>", {
      class: "modalImg",
      src: data.url,
      alt: "Recipe description",
    });
    $(".modal-body").append(recipeCardDiscreption);
  } catch (error) {
    displayErrorMessage();
  }
}

getSpoonacularRandom();

function addCardEventListener() {
  $(".card").on("click", (e) => {
    e.preventDefault();
    if (e.target.classList[0] !== "favouriteIcon") {
      const card = e.currentTarget;
      const cardId = card.getAttribute("data-id");
      renderDescriptionCard(cardId);
      modal.showModal();
      $(".modal-body").text("");
    }
  });
}

// function that render recipes cards
const recipesContainer = $("#recipes");
const modal = document.querySelector("dialog");

function renderCard(recipe, calories, id) {
  let cardEl = $('<div class="card" style="width: 15rem;">').attr(
    "data-id",
    id
  );
  let cardImg = $('<img class="card-img-top" alt="recipe img">').attr(
    "src",
    recipe.image
  );
  let cardBody = $('<div class="card-body">');
  let cardTitle = $('<h5 class="card-title">').text(recipe.title);

  // row to hold card-text and favorite icon
  let bottomRow = $('<div class="row align-items-center">');

  // Cooking time column
  let timeColumn = $('<div class="col">');
  if (recipe.readyInMinutes) {
    let cookingTime = $('<p class="card-text">').text(
      `${recipe.readyInMinutes} min`
    );
    let clockIcon = $('<span class="material-symbols-outlined">timer</span>');
    timeColumn.append(clockIcon, cookingTime);
  }

  // Nutrition column
  let caloriesColumn = $('<div class="col">');
  if (calories) {
    caloriesColumn.append(
      $(
        '<img width="25" height="25" src="./assets/images/icons/calorie.png" alt="Nutrition Icon"/>'
      ),
      $('<p class="card-text">').text(`${calories} kal`)
    );
  }

  // Favorite icon column
  let iconColumn = $('<div class="col-auto">');
  let favouriteIcon = $(
    '<img class="favouriteIcon" width="25" height="25" style="margin-bottom:20px" src="./assets/images/icons/notfavourite.png" alt="Not Favorite Icon"/>'
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
    } else {
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
    }
  }
}

// Handle the clicking on close button

$(".close").on("click", (e) => {
  e.preventDefault();
  modal.close();
});

// Function to inform the user of a error while fetching the data.

function displayErrorMessage() {
  if (bootstrap == undefined) {
    document
      .getElementById("browser-not-supported-container")
      .classList.remove("d-none");
  } else {
    let modal1 = bootstrap.Modal.getOrCreateInstance("#modal1");
    modal1.show();
  }
}

//Clickable buttons on hero section that render recepies per type:
$("#dinner").on("click", function (e) {
  getSpoonacularMain().then((results) => {
    cleanRenderCard();
    timeCalTypeRecipeRender(results);
  });
});

$("#breakfast").on("click", function (e) {
  getSpoonacularBreakfast().then((results) => {
    cleanRenderCard();
    timeCalTypeRecipeRender(results);
  });
});

$("#healthy").on("click", function (e) {
  getSpoonacularHealthy().then((results) => {
    cleanRenderCard();
    timeCalTypeRecipeRender(results);
  });
});

$("#desserts").on("click", function (e) {
  getSpoonacularDessert().then((results) => {
    cleanRenderCard();
    timeCalTypeRecipeRender(results);
  });
});

// Click event for when the recipe is chosen as favourite
$(document).on("click", "favourite", function () {
  let recipeID = $(this).data(id); // every recipe has a different ID given by the API
  saveFavourite(recipeID);
});

function cleanRenderCard() {
  const recipeSection = $("#recipes");
  recipeSection.empty();
}

function displayFavourites() {
  const fav = JSON.parse(localStorage.getItem("favouriteRecipes")) || [];
  const offcanvasBody = $(".offcanvas-body");

  offcanvasBody.empty();

  // Loop through each favorite recipe ID and render details
  fav.forEach(async (recipeId) => {
    const recipeDetails = await getDetailsById(recipeId);
    if (recipeDetails) {
      const favoriteItem = $(
        `<p>${recipeDetails.name}</p><a href="${recipeDetails.link}" target="_blank">View Recipe</a><hr>`
      );
      offcanvasBody.append(favoriteItem);
    }
  });
}

$(document).on("click", ".material-icons", function () {
  displayFavourites(); // Display favorites in the modal
});

$("#clearLocalStorageBtn").on("click", function () {
  localStorage.clear();
  displayFavourites();
});

//Refresh page when title is clicked
document.getElementById("refresh").addEventListener("click", function (event) {
  event.preventDefault();
  location.reload();
});

async function getSpoonacularRandomRecipes() {
  try {
    const recipes = await getSpoonacularRandom();

    // Clear previous recipes
    cleanRenderCard();

    for (let i = 0; i < 3 && i < recipes.length; i++) {
      const recipe = recipes[i];
      try {
        const response2 = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/nutritionWidget.json?apiKey=${spoonAPI_KEY}`
        );
        const data2 = await response2.json();
        renderCard(recipe, data2.calories, recipe.id);
      } catch (error) {
        displayErrorMessage();
      }
    }
  } catch (error) {
    displayErrorMessage();
  }
}

// ...

$(document).ready(function () {
  // Handle search button
  $("#searchButton").on("click", function () {
    const selectedMealType = $("#searchInput").val().toLowerCase();
    // Fetch and display random recipes for the selected meal type
    getSpoonacularRandomRecipes(selectedMealType);
  });
});

