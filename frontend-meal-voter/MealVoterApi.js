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
  //Call fetch on a URL and post data
  static post(url, data, render) {
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
      .then(json => render(json));
  }
  static update() {}
  static delete() {}
}
