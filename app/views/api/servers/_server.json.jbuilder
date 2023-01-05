json.extract! server, :id, :name, :owner_id, :is_public, :invite_key, :created_at, :updated_at

json.channels do 
    server.channels.each do |channel|
        json.set! channel.id do
            json.partial! "api/channels/channel", channel: channel
        end
    end
end

json.users do 
    server.users.each do |user|
        json.set! user.id do
            json.partial! "api/users/user", user: user
        end
    end
end

json.currentUser do 
    json.partial! "api/users/user", user: current_user
end

json.default_channel do
    channel = server.channels.find_by(channel_name: "general")
    json.partial! "api/channels/channel", channel: channel
end
