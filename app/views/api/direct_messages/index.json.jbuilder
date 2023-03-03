@direct_messages.each do |message|
    json.set! message.id do 
          json.partial! "api/direct_messages/direct_message", direct_message: message
    end
end