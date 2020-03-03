class Meal < ApplicationRecord
    has_many :options, dependent: :destroy
end
