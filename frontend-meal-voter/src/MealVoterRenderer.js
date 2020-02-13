class MealVoterRenderer {
  static renderMeals(obj) {
    const main = document.getElementsByTagName("main")[0];
    for (const meal of obj) {
      const mealCard = document.createElement("div");
      mealCard.setAttribute("class", "meal-card");
      mealCard.setAttribute("meal-id", `${meal.id}`);
      main.appendChild(mealCard);
      const mealName = document.createElement("div");
      mealName.setAttribute("class", "meal-name");
      mealName.textContent = `${meal.name}`;
      mealCard.appendChild(mealName);
      const mealDate = document.createElement("div");
      mealDate.setAttribute("class", "meal-date");
      mealDate.textContent = `${meal.date}`;
      mealCard.appendChild(mealDate);
      const addButton = document.createElement("button");
      addButton.setAttribute("class", "add-option-button");
      addButton.textContent = "+ Meal Option";
      // addButton.addEventListener("click", onClickAddOption);
      mealCard.appendChild(addButton);
      const optionsList = createElement("ul");
      optionsList.setAttribute("class", "options-list");
      mealCard.appendChild(optionsList);
    }
  }
}
