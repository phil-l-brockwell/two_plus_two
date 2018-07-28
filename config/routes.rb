# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    resources :posts, only: %i[index create destroy]
  end
end
