const BASE_URL = "http://localhost:3000";
const MEALS_URL = `${BASE_URL}/meals`;
const OPTIONS_URL = `${BASE_URL}/options`;

//Call fetch on a URL with a callback
class MealVoterApi {
  static get(url, callback) {
    fetch(url)
      .then(response => response.json())
      .then(json => callback(json));
  }

  //Call fetch on a URL, post data for configOBJ, and callback
  static post(url, data, callback) {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch(url, configObj)
      .then(response => response.json())
      .then(json => callback(json));
  }

  //Call fetch on a URL, patch data object, id, and callback
  static patch(url, data, id, callback) {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch(url + "/" + id, configObj)
      .then(response => response.json())
      .then(callback);
  }

  //Call fetch on URL, pass in id, and callback
  static delete(url, id, callback) {
    fetch(url + "/" + id, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(callback);
  }

  //Fetch meals GET and pass to a callback(to renderer)
  static getMeals(callback) {
    MealVoterApi.get(MEALS_URL, callback);
  }

  //Fetch meals POST, pass in data for configObj, and pass result to callback(to renderer)
  static postMeal(name, date, callback) {
    let data = { name: name, date: date };
    MealVoterApi.post(MEALS_URL, data, callback);
  }

  //Fetch meals PATCH, pass in data for configObj, id, and pass result to callback(getMeals)
  static patchMeal(data, id, callback) {
    MealVoterApi.patch(MEALS_URL, data, id, callback);
  }

  //Fetch meals DELETE, pass in id, and pass a callback which should call a clear and getMeals methods
  static deleteMeal(id, callback) {
    MealVoterApi.delete(MEALS_URL, id, callback);
  }

  //Fetch options GET and pass a callback(to renderer)
  static getOptions(callback) {
    MealVoterApi.get(OPTIONS_URL, callback);
  }

  //Fetch options POST, pass in name and meal_id, and pass result to callback(to renderer)
  static postOption(name, id, callback) {
    let data = { name: name, votes: 0, meal_id: id };
    MealVoterApi.post(OPTIONS_URL, data, callback);
  }

  //Fetch options PATCH, pass in data for configObj, id, and pass result to callback(getOptions)
  static patchOptionVotes(votesNumber, id, callback) {
    let data = { votes: votesNumber };
    MealVoterApi.patch(OPTIONS_URL, data, id, callback);
  }

  //Fetch options DELETE, pass in id, and pass a callback which should call a clear and getOptions method
  static deleteOption(id, callback) {
    MealVoterApi.delete(OPTIONS_URL, id, callback);
  }
}
