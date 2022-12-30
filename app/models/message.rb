class Message < ApplicationRecord
    validates :message_location_id, :author_id, :content, presence: true

    belongs_to :channel,
        class_name: :Channel,
        foreign_key: :message_location_id,
        primary_key: :id
    
    belongs_to :author, 
        class_name: :User,
        foreign_key: :author_id,
        primary_key: :id
end