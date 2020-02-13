class MealVoterRenderer {
  static renderMeals(mealObjArray) {
    const main = document.getElementsByTagName("main")[0];
    for (const meal of mealObjArray) {
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

  static renderOptions(optionObjArray) {
    const cards = document.getElementsByClassName("meal-card");
    const idToUl = {};
    for (const card of cards) {
      const cardMealId = card.getAttribute("meal-id");
      const ul = card.getElementsByTagName("ul")[0];
      idToUl[cardMealId] = ul;
    }
    for (const option of optionObjArray) {
      const li = document.createElement("li");
      li.setAttribute("class", "option-row");
      const optionName = document.createElement("div");
      optionName.textContent = `${option.name}`;
      li.appendChild(optionName);
      const optionVotes = document.createElement("div");
      optionVotes.textContent = `${option.votes}`;
      li.appendChild(optionVotes);
      const voteButton = document.createElement("button");
      voteButton.setAttribute("option-id", `${option.id}`);
      voteButton.setAttribute("class", "voteButton");
      voteButton.textContent = "Vote!";
      li.appendChild(voteButton);
      const ul = idToUl[option.meal_id];
      ul.appendChild(li);

      //voteButton.addEventListener("click", onClickVote);
    }
  }
}
