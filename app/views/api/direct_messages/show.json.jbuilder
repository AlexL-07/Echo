json.extract! direct_message, :id, :dm_channel_id, :author_id, :content, :created_at, :updated_at

json.author do 
  json.partial! 'api/users/user', user: direct_message.author
end