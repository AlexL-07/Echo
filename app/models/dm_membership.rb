class DMMembership < ApplicationRecord
    validates :user_id, :dm_channel_id, presence: true
    validates :user_id, uniqueness: {scope: :dm_channel_id}
    
    belongs_to :user
    
    belongs_to :dm_channel
end