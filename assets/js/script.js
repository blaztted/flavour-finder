console.log("ding");

var query = "11lb brisket and fries";

//Spoonacular API
const spoonAPI = "a2dc3fd4820f461692e2fafe181e656a";
const spoonURL = "https://api.spoonacular.com/recipes/complexSearch";
const randomURL = "https://api.spoonacular.com/recipes/random";

//Ninja Nutrition API
const nutritionAPI = "zyRX7qQ73xAE37yYLOkeJw==afIBYKOkRlfqlhiT";
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


async function search() {
 
  var query = document.getElementById("searchInput").value;

  await getSpoonacularData(query);
  await getNutritionData(query);
}

async function getSpoonacularData(query) {
  const spoonAPI = "a2dc3fd4820f461692e2fafe181e656a";
  const spoonURL = "https://api.spoonacular.com/recipes/complexSearch";

  try {
    const response = await fetch(`${spoonURL}?apiKey=${spoonAPI}&query=${encodeURIComponent(query)}`);
    const data = await response.json();

    // Update the HTML 
    const spoonacularResultsContainer = document.getElementById("spoonacularResults");
    spoonacularResultsContainer.innerHTML = ""; 

    // Adjust based on your API response structure
    data.results.forEach(result => {
      const resultElement = document.createElement("div");
      resultElement.textContent = result.title; 
      spoonacularResultsContainer.appendChild(resultElement);
    });
  } catch (error) {
    console.error("Error fetching Spoonacular data:", error);
  }
}

  async function getNutritionData(query) {
  const nutritionAPI = "zyRX7qQ73xAE37yYLOkeJw==afIBYKOkRlfqlhiT";
  const nutritionURL = `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(nutritionURL, {
      headers: {
        "X-Api-Key": nutritionAPI,
      },
    });
    const data = await response.json();
    
    const nutritionResultsContainer = document.getElementById("nutritionResults");
    nutritionResultsContainer.innerHTML = ""; 
    // Adjust based on your API response structure
    data.forEach(result => {
      const resultElement = document.createElement("div");
      resultElement.textContent = result.name; 
      nutritionResultsContainer.appendChild(resultElement);
    });
  } catch (error) {
    console.error("Error fetching Ninja Nutrition data:", error);
  }
}