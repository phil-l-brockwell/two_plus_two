# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions'
  }

  root to: 'pages#root'
  get '/app/*all', to: 'pages#root'
  get '/api/users/current_user', to: 'users/current_user#index'

  namespace :api do
    resources :posts, except: %i[new show]
  end
end
