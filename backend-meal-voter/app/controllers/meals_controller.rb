class MealsController < ApplicationController

    def show
        meal = Meal.find_by(id: params[:id])
        render json: MealSerializer.new(meal)
    end

    def index
        meals = Meal.all
        render json: MealSerializer.new(meals)
    end

    def create
        meal = Meal.new(meal_params)
        if meal.save
            render json: MealSerializer.new(meal)
        end
    end

    def destroy
        meal = Meal.find_by(id: params[:id])
        meal.delete
        render json: MealSerializer.new(meal)
    end

    private
        def meal_params
            params.require(:meal).permit(:name, :date)
        end
end
