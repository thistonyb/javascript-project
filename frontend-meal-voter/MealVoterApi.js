const BASE_URL = "http://localhost:3000";
const MEALS_URL = `${BASE_URL}/meals`;
const OPTIONS_URL = `${BASE_URL}/options`;
//Call fetch on a URL and render JSON on a callback
class MealVoterApi {
  static get(url, render) {
    fetch(url)
      .then(response => response.json())
      .then(json => render(json));
  }

  static post() {}
  static update() {}
  static delete() {}
}
