class CreateServers < ActiveRecord::Migration[7.0]
  def change
    create_table :servers do |t|
      t.references :owner, foreign_key: {to_table: :users}, null: false
      t.string :name, null: false
      t.boolean :is_public, null: false, index: true, default: true

      t.timestamps
    end
  end
end
