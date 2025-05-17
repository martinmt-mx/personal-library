class Book < ApplicationRecord
  # Enums
  enum :status, { to_read: 0, reading: 1, finished: 2 }

  # Validations
  validates :title, presence: true
  validates :author, presence: true
  validates :status, inclusion: { in: statuses.keys }
  validates :rating, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 5 }, allow_nil: true
end
