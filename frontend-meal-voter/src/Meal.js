class Meal {
  constructor(id, name, date) {
    this.id = id;
    this.name = name;
    this.date = date;
  }
  //Takes a json object and turns into Meal object
  static constructFromJson(json) {
    return new Meal(json.id, json.name, json.date);
  }
}
