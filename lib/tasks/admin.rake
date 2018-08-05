# frozen_string_literal: true

desc 'Ensure the user with Administration privelges exists'
namespace :admin do
  task ensure_admin_user: :environment do
    credentials = Rails.application.credentials.admin_user

    exit('No credentials found!') unless credentials

    admin_user = User.find_by(email: credentials[:email])

    if admin_user
      admin_user.update(admin: true)
    else
      admin_user = User.create(email: credentials[:email], password: credentials[:password], admin: true)
    end

    puts "Admin user: #{admin_user.email} updated to admin status: #{admin_user.admin}"
  end
end
