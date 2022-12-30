class Api::MessagesController < ApplicationController
    def create
        @message = Message.new(message_params)
        @channel = Channel.find(params[:channel_id])
        @message.message_location_id = @channel.id
        @message.author_id = current_user.id
        if @message.save
            render :index
        end 
    end

    def update
        @message = Message.find_by(id: params[:id])
        if @message.author_id == current_user.id && @message.update(message_params)
            render :index
        else
            render json: { errors: @message.errors.full_messages}, status: 422
        end
    end

    def index
        @channel = Channel.find(params[:channel_id])
        @messages = @channel.messages
        render :index
    end

    def destroy
        @message = Message.find_by(id: params[:id])
        @server = Server.find(id: params[:server_id])
        if @message.author_id == current_user.id || current_user.id == @server.owner_id
            @message.destroy
            render :index
        else
            render json: { errors: @message.errors.full_messages}, status: 422
        end
    end

    private 
    def message_params
        params.require(:message).permit(:content)
    end
end
