class Api::FriendshipsController < ApplicationController
    wrap_parameters include: Friendship.attribute_names
    def create
        @friendship = Friendship.create(friendship_params)
        @friendship.user_id = current_user.id
        @friendship.status = "Pending"
        if @friendship.save
            render :show
        else
            render json: { errors: @friendship.errors.full_messages }, status: :unprocessable_entity 
        end
    end

    def index
        if current_user
            @user = current_user
            @friendships = @user.friends
            render :index
        else 
            render json: { errors: ["No user is logged in"]}, status: 422
        end
    end

    def update
        @friendship = Friendship.find_by(id: params[:id])
        if @friendship.update(friendship_params)
            if @friendship.status == "Accepted"
                render :show
            elsif @friendship.status == "Rejected"
                # should delete this row of the friendship table
                @friendship.destroy
            end
        else
            render json: { errors: @friendship.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @friendship = Friendship.find_by(id: params[:id])
        @friendship.destroy
    end

    private 
    def friendship_params
        params.require(:friendship).permit(:friend_id, :status)
    end
end
