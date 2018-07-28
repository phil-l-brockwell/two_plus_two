# frozen_string_literal: true

require 'rails_helper'

describe Post, type: :model do
  describe 'validations' do
    it 'is invalid without a title' do
      post = FactoryBot.build(:post, title: nil)

      expect(post).not_to be_valid
      expect(post.errors[:title]).to include('can\'t be blank')
    end

    it 'is invalid without a subtitle' do
      post = FactoryBot.build(:post, subtitle: nil)

      expect(post).not_to be_valid
      expect(post.errors[:subtitle]).to include('can\'t be blank')
    end

    it 'is invalid without text' do
      post = FactoryBot.build(:post, text: nil)

      expect(post).not_to be_valid
      expect(post.errors[:text]).to include('can\'t be blank')
    end
  end
end
