class Channel < ApplicationRecord
    validates :server_id, :name, presence: true
    validates :is_public, inclusion: {in: [true, false]}

    belongs_to :server,
        foreign_key: :server_id,
        class_name: :Server

    has_many :messages, 
        class_name: :Message,
        foreign_key: :message_location_id,
        primary_key: :id,
        dependent: :destroy
end