import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import renderWithProviders from "../../../test-utils/renderWithProviders";
import BookModal from "../BookModal";

const mockBook = {
  id: "1",
  title: "Clean Code",
  author: "Robert C. Martin",
  status: "to_read",
  rating: 5,
  notes: "This is a great book for software engineers.",
};

describe("BookModal Component", () => {
  it("renders the modal correctly with book information", () => {
    renderWithProviders(<BookModal />, {
      preloadedState: {
        books: {
          books: [],
          selectedBook: mockBook,
        },
      },
    });

    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Robert C. Martin")).toBeInTheDocument();
    expect(screen.getByText("to_read")).toBeInTheDocument();
    expect(screen.getByText("5 ⭐")).toBeInTheDocument();
    expect(
      screen.getByText("This is a great book for software engineers.")
    ).toBeInTheDocument();
  });

  it("closes the modal when the Close button is clicked", () => {
    const { container } = renderWithProviders(<BookModal />, {
      preloadedState: {
        books: {
          books: [],
          selectedBook: mockBook,
        },
      },
    });

    fireEvent.click(screen.getByText("Close"));

    expect(container.querySelector(".modal-overlay")).not.toBeInTheDocument();
  });

  it("does not render when no book is selected", () => {
    const { container } = renderWithProviders(<BookModal />, {
      preloadedState: {
        books: {
          books: [],
          selectedBook: null,
        },
      },
    });

    expect(container.firstChild).toBeNull();
  });
});
