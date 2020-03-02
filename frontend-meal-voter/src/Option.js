class Option {
  constructor(id, name, votes, mealId) {
    this.id = id;
    this.name = name;
    this.votes = votes;
    this.mealId = mealId;
  }
  //Takes json object and turns into Option object
  static constructFromJson(json) {
    return new Option(json.id, json.name, json.votes, json.meal_id);
  }
}
