class Api::MessagesController < ApplicationController
    wrap_parameters include: Message.attribute_names
    def create
        @message = Message.new(message_params)
        @channel = Channel.find(params[:channel_id])
        @message.message_location_id = @channel.id
        @message.author_id = current_user.id
        if @message.save
            render :show
        end 
    end

    def update
        @message = Message.find_by(id: params[:id])
        if @message.author_id == current_user.id && @message.update(message_params)
            render :show
        else
            render json: { errors: @message.errors.full_messages}, status: 422
        end
    end

    def show
        @message = Message.find(params[:id])
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
            render :show
        else
            render json: { errors: @message.errors.full_messages}, status: 422
        end
    end

    private 
    def message_params
        params.require(:message).permit(:content)
    end
end
