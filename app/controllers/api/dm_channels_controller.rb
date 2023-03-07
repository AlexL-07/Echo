class Api::DmChannelsController < ApplicationController
    wrap_parameters include: DmChannel.attribute_names

    def index 
        @user = current_user
        @dm_channels = @user.dm_channels
        render :index
    end

    def show
        @dm_channel = DMChannel.find_by(id: params[:id])
        render :show
    end

    def create
        @dm_channel = DMChannel.new(dm_channel_params)
        @dm_channel.owner_id = current_user.id
        if @dm_channel.save
            @dm_channel_membership = DmMembership.create(user_id: current_user.id, dm_channel_id: @dm_channel.id)
            render :show
        else 
            render json: {errors: @dm_channel.errors.full_messages}, status: 422
        end
    end

    def update
        @dm_channel = DMChannel.find_by(id: params[:id])
        if @dm_channel.update(dm_channel_params)
            render :show
        else
            render json: {errors: @dm_channel.errors.full_messages}, status: 422
        end
    end

    def destroy
        @dm_channel = DMChannel.find_by(id: params[:id])
        if @dm_channel
            @dm_channel.destroy
        end
    end

    private 
    def dm_channel_params
        params.require(:dm_channel).permit(:name)
    end
end