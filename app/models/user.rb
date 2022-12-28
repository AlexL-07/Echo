class User < ApplicationRecord
    has_secure_password
    validates :session_token, presence: true, uniqueness: true
    validates :username, length: {minimum: 3, maximum: 30}, format: {without: URI::MailTo::EMAIL_REGEXP, message: "Can not be an email"}
    validates :user_tag, presence: true, length: { is: 4 }
    validates :email, length: {minimum: 3, maximum: 255}, format: {with: URI::MailTo::EMAIL_REGEXP}, uniqueness: true
    validates :password, length: {in: 8..225}, allow_nil: true
    validates :username, uniqueness: {scope: :user_tag}
    validates :status, inclusion: {in: ["Online", "Idle", "Do Not Disturb", "Offline"]}
    before_validation :ensure_session_token, :ensure_user_tag 

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

    def set_user_tag
        self.user_tag = generate_unique_user_tag
        self.save!
        self.user_tag
    end



    private
    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def ensure_user_tag
        self.user_tag ||= generate_unique_user_tag
    end

    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

    def generate_unique_user_tag
        tag = rand.to_s[2..5]
        while User.exists?(user_tag: tag) && User.exists?(username: username)
            tag = rand.to_s[2..5]
        end
        tag
    end
end
