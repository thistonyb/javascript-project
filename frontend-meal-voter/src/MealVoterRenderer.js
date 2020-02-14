class MealVoterRenderer {
  static renderPage() {
    const main = document.getElementsByTagName("main")[0];
    const addMealBanner = document.createElement("form");
    addMealBanner.setAttribute("class", "add-meal-banner");
    main.appendChild(addMealBanner);
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "name");
    nameInput.setAttribute("value", "");
    nameInput.setAttribute("placeholder", "Meal Name");
    nameInput.setAttribute("class", "name-input");
    addMealBanner.appendChild(nameInput);
    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "text");
    dateInput.setAttribute("name", "date");
    dateInput.setAttribute("value", "");
    dateInput.setAttribute("placeholder", "Meal Date");
    dateInput.setAttribute("class", "date-input");
    addMealBanner.appendChild(dateInput);
    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("name", "submit");
    submitButton.setAttribute("value", "Create a Meal");
    submitButton.setAttribute("class", "submit-button");
    addMealBanner.appendChild(submitButton);
    // submitButton.addEventListener("click", )

    const mealCards = document.createElement("div");
    mealCards.setAttribute("class", "meal-cards");
    main.appendChild(mealCards);
  }
  /**Takes in an array of parsed json objects that are now Meal objects.
   * Renders each Meal as a div and sets up a button to add Options.
   */
  static renderMeals(mealObjArray) {
    const mealCards = document.getElementsByClassName("meal-cards")[0];
    for (const meal of mealObjArray) {
      const mealCard = document.createElement("div");
      mealCard.setAttribute("class", "meal-card");
      mealCard.setAttribute("meal-id", `${meal.id}`);
      mealCards.appendChild(mealCard);
      const mealName = document.createElement("div");
      mealName.setAttribute("class", "meal-name");
      mealName.textContent = `${meal.name}`;
      mealCard.appendChild(mealName);
      const mealDate = document.createElement("div");
      mealDate.setAttribute("class", "meal-date");
      mealDate.textContent = `${meal.date}`;
      mealCard.appendChild(mealDate);
      const optionsList = createElement("ul");
      optionsList.setAttribute("class", "options-list");
      mealCard.appendChild(optionsList);
      const addButton = document.createElement("button");
      addButton.setAttribute("class", "add-option-button");
      addButton.textContent = "+ Meal Option";
      // addButton.addEventListener("click", onClickAddOption);
      mealCard.appendChild(addButton);
    }
  }
  /**Takes in an array of parsed json objects that are now Option objects.
   * Renders the Options as a list item and sets up a vote button on each Option row.
   */
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

  static onClickAddOption(event) {
    const addButton = event.currentTarget;
    const optionsList = addButton.parentElement.getElementsByClassName;
  }
}
