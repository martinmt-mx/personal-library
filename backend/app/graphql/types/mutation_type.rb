module Types
  class MutationType < Types::BaseObject
    field :create_book, Types::BookType, null: false do
      description "Crear un nuevo libro"
      argument :title, String, required: true
      argument :author, String, required: true
      argument :status, String, required: true
      argument :rating, Integer, required: false
      argument :notes, String, required: false
    end

    def create_book(title:, author:, status:, rating: nil, notes: nil)
      Book.create!(
        title: title,
        author: author,
        status: status,
        rating: rating,
        notes: notes
      )
    end

    field :update_book, Types::BookType, null: false do
      description "Actualizar un libro existente"
      argument :id, ID, required: true
      argument :title, String, required: false
      argument :author, String, required: false
      argument :status, String, required: false
      argument :rating, Integer, required: false
      argument :notes, String, required: false
    end

    def update_book(id:, title: nil, author: nil, status: nil, rating: nil, notes: nil)
      book = Book.find(id)

      if status.present?
        status = Book.statuses[status] || status
      end

      book.update!(
        title: title || book.title,
        author: author || book.author,
        status: status || book.status,
        rating: rating || book.rating,
        notes: notes || book.notes
      )
      book
    end


    field :delete_book, Boolean, null: false do
      description "Eliminar un libro"
      argument :id, ID, required: true
    end

    def delete_book(id:)
      book = Book.find(id)
      book.destroy
      true
    end
  end
end
