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
    Friendship.destroy_all
    ServerMembership.destroy_all
    Message.destroy_all
    Channel.destroy_all
    Server.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('servers')
    ApplicationRecord.connection.reset_pk_sequence!('channels')
    ApplicationRecord.connection.reset_pk_sequence!('messages')
    ApplicationRecord.connection.reset_pk_sequence!('server_memberships')
    ApplicationRecord.connection.reset_pk_sequence!('friendships')




  
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

    User.create!(
      username: 'Demo4.0', 
      email: 'demo4@user.io', 
      password: 'password',
      status: 'Online',
      user_tag: "4444"
    )

    User.create!(
      username: 'Demo5.0', 
      email: 'demo5@user.io', 
      password: 'password',
      status: 'Online',
      user_tag: "5555"
    )

    User.create!(
      username: 'Demo6.0', 
      email: 'demo6@user.io', 
      password: 'password',
      status: 'Online',
      user_tag: "6666"
    )

    User.create!(
      username: 'Alex',
      email: 'alex@alex.com',
      password: 'password',
      status: 'Online',
      user_tag: '7777'
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

    ServerMembership.create!(
      user_id: 3,
      server_id: 1
    )

    ServerMembership.create!(
      user_id: 3,
      server_id: 2
    )

    ServerMembership.create!(
      user_id: 4,
      server_id: 1
    )

    puts "Creating friendships..."

    # Friendship.create!(
    #   user_id: 1,
    #   friend_id: 2,
    #   status: "Accepted"
    # )

    # Friendship.create!(
    #   user_id: 1,
    #   friend_id: 3,
    #   status: "Pending"
    # )

    # Friendship.create!(
    #   user_id: 1,
    #   friend_id: 4,
    #   status: "Blocked"
    # )

    # Friendship.create!(
    #   user_id: 1,
    #   friend_id: 5,
    #   status: "Accepted"
    # )

    # Friendship.create!(
    #   user_id: 1,
    #   friend_id: 6,
    #   status: "Pending"
    # )

    
  
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
