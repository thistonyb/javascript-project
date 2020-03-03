class MealVoterRenderer {
  /** This function renders the add meal banner with the form that has the meal
   * name and date inputs with an event listener. It also renders the card with
   * all the meal cards on it.
   */
  static renderPage() {
    const main = document.getElementsByTagName("main")[0];
    main.textContent = "";
    const addMealBanner = document.createElement("form");
    addMealBanner.setAttribute("class", "add-meal-banner");
    main.appendChild(addMealBanner);
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "name");
    nameInput.setAttribute("value", "");
    nameInput.setAttribute("placeholder", "Enter Meal Name");
    nameInput.setAttribute("class", "name-input");
    addMealBanner.appendChild(nameInput);
    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "text");
    dateInput.setAttribute("name", "date");
    dateInput.setAttribute("value", "");
    dateInput.setAttribute("placeholder", "Enter Meal Date");
    dateInput.setAttribute("class", "date-input");
    addMealBanner.appendChild(dateInput);
    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("name", "submit");
    submitButton.setAttribute("value", "Create a Meal");
    submitButton.setAttribute("class", "submit-button");
    addMealBanner.appendChild(submitButton);
    submitButton.addEventListener("click", MealVoterRenderer.onClickAddMeal);

    const mealCards = document.createElement("div");
    mealCards.setAttribute("class", "meal-cards");
    main.appendChild(mealCards);
  }
  static renderZoom(meal) {
    const main = document.getElementsByTagName("main")[0];
    main.textContent = "";
    const zoomView = document.createElement("div");
    zoomView.setAttribute("class", "zoom-view");
    main.appendChild(zoomView);
    const mealCard = MealVoterRenderer.renderMealCard(meal, false);
    zoomView.appendChild(mealCard);
    if (meal.options) {
      const ul = mealCard.getElementsByTagName("ul")[0];

      for (const option of meal.options) {
        const li = MealVoterRenderer.renderOptionRow(option, () =>
          MealVoterApi.getMeal(meal.id, MealVoterRenderer.renderZoom)
        );
        ul.appendChild(li);
      }
    }
    const backButton = document.createElement("button");
    backButton.setAttribute("class", "back-button");
    backButton.textContent = "Back";
    backButton.addEventListener("click", () => {
      MealVoterRenderer.renderPage();
      MealVoterApi.getMeals(getMealsCallback);
    });
    main.appendChild(backButton);
  }
  static renderMealCard(meal, showDeleteButton) {
    const mealCard = document.createElement("div");
    mealCard.setAttribute("class", "meal-card");
    mealCard.setAttribute("meal-id", `${meal.id}`);
    const topRow = document.createElement("div");
    topRow.setAttribute("class", "top-row");
    const mealName = document.createElement("div");
    mealName.setAttribute("class", "meal-name");
    mealName.textContent = `${meal.name}`;
    topRow.appendChild(mealName);
    const mealDate = document.createElement("div");
    mealDate.setAttribute("class", "meal-date");
    mealDate.textContent = `${meal.date}`;
    topRow.appendChild(mealDate);
    if (showDeleteButton) {
      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("class", "delete-button");
      deleteButton.setAttribute("meal-id", `${meal.id}`);
      deleteButton.textContent = "X";
      deleteButton.addEventListener(
        "click",
        MealVoterRenderer.onClickDeleteMeal
      );
      topRow.appendChild(deleteButton);
    }
    mealCard.appendChild(topRow);
    const optionsList = document.createElement("ul");
    optionsList.setAttribute("class", "options-list");
    mealCard.appendChild(optionsList);
    return mealCard;
  }
  /**Takes in an array of parsed json objects that are now Meal objects.
   * Renders each Meal as a card, as well as the meal name and date.
   * Sets up a Options list as a card, and banner card with a form with an
   * input and submit Option button with an event listener.
   */
  static renderMeals(mealObjArray) {
    const mealCards = document.getElementsByClassName("meal-cards")[0];
    mealCards.textContent = "";
    for (const meal of mealObjArray) {
      const mealCard = MealVoterRenderer.renderMealCard(meal, true);
      const zoomButton = document.createElement("button");
      zoomButton.setAttribute("class", "zoom-button");
      zoomButton.setAttribute("meal-id", `${meal.id}`);
      zoomButton.textContent = "Zoom In";
      zoomButton.addEventListener("click", MealVoterRenderer.onClickZoom);
      mealCard.appendChild(zoomButton);
      mealCards.appendChild(mealCard);
    }
  }
  static renderOptionRow(option, voteRenderCallback) {
    const li = document.createElement("li");
    li.setAttribute("class", "option-row");
    const optionName = document.createElement("div");
    optionName.setAttribute("class", "option-name");
    optionName.textContent = `${option.name}`;
    li.appendChild(optionName);
    const optionVotes = document.createElement("div");
    optionVotes.setAttribute("class", "option-votes");
    optionVotes.textContent = `${option.votes}`;
    li.appendChild(optionVotes);
    const voteButton = document.createElement("button");
    voteButton.setAttribute("option-id", `${option.id}`);
    voteButton.setAttribute("class", "vote-button");
    voteButton.setAttribute("votes", `${option.votes}`);
    voteButton.textContent = "Vote!";
    voteButton.addEventListener("click", event =>
      MealVoterRenderer.onClickVote(event, voteRenderCallback)
    );
    li.appendChild(voteButton);
    return li;
  }
  /**Takes in an array of parsed json objects that are now Option objects.
   * Renders the Options as a list item and sets up a vote button on each Option row.
   * And an event listener on the vote button.
   * It also renders the addOptionBanner as a form and its event listener.
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
      const li = MealVoterRenderer.renderOptionRow(option, () =>
        MealVoterApi.getMeals(getMealsCallback)
      );
      const ul = idToUl[option.mealId];
      ul.appendChild(li);
    }
    for (const mealId in idToUl) {
      const ul = idToUl[mealId];
      if (ul.getElementsByTagName("li").length < 7) {
        const addOptionBanner = document.createElement("form");
        addOptionBanner.setAttribute("class", "add-option-banner");
        ul.appendChild(addOptionBanner);
        const optionInput = document.createElement("input");
        optionInput.setAttribute("type", "text");
        optionInput.setAttribute("name", "name");
        optionInput.setAttribute("value", "");
        optionInput.setAttribute("placeholder", "Option Name");
        optionInput.setAttribute("class", "option-input");
        addOptionBanner.appendChild(optionInput);
        const addOptionButton = document.createElement("input");
        addOptionButton.setAttribute("meal-id", `${mealId}`);
        addOptionButton.setAttribute("type", "submit");
        addOptionButton.setAttribute("name", "submit");
        addOptionButton.setAttribute("value", "+ Meal Option");
        addOptionButton.setAttribute("class", "add-option-button");
        addOptionBanner.appendChild(addOptionButton);
        addOptionButton.addEventListener(
          "click",
          MealVoterRenderer.onClickAddOption
        );
      }
    }
  }
  static onClickZoom(event) {
    const zoomButton = event.currentTarget;
    const mealId = zoomButton.getAttribute("meal-id");
    MealVoterApi.getMeal(mealId, MealVoterRenderer.renderZoom);
  }
  /**
   * Fix this...Have to hit button twice or more. Options not deleted
   * before it trys to delete the Meal card??
   * @param {*} event Click event to delete Meal
   */
  static onClickDeleteMeal(event) {
    const deleteButton = event.currentTarget;

    // deleteButton.removeEventListener(
    //   "click",
    //   MealVoterRenderer.onClickDeleteMeal
    // );
    const mealId = deleteButton.getAttribute("meal-id");
    // const mealCard = deleteButton.parentNode.parentNode;
    // const voteButtons = mealCard.getElementsByClassName("vote-button");
    // const optionIds = [];
    // for (const voteButton of voteButtons) {
    //   optionIds.push(voteButton.getAttribute("option-id"));
    // }

    // for (const optionId of optionIds) {
    //   MealVoterApi.deleteOption(optionId);
    // }
    MealVoterApi.deleteMeal(mealId, () =>
      MealVoterApi.getMeals(getMealsCallback)
    );
  }
  /**Callback for the adding the meal submit button event listener. */
  static onClickAddMeal(event) {
    event.preventDefault();
    const addButton = event.currentTarget;
    const formElements = addButton.form.elements;
    const name = formElements[0].value;
    const date = formElements[1].value;
    if (name == "" || date == "") {
      alert("Please enter values in both fields.");
      return;
    }
    MealVoterApi.postMeal(name, date, () =>
      MealVoterApi.getMeals(getMealsCallback)
    );
    formElements[0].value = "";
    formElements[1].value = "";
  }
  /**Callback for adding the option submit button event listener. */
  static onClickAddOption(event) {
    event.preventDefault();
    const addButton = event.currentTarget;
    const mealId = addButton.getAttribute("meal-id");
    const formElements = addButton.form.elements;
    const option = formElements[0].value;
    if (option == "") {
      alert("Please enter a value for a meal option.");
      return;
    }
    MealVoterApi.postOption(option, mealId, () =>
      MealVoterApi.getMeals(getMealsCallback)
    );
    formElements[0].value = "";
  }
  /**Callback for vote button event listener. */
  static onClickVote(event, renderCallback) {
    event.preventDefault();
    const addButton = event.currentTarget;
    const optionId = addButton.getAttribute("option-id");
    const votes = addButton.getAttribute("votes");
    MealVoterApi.patchOptionVotes(
      1 + parseInt(votes, 10),
      optionId,
      renderCallback
    );
  }
}
