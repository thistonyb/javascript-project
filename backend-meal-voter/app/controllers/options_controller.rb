class OptionsController < ApplicationController
    def show
        option = Option.find_by(id: params[:id])
        render json: option, only: [:id, :name, :votes, :meal_id]
        # included = { include: [:meal]}
        # render json: OptionSerializer.new(option, included)
    end

    def index
        options = Option.all
        render json: options, only: [:id, :name, :votes, :meal_id]
        # included = { include: [:meal]}
        # render json: OptionSerializer.new(options, included)
    end

    def create
        option = Option.new(option_params)
    
        if option.save
            
            render json: option, only: [:id, :name, :votes, :meal_id]
            # included = { include: [:meal]}
            # render json: OptionSerializer.new(option, included)
        end
    end

    def update
        option = Option.find_by(id: params[:id])
        option.votes = params[:votes]
        if option.save
            render json: option, only: [:id, :name, :votes, :meal_id]
        end

    end

    def destroy
        option = Option.find_by(id: params[:id])
        option.delete
        render json: option
        # included = { include: [:meal]}
        # render json: OptionSerializer.new(option, included)
    end

    private
        def option_params
            params.require(:option).permit(:id, :name, :votes, :meal_id)
        end
end
