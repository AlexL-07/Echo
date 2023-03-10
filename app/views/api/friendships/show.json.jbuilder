# json.extract! friendship, :id, :created_at, :updated_at, :status
# json.partial! "api/friendships/friendship", friendship: @friendship
json.extract! friendship, :id, :user_id, :friend_id, :status, :created_at, :updated_at
p "asdasdasd"
puts friendship
puts current_user
if friendship.user_id != current_user.id
    json.friend do
        json.extract! User.find(friendship.friend_id), :id, :username, :email, :status, :user_tag, :created_at
        json.user_id friendship.user_id
    end
else
    json.friend do
        json.extract! User.find(friendship.user_id), :id, :username, :email, :status, :user_tag, :created_at
        json.friend_id friendship.friend_id
    end
end
if friendship.status == "Accepted"
    json.dm_channel_id friendship.dm_channel.id
end