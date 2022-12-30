json.extract! channel, :id, :server_id, :name, :is_public, :created_at, :updated_at

json.messages do 
    channel.messages.each do |message|
      json.set! message.id do
        json.partial! "api/messages/message", message: message
      end
    end
end
  