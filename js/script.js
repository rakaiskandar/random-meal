const btnMeal = document.getElementById("get-meal");
const mealItem = document.getElementById("meal");

const getApiRequest = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

btnMeal.addEventListener("click", async () => {
  try {
    const meal = await getApiRequest();
    createMeal(meal.meals[0]);

  } catch (error) {
    console.log(error.message);
  }
});

const createMeal = (meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  const showMeal = `
      <div class="row">
        <div class="columns five">
          <img src="${meal.strMealThumb}" alt="Meal Image">
          ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
          ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
          ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
          <h5>Ingredients:</h5>
          <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
        </div>
        <div class="columns seven">
          <h4>${meal.strMeal}</h4>
          <p>${meal.strInstructions}</p>
        </div>
      </div>
      ${meal.strYoutube ? `
      <div class="row">
        <h5>Video Recipe</h5>
          <iframe width="420" height="315"
          src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
          </iframe>
      </div>` : ''}
      `;
  mealItem.innerHTML = showMeal;
};



