class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.text :author, null: false
      t.text :about, null: false
      t.string :image, default: 'https://images.unsplash.com/photo-1468273519810-d3fe4c125cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'

      t.timestamps
    end
  end
end
