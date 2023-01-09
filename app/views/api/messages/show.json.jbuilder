json.message do
    json.partial! 'api/messages/message', message: @message
end

json.author do 
  json.partial! 'api/users/user', user: @message.author
end