class Meal {
  constructor(id, name, date, options) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.options = options;
  }
  //Takes a json object and turns into Meal object
  static constructFromJson(json) {
    const options = [];
    if (json.options) {
      for (const option of json.options) {
        options.push(
          new Option(option.id, option.name, option.votes, option.meal_id)
        );
      }
    }

    return new Meal(json.id, json.name, json.date, options);
  }
}
