class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']

    def create
      @user = User.new(user_params)
      @user.status = "Online"
      if @user.save!
        login!(@user)
        render :show 
        return 
      end 
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity 
    end

    private 
    def user_params 
      params.require(:user).permit(:email, :username, :password, :user_tag)
    end 
end
