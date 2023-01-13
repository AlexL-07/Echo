json.partial! "api/friendships/friendship", friendship: @friendship
if friendship.user1_id != current_user.id
    json.friend do
        json.extract! User.find(friendship.user2_id), :id, :username, :email, :status, :tag, :created_at
        json.user1_id friendship.user1_id
    end
else
    json.friend do
        json.extract! User.find(friendship.user1_id), :id, :username, :email, :status, :tag, :created_at
        json.user2_id friendship.user2_id
    end
end