class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']

    def create
      @user = User.new(user_params)
      @user.status = "Online"
      @user.user_tag = generate_unique_user_tag
      if @user.save!
        login!(@user)
        render :show 
        return 
      end 
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity 
    end

    
    private 
    def user_params 
      params.require(:user).permit(:email, :username, :password)
    end 
    
    def generate_unique_user_tag
      tag = rand.to_s[2..5]
      while User.exists?(user_tag: tag) && User.exists?(username: username)
          tag = rand.to_s[2..5]
      end
      tag
    end
end
