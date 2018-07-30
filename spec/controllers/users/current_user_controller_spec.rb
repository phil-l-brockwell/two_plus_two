# frozen_string_literal: true

require 'rails_helper'

describe Users::CurrentUserController do
  include Devise::Test::ControllerHelpers

  let(:parsed_response) { (ActiveSupport::JSON.decode response.body).deep_symbolize_keys }

  context '#index' do
    before do
      stub_sign_in(user)
      get :index
    end

    context 'with a current_user' do
      let(:user) { User.create(email: email, password: 'password') }
      let(:email) { 'bob@test.com' }

      it 'the appropriate json' do
        expect(parsed_response[:user][:email]).to eq(email)
      end
    end

    context 'without a current_user' do
      let(:user) { nil }

      it 'the appropriate json' do
        expect(parsed_response[:user]).to eq(nil)
      end
    end
  end
end
