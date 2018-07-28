# frozen_string_literal: true

require 'rails_helper'

describe Api::PostsController do
  let(:parsed_response) { (ActiveSupport::JSON.decode response.body).deep_symbolize_keys }

  describe '#index' do
    context 'no posts' do
      before { get :index }

      it 'returns an empty array' do
        expect(response.content_type).to eq('application/json')
        expect(parsed_response[:posts]).to match_array([])
      end
    end

    context 'with posts' do
      let!(:post) { FactoryBot.create(:post) }
      let(:returned_post) { parsed_response[:posts].first }

      before { get :index }

      it 'returns the posts' do
        expect(response.content_type).to eq('application/json')
        expect(returned_post[:title]).to eq(post.title)
        expect(returned_post[:subtitle]).to eq(post.subtitle)
        expect(returned_post[:text]).to eq(post.text)
      end
    end
  end

  describe '#create' do
    context 'success' do
      let(:post_params) { { title: 'Test', subtitle: 'Testing', text: 'Testing' } }

      it 'returns a success response' do
        expect do
          post :create, params: { post: post_params }
        end.to change { Post.count }.by(1)

        expect(response).to be_successful
        expect(parsed_response[:post]).to include(post_params)
      end
    end

    context 'error' do
      let(:post_params) { { title: 'Test', subtitle: 'Testing' } }

      it 'returns an error response' do
        expect do
          post :create, params: { post: post_params }
        end.not_to change { Post.count }

        expect(response).not_to be_successful
        expect(parsed_response[:error][:text]).to include('can\'t be blank')
      end
    end
  end

  describe '#destroy' do
    let!(:post) { FactoryBot.create(:post) }

    context 'success' do
      it 'returns a success response' do
        expect do
          delete :destroy, params: { id: post.id }
        end.to change { Post.count }.by(-1)

        expect(response).to be_successful
        expect(parsed_response[:message]).to eq('Post successfully deleted!')
      end
    end

    context 'error' do
      context 'with an invalid id' do
        let(:invalid_id) { post.id + 1 }

        it 'returns an error response' do
          expect do
            delete :destroy, params: { id: invalid_id }
          end.not_to change { Post.count }

          expect(response).not_to be_successful
          expect(parsed_response[:error]).to eq("Post with id: #{invalid_id} not found!")
        end
      end
    end
  end
end
