class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.text :author, null: false
      t.text :about, null: false
      t.text :image

      t.timestamps
    end
  end
end
