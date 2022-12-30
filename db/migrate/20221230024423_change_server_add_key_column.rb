class ChangeServerAddKeyColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :servers, :invite_key, :string, index: {unique: true}, null: false
    add_column :servers, :server_image, :string
  end
end
