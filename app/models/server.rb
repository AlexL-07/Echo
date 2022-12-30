class Server < ApplicationRecord
    validates :owner_id, :name, :is_public, :invite_key, presence: true
    validates :is_public, inclusion: {in: [true, false]}
    validates :invite_key, length: { is: 5 }, uniqueness: true
    
    before_validation :ensure_invite_key
    
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

    private
    def ensure_invite_key
        self.invite_key ||= generate_unique_invite_key
    end

    def generate_unique_invite_key
        key = rand.to_s[2..6]
        while Server.exists?(invite_key: key)
            key = rand.to_s[2..6]
        end
        key
    end

end