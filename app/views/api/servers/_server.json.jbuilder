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
            if server
                json.membership_id ServerMembership.find_by(user_id: user.id, server_id: server.id).id
            end
        end
    end
end

json.currentUser do 
    json.partial! "api/users/user", user: current_user
end

json.defaultChannel do
    channel = server.channels.find_by(name: "general")
    json.partial! "api/channels/channel", channel: channel
end
