class DMChannel < ApplicationRecord
    validates :owner_id, :name, presence: true

    belongs_to :owner, 
        class_name: :User,
        foreign_key: :owner_id,
        primary_key: :id

    has_many :dm_memberships,
        class_name: :DMMembership,
        foreign_key: :dm_channel_id,
        primary_key: :id,
        dependent: :destroy

    has_many :users,
        through: :dm_memberships,
        source: :user,
        dependent: :destroy

    has_many :direct_messages,
        class_name: :DirectMessage,
        foreign_key: :dm_channel_id,
        primary_key: :id,
        dependent: :destroy
end