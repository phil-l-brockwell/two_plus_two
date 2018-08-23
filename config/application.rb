# frozen_string_literal: true

require_relative 'boot'

require 'rails'
require 'active_model/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'sprockets/railtie'

Bundler.require(*Rails.groups)

module TwoPlusTwo
  class Application < Rails::Application
    config.load_defaults 5.2
    config.generators.system_tests = nil

    config.to_prepare do
      DeviseController.respond_to :json
    end
  end
end
