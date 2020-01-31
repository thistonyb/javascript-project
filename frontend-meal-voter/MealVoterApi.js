const BASE_URL = "http://localhost:3000";
const MEALS_URL = `${BASE_URL}/meals`;
const OPTIONS_URL = `${BASE_URL}/options`;

//Call fetch on a URL and render JSON on a callback
class MealVoterApi {
  static get(url, renderCallback) {
    fetch(url)
      .then(response => response.json())
      .then(json => renderCallback(json));
  }

  //Call fetch on a URL, post data, render JSON on a callback
  static post(url, data, renderCallback) {
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
      .then(json => renderCallback(json));
  }

  //Call fetch on a URL, patch data, id and pass in GET callback to render
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
  //Call fetch on URL and pass in id and callback with clear and GET methods
  static delete(url, id, callback) {
    fetch(url + "/" + id, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(callback);
  }
}
