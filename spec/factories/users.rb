# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email 'user@fakeaccount.com'
    password 'this-is-secure'
  end
end
