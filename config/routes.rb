# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#root'
  get '/posts', to: 'pages#root'

  namespace :api do
    resources :posts, only: %i[index create destroy]
    get '/current_user', to: 'current_user#index'
  end
end
