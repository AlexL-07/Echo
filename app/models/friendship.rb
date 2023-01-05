class Friendship < ApplicationRecord
    validates :status, inclusion: {in: ["Pending", "Accepted", "Rejected", "Blocked"]}

    belongs_to :friend,
        class_name: :User,
        foreign_key: :user_id,
        primary_key: :id

    belongs_to :friendee, 
        class_name: :User,
        foreign_key: :friend_id,
        primary_key: :id


end