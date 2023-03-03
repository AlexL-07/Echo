class CreateDmMembership < ActiveRecord::Migration[7.0]
  def change
    create_table :dm_memberships do |t|
      t.references :user, foreign_key: true, null: false
      t.references :dm_channel, foreign_key: true, null: false
      t.index [:user_id, :dm_channel_id], unique: true

      t.timestamps
    end
  end
end
