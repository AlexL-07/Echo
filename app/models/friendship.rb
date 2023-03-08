class Friendship < ApplicationRecord
    validates :status, inclusion: {in: ["Pending", "Accepted", "Rejected", "Blocked"]}
    validates :user_id, uniqueness: { scope: :friend_id }
    validates :friend_id, uniqueness: { scope: :user_id }

    belongs_to :request_sender,
        class_name: :User,
        foreign_key: :user_id,
        primary_key: :id

    belongs_to :request_receiver, 
        class_name: :User,
        foreign_key: :friend_id,
        primary_key: :id

    def dm_channel
        user1 = User.find(self.user_id)
        user2 = User.find(self.friend_id)
        hash = {}
        user1.dm_channels.each do |u1_channel|
            hash[u1_channel.id] = u1_channel
        end

        user2.dm_channels.each do |u2_channel|
            if hash[u2_channel.id]
                return u2_channel
            end
        end
    end


end