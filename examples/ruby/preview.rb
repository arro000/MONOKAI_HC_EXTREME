# frozen_string_literal: true

require "json"

module ThemePreview
  # @param name [String] the display name
  # @return [String] a formatted greeting
  class Greeter
    DEFAULT_ROLE = :guest

    attr_reader :name

    def initialize(name, role: DEFAULT_ROLE)
      @name = name
      @role = role
    end

    def greeting(prefix = "Hello", **options, &formatter)
      message = "#{prefix}, #{@name.upcase}!"
      formatter ? formatter.call(message) : message
    end

    def self.from_json(payload)
      data = JSON.parse(payload, symbolize_names: true)
      new(data.fetch(:name), role: data.fetch(:role, DEFAULT_ROLE))
    end
  end

  names = %w[Ada Grace Linus]
  greeters = names.map { |name| Greeter.new(name, role: :admin) }
  selected = greeters.filter { |greeter| greeter.name.match?(/\A[A-Z]\w+\z/) }
  selected.each do |greeter|
    puts greeter.greeting { |message| "[#{message}]" }
  end

  settings = { enabled: true, retries: 3, label: "Monokai" }
  pattern = %r{(?<name>\w+):\s*#{settings[:retries]}}i
  report = <<~TEXT
    Theme: #{settings[:label]}
    Selected: #{selected.length}
  TEXT

  puts report
  puts pattern.source
end
