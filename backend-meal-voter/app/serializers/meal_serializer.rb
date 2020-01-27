class MealSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :date
end
