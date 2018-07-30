# frozen_string_literal: true

class Users::CurrentUserController < ApplicationController
  def index
    render json: { user: current_user }.to_json
  end
end
