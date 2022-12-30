class ChangeInviteKey < ActiveRecord::Migration[7.0]
  def change
    add_index :servers, :invite_key, unique: true
  end
end
