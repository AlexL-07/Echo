json.partial! "api/servers/server", server: @server

json.owner do
    json.set! @server.owner_id do
        json.partial! 'api/users/user', user: @server.owner
    end
end

# json.online_users do
#     @online_users.each do |user|
#         json.set! user.id do
#             json.partial! 'api/users/user', user: user
#         end
#     end
# end

# going to need this later for online user's based off of status

