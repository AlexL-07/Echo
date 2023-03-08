class Api::DirectMessagesController < ApplicationController
    wrap_parameters include: DirectMessage.attribute_names
    def create
        @direct_message = DirectMessage.new(message_params)
        @dm_channel = DmChannel.find(params[:dm_channel_id])
        @direct_message.dm_channel_id = @dm_channel.id
        @direct_message.author_id = current_user.id
        if @direct_message.save
            DmChannelsChannel.broadcast_to @direct_message.dm_channel,
                type: 'RECEIVE_DIRECT_MESSAGE',
                **from_template('api/direct_messages/show', direct_message: @direct_message)
            render json: nil, status: :ok
        else
            render json: { errors: @direct_message.errors.full_messages }, status: 422
        end 
    end

    def update
        @direct_message = DirectMessage.find_by(id: params[:id])
        if @direct_message.author_id == current_user.id && @direct_message.update(message_params)
            DmChannelsChannel.broadcast_to @direct_message.dm_channel,
                type: 'UPDATE_DIRECT_MESSAGE',
                **from_template('api/direct_messages/show', direct_message: @direct_message)
            render json: nil, status: :ok
        else
            render json: { errors: @direct_message.errors.full_messages}, status: 422
        end
    end

    def show
        @direct_message = DirectMessage.find(params[:id])
        render :show
    end

    def index
        @dm_channel = DmChannel.find(params[:dm_channel_id])
        @direct_messages = @dm_channel.direct_messages
        render :index
    end

    def destroy
        @direct_message = DirectMessage.find_by(id: params[:id])
        if @direct_message.destroy 
            DmChannelsChannel.broadcast_to @direct_message.dm_channel,
                type: 'DESTROY_DIRECT_MESSAGE',
                id: @direct_message.id
            render json: nil, status: :ok
        else
            render json: { errors: ["Only the sender and the owner can delete this message."] }, status: 422
        end
    end

    private 
    def message_params
        params.require(:direct_message).permit(:content)
    end
end