Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :destroy]
    resource :session, only: [:create, :show, :destroy]
    
    resources :servers, only: [:index, :create, :update, :destroy, :show] do
      resources :channels, only: [:create, :index, :destroy, :update] do 
        resources :messages, only: [:index, :destroy, :update]
      end
      resources :users, only: [:index]
    end
    
    resources :channels, only: [:show] do
      resources :messages, only: [:create]
    end
    resources :messages, only: [:show]
    resources :friendships, only: [:create, :destroy, :update, :index]
    resources :server_memberships, only: [:create, :destroy]

    
    get "/public_servers", to: "servers#public_servers"
    
    get "/find_server/:invite_key", to: "servers#find_server"
    get '*path', to: 'static_pages#frontend'
  end
end
