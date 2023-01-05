class User < ApplicationRecord
    has_secure_password
    validates :session_token, presence: true, uniqueness: true
    validates :username, length: {minimum: 1, maximum: 30}, format: {without: URI::MailTo::EMAIL_REGEXP, message: "Can not be an email."}
    validates :user_tag, presence: true, length: { is: 4 }
    validates :email, length: {minimum: 3, maximum: 255}, format: {with: URI::MailTo::EMAIL_REGEXP, message:"Must be a valid email."}, uniqueness: true
    validates :password, length: {in: 8..225}, allow_nil: true
    validates :username, uniqueness: {scope: :user_tag}
    validates :status, inclusion: {in: ["Online", "Idle", "Do Not Disturb", "Offline"]}
    before_validation :ensure_session_token

    has_many :owned_servers,
        class_name: :Server,
        foreign_key: :owner_id,
        primary_key: :id,
        dependent: :destroy

    has_many :server_memberships,
        class_name: :ServerMembership,
        foreign_key: :user_id,
        primary_key: :id,
        dependent: :destroy

    has_many :servers,
        through: :server_memberships,
        source: :server,
        dependent: :destroy
    
    has_many :friends, 
        class_name: :Friendship,
        foreign_key: :user_id,
        primary_key: :id,
        dependent: :destroy

    has_many :friendships,
        class_name: :Friendship,
        foreign_key: :friend_id,
        primary_key: :id,
        dependent: :destroy

    has_many :messages,
        class_name: :Message,
        foreign_key: :author_id,
        primary_key: :id

    def self.find_by_credentials(credential, password)
        if credential.include?("@")
            user = User.find_by(email: credential)
            return user if user&.authenticate(password)
        else
            user = User.find_by(username: credential)
            return user if user&.authenticate(password)
        end
        nil
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save!
        self.session_token
    end

    private
    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

    
end
