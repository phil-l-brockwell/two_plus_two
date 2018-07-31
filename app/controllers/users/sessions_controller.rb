# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message(:notice, :signed_in) if is_flashing_format?
    sign_in(resource_name, resource)
    yield resource if block_given?
    respond_with resource, location: after_sign_in_path_for(resource) do |format|
      format.json { render json: { resource_name => resource, authenticity_token: form_authenticity_token } }
    end
  end

  def respond_to_on_destroy
    respond_to do |format|
      format.json { render json: { authenticity_token: form_authenticity_token } }
      format.all { head :no_content }
      format.any(*navigational_formats) { redirect_to after_sign_out_path_for(resource_name) }
    end
  end
end
