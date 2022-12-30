class Api::ServersController < ApplicationController
    wrap_parameters include: Server.attribute_names

    def index
        @user = current_user
        @servers = current_user.servers
        render :index
    end

    def show
        @server = Server.find_by(id: params[:id])
        render :show
    end

    def create
        @server = Server.new(server_params)
        @server.owner_id = current_user.id
        # @server.is_public = true
        if @server.save
            @server_memberships = ServerMembership.create(user_id: current_user.id, server_id: @server.id)
            @channel = Channel.create(name: "General", is_public: true) 
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

    private
    def server_params
        params.require(:server).permit(:name, :is_public, :invite_key)
    end
end
