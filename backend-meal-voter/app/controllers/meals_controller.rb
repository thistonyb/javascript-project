class MealsController < ApplicationController

    def show
        meal = Meal.find_by(id: params[:id])
        render json: meal, only: [:id, :name, :date]
        # included = { include: [:options]}
        # render json: MealSerializer.new(meal, included)

    end

    def index
        meals = Meal.all
        render json: meals, only: [:id, :name, :date]
        # included = { include: [:options]}
        # render json: MealSerializer.new(meals, included)
    end

    def create
        meal = Meal.new(meal_params)
        if meal.save
            render json: meal, only: [:id, :name, :date]
            # included = { include: [:options]}
            # render json: MealSerializer.new(meal, included)
        end
    end

    def destroy
        meal = Meal.find_by(id: params[:id])
        meal.delete
        render json: meal
        # included = { include: [:options]}
        # render json: MealSerializer.new(meal, included)
    end

    private
        def meal_params
            params.require(:meal).permit(:name, :date)
        end
end




