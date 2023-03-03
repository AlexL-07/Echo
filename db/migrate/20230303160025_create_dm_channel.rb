class CreateDmChannel < ActiveRecord::Migration[7.0]
  def change
    create_table :dm_channels do |t|
      t.references :owner, foreign_key: {to_table: :users}, null: false
      t.string :name, index: true, null: false

      t.timestamps
    end
  end
end
