json.extract! message, :id, :message_location_id, :author_id, :content, :created_at, :updated_at

json.author do 
  json.partial! 'api/users/user', user: message.author
end