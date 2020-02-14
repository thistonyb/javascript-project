document.addEventListener("DOMContentLoaded", function() {
  MealVoterRenderer.renderPage();
  MealVoterApi.getMeals(getMealsCallback);
});
/**Making sure the Options are renderend after the Meals by utilizing
 * the getMeals callback */

function getMealsCallback(meals) {
  MealVoterRenderer.renderMeals(meals);
  MealVoterApi.getOptions(MealVoterRenderer.renderOptions);
}
