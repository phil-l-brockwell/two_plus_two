# frozen_string_literal: true

require 'rails_helper'

describe Api::PostsController do
  include Devise::Test::ControllerHelpers

  let(:parsed_response) { (ActiveSupport::JSON.decode response.body).deep_symbolize_keys }
  let(:admin_user) { FactoryBot.create(:user, admin: true) }

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
    let(:post_params) { { title: 'Test', subtitle: 'Testing', text: 'Testing' } }

    context 'success' do
      before { stub_sign_in admin_user }

      it 'returns a success response' do
        expect do
          post :create, params: { post: post_params }
        end.to change { Post.count }.by(1)

        expect(response).to be_successful
        expect(parsed_response[:post]).to include(post_params)
      end
    end

    context 'error' do
      context 'with invalid params' do
        let(:post_params) { { title: 'Test', subtitle: 'Testing' } }

        before { stub_sign_in admin_user }

        it 'returns an error response' do
          expect do
            post :create, params: { post: post_params }
          end.not_to change { Post.count }

          expect(response).not_to be_successful
        end
      end

      context 'without a user signed in' do
        it 'returns a 401 response' do
          expect do
            post :create, params: {}
          end.not_to change { Post.count }

          expect(response).not_to be_successful
          expect(response.code).to eq('401')
        end
      end

      context 'with an non admin user signed in' do
        before { stub_sign_in }

        it 'returns a 401 response' do
          expect do
            post :create, params: { post: post_params }
          end.not_to change { Post.count }

          expect(response).not_to be_successful
          expect(response.code).to eq('401')
        end
      end
    end
  end

  describe '#update' do
    let(:post) { FactoryBot.create(:post) }
    let(:new_params) { { title: 'A new beginning', subtitle: 'This is it', text: '2+2' } }

    context 'success' do
      before { stub_sign_in admin_user }

      it 'returns a success response' do
        patch :update, params: { id: post.id, post: new_params }

        post.reload

        expect(response).to be_successful
        expect(post.title).to eq(new_params[:title])
        expect(post.subtitle).to eq(new_params[:subtitle])
        expect(post.text).to eq(new_params[:text])
      end
    end

    context 'error' do
      context 'with an invalid post id' do
        before { stub_sign_in admin_user }

        it 'returns a 422 response' do
          patch :update, params: { id: post.id + 1, post: new_params }

          expect(response).not_to be_successful
          expect(response.code).to eq('422')
        end
      end

      context 'without a user signed in' do
        it 'returns a 401 response' do
          patch :update, params: { id: post.id, post: new_params }

          expect(response).not_to be_successful
          expect(response.code).to eq('401')
        end
      end

      context 'with an non admin user signed in' do
        before { stub_sign_in }

        it 'returns a 401 response' do
          patch :update, params: { id: post.id, post: new_params }

          expect(response).not_to be_successful
          expect(response.code).to eq('401')
        end
      end
    end
  end

  describe '#destroy' do
    let!(:post) { FactoryBot.create(:post) }

    context 'success' do
      before { stub_sign_in admin_user }

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
        before { stub_sign_in admin_user }

        it 'returns a 422 response' do
          expect do
            delete :destroy, params: { id: post.id + 1 }
          end.not_to change { Post.count }

          expect(response).not_to be_successful
          expect(response.code).to eq('422')
        end
      end

      context 'without a user signed in' do
        it 'returns a 401 response' do
          expect do
            delete :destroy, params: { id: post.id }
          end.not_to change { Post.count }

          expect(response).not_to be_successful
          expect(response.code).to eq('401')
        end
      end

      context 'without an admin user signed in' do
        before { stub_sign_in }

        it 'returns a 401 response' do
          expect do
            delete :destroy, params: { id: post.id }
          end.not_to change { Post.count }

          expect(response).not_to be_successful
          expect(response.code).to eq('401')
        end
      end
    end
  end
end
