# frozen_string_literal: true

require 'rails_helper'

describe Users::SessionsController, type: :controller do
  include Devise::Test::ControllerHelpers

  let(:parsed_response) { (ActiveSupport::JSON.decode response.body).deep_symbolize_keys }
  let!(:user) { User.create(email: 'an-email@fake.com', password: 'password') }
  let!(:original_authenticity_token) { controller.send(:form_authenticity_token) }
  let(:new_authenticity_token) { 'new_authenticity_token' }

  let(:email) { user.email }
  let(:password) { 'password' }
  let(:sign_in_params) do
    {
      user: {
        email: email,
        password: password
      },
      format: :json
    }
  end

  before { @request.env['devise.mapping'] = Devise.mappings[:user] }

  describe '#create' do
    before do
      allow(controller).to receive(:form_authenticity_token).and_return(new_authenticity_token)
      post :create, params: sign_in_params
    end

    context 'success' do
      it 'returns a success response' do
        expect(response).to be_successful
        expect(parsed_response[:user][:email]).to eq(email)
      end

      it 'returns a new authenticity_token' do
        expect(parsed_response[:authenticity_token]).not_to eq(original_authenticity_token)
        expect(parsed_response[:authenticity_token]).to eq(new_authenticity_token)
      end
    end

    context 'error' do
      let(:email) { 'no@user.com' }
      let(:password) { 'password' }

      context 'with a non existent username' do
        it 'returns an error response' do
          expect(response).not_to be_successful
          expect(parsed_response[:error]).to eq('Invalid Email or password.')
        end
      end

      context 'with an incorrect password' do
        let(:email) { user.email }
        let(:password) { 'wrong-password' }

        it 'retuns an error response' do
          expect(response).not_to be_successful
          expect(parsed_response[:error]).to eq('Invalid Email or password.')
        end
      end
    end
  end

  describe '#destroy' do
    context 'success' do
      before do
        post :create, params: sign_in_params
        allow(controller).to receive(:form_authenticity_token).and_return(new_authenticity_token)
        post :destroy
      end

      it 'returns a success response' do
        expect(response).to be_successful
      end

      it 'returns a new authenticity_token' do
        expect(parsed_response[:authenticity_token]).not_to eq(original_authenticity_token)
        expect(parsed_response[:authenticity_token]).to eq(new_authenticity_token)
      end
    end

    context 'error' do
      context 'when not signed in' do
        before { post :destroy }

        it 'returns an error response' do
          expect(response).not_to be_successful
        end
      end
    end
  end
end
