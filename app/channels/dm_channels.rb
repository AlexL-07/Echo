class DMChannelsChannel < ApplicationCable::Channel
    def subscribed
        @dm_channel = DMChannel.find_by(id: params[:id])
        stream_for @dm_channel
    end
end