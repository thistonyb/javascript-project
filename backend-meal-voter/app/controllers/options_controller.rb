class OptionsController < ApplicationController
    def show
        option = Option.find_by(id: params[:id])
        render json: OptionSerializer.new(option)
    end

    def index
        options = Option.all
        render json: OptionSerializer.new(options)
    end

    def create
        option = Option.new(option_params)
        if option.save
            render json: OptionSerializer.new(option)
        end
    end

    def destroy
        option = Option.find_by(id: params[:id])
        option.delete
        render json: OptionSerializer.new(option)
    end

    private
        def option_params
            params.require(:option).permit(:name, :votes, :meal_id)
        end
end
