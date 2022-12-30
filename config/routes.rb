Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update]
    resource :session, only: [:create, :show, :destroy]
    
    resources :servers, only: [:index, :create, :update, :destroy, :show] do
      resources :channels, only: [:create, :index, :show, :destroy, :update] do 
        resources :messages, only: [:create, :index, :destroy]
      end
    end

    resources :messages, only: [:show, :update]
    resources :friendships, only: [:create, :destroy]
    resources :server_memberships, only: [:create, :destroy]
  end
end
