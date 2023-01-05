@servers.each do |server|
    json.set! server.id do
        json.partial! "api/servers/server", server: server
    end

    # json.users do
    #     json.set! server.owner.id do
    #         json.partial! 'api/users/user', user: room.owner
    #     end
    # end
end
