require 'rails_helper'

RSpec.describe 'GraphQL Mutations', type: :request do
  describe 'Books Mutations' do
    it 'creates a new book' do
      post '/graphql', params: { query: create_mutation }
      json = JSON.parse(response.body)

      puts json

      data = json['data']['createBook']
      created_book = Book.find(data['id'])

      expect(data['title']).to eq('Refactoring')
      expect(data['author']).to eq('Martin Fowler')
      expect(created_book.title).to eq('Refactoring')
      expect(created_book.author).to eq('Martin Fowler')
      expect(Book.count).to eq(1)
    end

    it 'updates an existing book' do
      book = Book.create(title: "Eloquent Ruby", author: "Russ Olsen", status: "to_read", rating: 3)

      post '/graphql', params: { query: update_mutation(book.id) }
      json = JSON.parse(response.body)
      data = json['data']['updateBook']

      expect(data['status']).to eq('finished')
    end

    it 'deletes an existing book' do
      book = Book.create(title: "Eloquent Ruby", author: "Russ Olsen", status: "to_read", rating: 3)

      post '/graphql', params: { query: delete_mutation(book.id) }
      json = JSON.parse(response.body)

      expect(Book.count).to eq(0)
    end
  end

  def create_mutation
    <<~GQL
      mutation {
        createBook(title: "Refactoring", author: "Martin Fowler", status: "to_read", rating: 5) {
          id
          title
          author
          status
          rating
        }
      }
    GQL
  end

  def update_mutation(id)
    <<~GQL
      mutation {
        updateBook(id: "#{id}", status: "finished") {
          id
          status
        }
      }
    GQL
  end

  def delete_mutation(id)
    <<~GQL
      mutation {
        deleteBook(id: "#{id}")
      }
    GQL
  end
end
