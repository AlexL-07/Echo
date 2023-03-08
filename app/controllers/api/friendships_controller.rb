class Api::FriendshipsController < ApplicationController
    wrap_parameters include: Friendship.attribute_names
    def create
        @friendship = Friendship.new(friendship_params)
        if @friendship.save
            @user1 = User.find(@friendship.user_id)
            @user2 = User.find(@friendship.friend_id)
            FriendshipsChannel.broadcast_to(@user1, type: 'RECEIVE_FRIENDSHIP', **from_template('api/friendships/show', friendship: @friendship, current_user: @user2))
            FriendshipsChannel.broadcast_to(@user2, type: 'RECEIVE_FRIENDSHIP', **from_template('api/friendships/show', friendship: @friendship, current_user: @user1))
            render json: nil, status: :ok
        else
            render json: { errors: @friendship.errors.full_messages }, status: :unprocessable_entity 
        end
    end

    def index
        if current_user
            @friendships = current_user.friends
            render :index
        else 
            render json: { errors: ["No user is logged in"]}, status: 422
        end
    end

    def update
        @friendship = Friendship.find(params[:id])
        if @friendship.update(status_params)
            @user1 = User.find(@friendship.user_id)
            @user2 = User.find(@friendship.friend_id)
            if @friendship.status == "Accepted"
                @dm_channel = DmChannel.create(name: "#{@user1.username}_#{@user2.username}", owner_id: @user1.id)  
                if @dm_channel 
                    @dm_membership1 = DmMembership.create(user_id: @user1.id, dm_channel_id: @dm_channel.id)
                    @dm_membership2 = DmMembership.create(user_id: @user2.id, dm_channel_id: @dm_channel.id)
                end
            end                
            # @dm_channel = @friendship.dm_channel
            FriendshipsChannel.broadcast_to(@user1, type: 'UPDATE_FRIENDSHIP', **from_template('api/friendships/show', friendship: @friendship, current_user: @user2))
            FriendshipsChannel.broadcast_to(@user2, type: 'UPDATE_FRIENDSHIP', **from_template('api/friendships/show', friendship: @friendship, current_user: @user1))
            render json: nil, status: :ok
        else
            render json: { errors: @friendship.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        @friendship = Friendship.find(params[:id])
        if @friendship.destroy
            @user1 = User.find(@friendship.user_id)
            @user2 = User.find(@friendship.friend_id)
            @dm_channel = @friendship.dm_channel
            @dm_channel.destroy
            FriendshipsChannel.broadcast_to(@user1, type: 'DESTROY_FRIENDSHIP', id: @friendship.id)
            FriendshipsChannel.broadcast_to(@user2, type: 'DESTROY_FRIENDSHIP', id: @friendship.id)
            render json: nil, status: :ok
        else
            render json: { errors: @friendship.errors.full_messages }, status: 422
        end
    end

    private 
    def friendship_params
        params.require(:friendship).permit(:user_id, :friend_id, :status)
    end

    def status_params
        params.require(:friendship).permit(:status)
    end
end
