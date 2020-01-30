class OptionSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :votes, :meal_id
  belongs_to :meal
end
