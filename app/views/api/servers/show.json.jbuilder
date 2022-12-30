json.server do
    json.partial! "api/servers/server", server: @server
end

# json.online_users do
#     @online_users.each do |user|
#         json.set! user.id do
#             json.partial! 'api/users/user', user: user
#         end
#     end
# end

# going to need this later for online user's based off of status

