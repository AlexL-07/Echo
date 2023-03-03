json.partial! "api/dm_channels/dm_channel", dm_channel: @dm_channel

json.owner do
    json.set! @dm_channel.owner_id do
        json.partial! 'api/users/user', user: @dm_channel.owner
    end
end