require 'rails_helper'

RSpec.describe 'GraphQL Queries', type: :request do
  describe 'Books Query' do
    let!(:book1) { Book.create(title: "The Pragmatic Programmer", author: "Andy Hunt", status: "to_read", rating: 5) }
    let!(:book2) { Book.create(title: "Clean Code", author: "Robert C. Martin", status: "reading", rating: 4) }

    it 'returns a list of books' do
      post '/graphql', params: { query: query }
      json = JSON.parse(response.body)
      data = json['data']['books']

      expect(data.length).to eq(2)
      expect(data[0]['title']).to eq('The Pragmatic Programmer')
      expect(data[1]['title']).to eq('Clean Code')
    end

    it 'searches books by title or author' do
      post '/graphql', params: { query: search_query("Pragmatic") }
      json = JSON.parse(response.body)
      data = json['data']['searchBooks']

      expect(data.length).to eq(1)
      expect(data[0]['title']).to eq('The Pragmatic Programmer')
    end
  end

  def query
    <<~GQL
      query {
        books(limit: 5, offset: 0) {
          id
          title
          author
          status
          rating
        }
      }
    GQL
  end

  def search_query(term)
    <<~GQL
      query {
        searchBooks(query: "#{term}") {
          id
          title
          author
          status
          rating
        }
      }
    GQL
  end
end
