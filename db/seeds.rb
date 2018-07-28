# frozen_string_literal: true

Post.delete_all

example_text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

Post.create!(
  [
    {
      title: 'The last day on earth',
      subtitle: 'This is it',
      text: example_text
    },
    {
      title: 'Judgement day',
      subtitle: 'The end',
      text: example_text
    },
    {
      title: 'The first day of the rest of your life',
      subtitle: 'The beginning',
      text: example_text
    },
    {
      title: 'Genesis',
      subtitle: 'Its here',
      text: example_text
    }
  ]
)

puts 'Posts seeded'
