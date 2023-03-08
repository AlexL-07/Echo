class DmChannelsChannel < ApplicationCable::Channel
    def subscribed
        @dm_channel = DmChannel.find_by(id: params[:id])
        stream_for @dm_channel
    end
end