class Friendship < ApplicationRecord
    validates :user_id, :friend_id, :status, presence: true
    validates :status, inclusion: {in: ["Pending", "Accepted", "Rejected"]}

    belongs_to :friend,
        class_name: :User,
        foreign_key: :user_id,
        primary_key: :id

    belongs_to :friendee, 
        class_name: :User,
        foreign_key: :friend_id,
        primary_key: :id


end