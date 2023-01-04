class Api::ChannelsController < ApplicationController
    wrap_parameters include: Channel.attribute_names
    def create
        @server = Server.find_by(id: params[:server_id])
        @channel = Channel.new(channel_params)
        @channel.server_id = @server.id
        if @channel.save
            render :show
        else
            render json: {errors: @channel.errors.full_messages}, status: 422
        end
    end

    def index
        @server = Server.find_by(id: params[:server_id])
        @channels = @server.channels
        render :index
    end

    def show
        @channel = Channel.find_by(id: params[:id])
        render :show
    end

    def update
        @channel = Channel.find_by(id: params[:id])
        @server = Server.find_by(id: params[:server_id])
        if current_user.id == @server.owner_id && @channel.update(channel_params)
            render :show
        else
            render json: {errors: @channel.errors.full_messages}, status: 422
        end
    end
    
    def destroy
        @channel = Channel.find_by(id: params[:id])
        @server = Server.find_by(id: params[:server_id])
        if @channel && @server.owner_id == current_user.id
            @channel.destroy
        else 
            render json: { errors: ["Only the server owner can delete this channel"]}, status: 422
        end
    end

    private 
    def channel_params
        params.require(:channel).permit(:name, :is_public)
    end
end
