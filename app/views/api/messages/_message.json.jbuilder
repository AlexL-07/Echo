json.extract! message, :id, :message_location_id, :author_id, :content, :created_at, :updated_at

json.author message.author, :id, :username, :status