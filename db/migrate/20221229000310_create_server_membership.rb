class CreateServerMembership < ActiveRecord::Migration[7.0]
  def change
    create_table :server_memberships do |t|
      t.references :user, foreign_key: true, null: false
      t.references :server, foreign_key: true, null: false

      t.timestamps
    end
  end
end
