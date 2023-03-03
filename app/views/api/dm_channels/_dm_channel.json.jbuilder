json.extract! dm_channel, :id, :name, :owner_id, :created_at, :updated_at

json.users do 
    dm_channel.users.each do |user|
        json.set! user.id do
            json.partial! "api/users/user", user: user
            if dm_channel
                json.membership_id DMMembership.find_by(user_id: user.id, dm_channel_id: dm_channel.id).id
            end
        end
    end
end

json.currentUser do 
    json.partial! "api/users/user", user: current_user
end