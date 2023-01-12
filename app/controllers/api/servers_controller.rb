class Api::ServersController < ApplicationController
    wrap_parameters include: Server.attribute_names

    def index
        @user = current_user
        @servers = @user.servers
        render :index
    end

    def show
        @server = Server.find_by(id: params[:id])
        render :show
    end

    def create
        @server = Server.new(server_params)
        @server.owner_id = current_user.id
        @server.invite_key = generate_unique_invite_key
        if @server.save
            @server_memberships = ServerMembership.create(user_id: current_user.id, server_id: @server.id)
            @channel = Channel.create(name: "general", is_public: true, server_id: @server.id) 
            render :show
        else
            render json: {errors: @server.errors.full_messages }, status: 422
        end
    end

    def update
        @server = Server.find_by(id: params[:id])
        if @server.owner_id == current_user.id && @server.update(server_params)
            render :show
        else
            render json: { errors: @server.errors.full_messages }, status: 422
        end
    end

    def destroy
        @server = Server.find_by(id: params[:id])
        if @server && @server.owner_id == current_user.id
            @server.destroy
        else
            render json: { errors: ["Only the server owner can delete this server"]}, status: 422
        end
    end

    def find_server
        invite = params[:invite_key]
        @server = Server.find_by(invite_key: invite)
        render :show
    end

    private
    def server_params
        params.require(:server).permit(:name, :is_public)
    end

    def generate_unique_invite_key
        key = rand.to_s[2..6]
        while Server.exists?(invite_key: key)
            key = rand.to_s[2..6]
        end
        key
    end
end
