Rails.application.routes.draw do
  match "/graphql", to: "graphql#execute", via: [:post, :options]

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
