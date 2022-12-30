class CreateFriendships < ActiveRecord::Migration[7.0]
  def change
    create_table :friendships do |t|
      t.references :user, foreign_key: true, null: false
      t.references :friend, foreign_key: {to_table: :users}, null: false
      t.string :status, null: false, default: "Pending"

      t.timestamps
    end
  end
end
