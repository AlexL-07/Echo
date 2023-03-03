json.extract! direct_message, :id, :dm_channel_id, :author_id, :content, :created_at, :updated_at

json.author direct_message.author, :id, :username, :status