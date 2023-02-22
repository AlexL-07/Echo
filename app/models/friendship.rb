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


end