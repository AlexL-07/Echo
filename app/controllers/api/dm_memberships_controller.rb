class Api::DmMembershipsController < ApplicationController
    wrap_parameters include: DmMembership.attribute_names
    def create
        @dm_membership = DmMembership.new(dm_membership_params)
        @dm_channel = DmChannel.find(params[:dm_membership][:dm_channel_id])
        if @dm_membership.save!
            render :show
        else
            render json: { errors: @dm_membership.errors.full_messages}, status: 422
        end
    end

    def destroy
        @dm_membership = DmMembership.find_by(id: params[:id])
        @user = current_user
        if @dm_membership.user_id == @user.id && @dm_membership.destroy
        else
            render json: {errors: @dm_membership.errors.full_messages}, status: 422
        end
    end

    private
    def dm_membership_params
        params.require(:dm_membership).permit(:user_id, :dm_channel_id)
    end
end