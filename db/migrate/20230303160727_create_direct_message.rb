class CreateDirectMessage < ActiveRecord::Migration[7.0]
  def change
    create_table :direct_messages do |t|
      t.references :dm_channel, foreign_key: {to_table: :dm_channels}, null: false
      t.references :author, foreign_key: {to_table: :users}, null: false
      t.text :content, null: false

      t.timestamps
    end
  end
end
