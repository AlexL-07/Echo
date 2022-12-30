class Channel < ApplicationRecord
    validates :server_id, :name, :is_public, presence: true
    validates :is_public, inclusion: {in: [true, false]}

    belongs_to :server

    has_many :messages, 
        class_name: :Message,
        foreign_key: :message_location_id,
        primary_key: :id,
        dependent: :destroy
end