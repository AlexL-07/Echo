json.user do
    json.extract! @user, :id, :email, :username, :user_tag, :created_at, :updated_at
end