console.log("ding");

var query = "11lb brisket and fries";

//Spoonacular API
const spoonAPI = "907081a94bda4982a9136d51fa170a4d";
const spoonURL = "https://api.spoonacular.com/recipes/complexSearch";

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

getSpoonacularData();
getNutritionData();
