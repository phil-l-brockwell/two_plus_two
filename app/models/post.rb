# frozen_string_literal: true

class Post < ApplicationRecord
  validates :title, presence: true
  validates :subtitle, presence: true
  validates :text, presence: true
end
