class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.references :server, foreign_key: true, null: false
      t.string :name, index: true, null: false
      t.boolean :is_public, index: true, null: false, default: true 

      t.timestamps
    end
  end
end
