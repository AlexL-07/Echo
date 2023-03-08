class DirectMessage < ApplicationRecord
    validates :dm_channel_id, :author_id, :content, presence: true
    
    belongs_to :dm_channel,
        class_name: :DmChannel,
        foreign_key: :dm_channel_id,
        primary_key: :id

    belongs_to :author,
        class_name: :User,
        foreign_key: :author_id,
        primary_key: :id
end