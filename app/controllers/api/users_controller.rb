class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password']

    def create
      @user = User.new(user_params)
      @user.status = "Online"
      @user.user_tag = generate_unique_user_tag
      if @user.save
        login!(@user)
        render :show 
        return
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity 
      end 
    end

    def show
      @user = User.find_by(id: params[:id])
      render :show
    end

    def index 
      @server = Server.find_by(id: params[:server_id])
      if @server
        @users = @server.users
      end
      render :index
    end

    def update 
      @user = User.find_by(id: params[:id])
      if @user.update(user_params)
        @user.servers.each do |server| 
          ServersChannel.broadcast_to server,
            type: 'UPDATE_USER',
            **from_template('api/users/wbs', user: @user)
        end
        render :show
      else 
        render json: {errors: @user.errors.full_messages}, status: 422
      end
    end

    def destroy
      @user = User.find_by(id: params[:id])
      if current_user.id == @user.id
        @user.destroy
      else
        render json: {errors: ["Must be logged in as this user."]}, status: 422
      end
    end

    private 
    def user_params 
      params.require(:user).permit(:email, :username, :password, :user_tag, :status, :id, :created_at, :updated_at, :profile_image)
    end 
    
    def generate_unique_user_tag
      tag = rand.to_s[2..5]
      while User.exists?(user_tag: tag) && User.exists?(username: username)
          tag = rand.to_s[2..5]
      end
      tag
    end
end
