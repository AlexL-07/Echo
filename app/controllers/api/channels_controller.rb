class Api::ChannelsController < ApplicationController
    wrap_parameters include: Channel.attribute_names
    def create
        @server = Server.find(params[:server_id])
        @channel = Channel.new(channel_params)
        @channel.server_id = @server.id
        @channel.is_public = true
        if @channel.save
            ServersChannel.broadcast_to @server,
                type: 'RECEIVE_CHANNEL',
                **from_template('api/channels/show', channel: @channel)
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
            ServersChannel.broadcast_to @server,
                    type: 'UPDATE_CHANNEL',
                    **from_template('api/channels/show', channel: @channel)
            render :show
        else
            render json: {errors: @channel.errors.full_messages}, status: 422
        end
    end
    
    def destroy
        @channel = Channel.find_by(id: params[:id])
        @server = Server.find_by(id: params[:server_id])
        if @channel && @server.owner_id == current_user.id
            if @channel.destroy
                ServersChannel.broadcast_to @server,
                    type: 'DESTROY_CHANNEL',
                    id: @channel.id
                render json: nil, status: :ok
            else
                render json: { errors: @message.errors.full_messages }, status: 422
            end
        else 
            render json: { errors: ["Only the server owner can delete this channel"]}, status: 422
        end
    end

    private 
    def channel_params
        params.require(:channel).permit(:name, :is_public)
    end
end
