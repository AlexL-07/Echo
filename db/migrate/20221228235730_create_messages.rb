class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.references :message_location, foreign_key: {to_table: :channels}, null: false
      t.references :author, foreign_key: {to_table: :users}, null: false
      t.text :content, null: false

      t.timestamps
    end
  end
end
