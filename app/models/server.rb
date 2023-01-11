class Server < ApplicationRecord
    validates :is_public, inclusion: {in: [true, false]}
    validates :owner_id, :name, :invite_key, presence: true
    validates :invite_key, length: { is: 5 }, uniqueness: true
    
    belongs_to :owner, 
        class_name: :User,
        foreign_key: :owner_id,
        primary_key: :id

    has_many :channels,
        class_name: :Channel,
        foreign_key: :server_id,
        primary_key: :id,
        dependent: :destroy 

    has_many :server_memberships,
        class_name: :ServerMembership,
        foreign_key: :server_id,
        primary_key: :id,
        dependent: :destroy

    has_many :users,
        through: :server_memberships,
        source: :user,
        dependent: :destroy


end