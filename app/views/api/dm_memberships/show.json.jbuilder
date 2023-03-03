json.dm_channel do
    json.extract! @dm_channel, :id, :name, :owner_id
    json.users do
        @dm_channel.users.each do |user|
            json.set! user.id do
                json.partial! "api/users/user", user: user
            end
        end
    end
end