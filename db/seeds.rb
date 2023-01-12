# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    ServerMembership.destroy_all
    Message.destroy_all
    Channel.destroy_all
    Server.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      username: 'Demo', 
      email: 'demo@user.io', 
      password: 'password',
      status: 'Online',
      user_tag: "1111"
    )

    User.create!(
      username: 'Demo2.0', 
      email: 'demo2@user.io', 
      password: 'password',
      status: 'Online',
      user_tag: "2222"
    )

    User.create!(
      username: 'Demo3.0', 
      email: 'demo3@user.io', 
      password: 'password',
      status: 'Online',
      user_tag: "3333"
    )



    puts "Creating servers..."

    Server.create!(
      owner_id: 1,
      name: "test server 1",
      is_public: true,
      invite_key: "12345"
    )

    Server.create!(
      owner_id: 2,
      name: "test server 2",
      is_public: true,
      invite_key: "56789"
    )

    puts "Creating channels..."

    Channel.create!(
      server_id: 1,
      name: "general",
      is_public: true
    )

    Channel.create!(
      server_id: 1,
      name: "test-channel-1",
      is_public: true
    )

    Channel.create!(
      server_id: 2,
      name: "general",
      is_public: true
    )

    Channel.create!(
      server_id: 2,
      name: "test-channel-2",
      is_public: true
    )

    puts "Creating server membership..."
    ServerMembership.create!(
      user_id: 1,
      server_id: 1
    )

    ServerMembership.create!(
      user_id: 1,
      server_id: 2
    )

    ServerMembership.create!(
      user_id: 2,
      server_id: 1
    )

    ServerMembership.create!(
      user_id: 2,
      server_id: 2
    )
  
    # More users
    # 10.times do 
    #   User.create!({
    #     username: Faker::Internet.unique.username(specifier: 3),
    #     email: Faker::Internet.unique.email,
    #     password: 'password'
    #   }) 
    # end
  
    puts "Done!"
  end
