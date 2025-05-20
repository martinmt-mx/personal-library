import React from "react";
import { screen, fireEvent, act } from "@testing-library/react";
import renderWithProviders from "../../../test-utils/renderWithProviders";
import BookColumn from "../BookColumn";
import { DELETE_BOOK, UPDATE_BOOK } from "../BookColumn";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const books = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    status: "to_read",
    rating: 5,
    notes: "Great book for clean architecture.",
  },
  {
    id: "2",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    status: "reading",
    rating: 4,
    notes: "Very useful tips.",
  },
];

const mocks = [
  {
    request: {
      query: UPDATE_BOOK,
      variables: {
        id: "1",
        status: "finished",
      },
    },
    result: {
      data: {
        updateBook: {
          id: "1",
          status: "finished",
        },
      },
    },
  },
  {
    request: {
      query: DELETE_BOOK,
      variables: {
        id: "1",
      },
    },
    result: {
      data: {
        deleteBook: true,
      },
    },
  },
];

describe("BookColumn Component", () => {
  it("renders books correctly", () => {
    renderWithProviders(<BookColumn title="To Read" books={books} />, mocks);

    expect(
      screen.getByText("Clean Code - Robert C. Martin")
    ).toBeInTheDocument();
    expect(
      screen.getByText("The Pragmatic Programmer - Andrew Hunt")
    ).toBeInTheDocument();
  });

  it("changes the status when the selector is updated", async () => {
    renderWithProviders(<BookColumn title="To Read" books={books} />, mocks);

    await act(async () => {
      fireEvent.change(screen.getAllByRole("combobox")[0], {
        target: { value: "finished" },
      });
    });

    await screen.findByText("Clean Code - Robert C. Martin");

    expect(toast.success).toHaveBeenCalledWith(
      `📚 Estado de "Clean Code" actualizado a finished`
    );
  });

  it("opens the modal when the title is clicked", async () => {
    renderWithProviders(<BookColumn title="To Read" books={books} />, mocks);

    await act(async () => {
      fireEvent.click(
        screen.getByText(
          (content, element) =>
            content.includes("Clean Code") && element?.tagName === "SPAN"
        )
      );
    });

    await screen.findByText((content) => content.includes("Clean Code"));
    await screen.findByText((content) => content.includes("Robert C. Martin"));

    expect(
      screen.getByText((content) => content.includes("Clean Code"))
    ).toBeInTheDocument();

    expect(
      screen.getByText((content) => content.includes("Robert C. Martin"))
    ).toBeInTheDocument();
  });
});
