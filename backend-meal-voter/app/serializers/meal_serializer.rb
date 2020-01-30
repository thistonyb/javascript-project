class MealSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :date
  has_many :options
end
