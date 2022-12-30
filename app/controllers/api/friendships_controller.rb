class Api::FriendshipsController < ApplicationController
    def create
    end

    def destroy
    end

    private 
    def friendship_params
        params.require(:friendship).permit(:user_id, :friend_id)
    end
end
