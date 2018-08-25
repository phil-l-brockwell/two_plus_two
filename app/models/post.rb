# frozen_string_literal: true

class Post < ApplicationRecord
  validates :title, presence: true
  validates :subtitle, presence: true
  validates :text, presence: true

  has_one_attached :hero_image

  def as_json(_options = {})
    {
      id: id,
      title: title,
      subtitle: subtitle,
      text: text,
      created_at: created_at,
      hero_image: hero_image_url
    }.compact
  end

  def to_json(*options)
    as_json(*options).to_json(*options)
  end

  def hero_image_url
    return unless hero_image.attached?
    Rails.application.routes.url_helpers.rails_blob_path(hero_image, only_path: true)
  end
end
