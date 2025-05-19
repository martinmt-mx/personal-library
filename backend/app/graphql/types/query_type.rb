# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    field :books, [Types::BookType], null: false, description: "List all books with pagination and filtering" do
      argument :limit, Integer, required: false, default_value: 5
      argument :offset, Integer, required: false, default_value: 0
      argument :status, String, required: false
    end

    def books(limit:, offset:, status: nil)
      if status
        Book.where(status: status).limit(limit).offset(offset)
      else
        Book.limit(limit).offset(offset)
      end
    end

    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end
  end
end
