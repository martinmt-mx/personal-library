import React from "react";
import { screen, fireEvent, act } from "@testing-library/react";
import renderWithProviders from "../../../test-utils/renderWithProviders";
import BookForm from "../BookForm";
import { CREATE_BOOK } from "../BookForm";

const mocks = [
  {
    request: {
      query: CREATE_BOOK,
      variables: {
        title: "New Book",
        author: "Author Name",
        status: "to_read",
        rating: 1,
        notes: "",
      },
    },
    result: {
      data: {
        createBook: {
          id: "1",
          title: "New Book",
          author: "Author Name",
          status: "to_read",
          rating: 1,
          notes: "",
        },
      },
    },
  },
];

describe("BookForm Component", () => {
  it("renders the form correctly", () => {
    renderWithProviders(<BookForm />, mocks);
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Author")).toBeInTheDocument();
  });

  it("submits the form with valid inputs", async () => {
    renderWithProviders(<BookForm />, mocks);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText("Title"), {
        target: { value: "New Book" },
      });
      fireEvent.change(screen.getByPlaceholderText("Author"), {
        target: { value: "Author Name" },
      });

      fireEvent.click(screen.getByText("Add Book"));

      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(screen.queryByText("Error")).not.toBeInTheDocument();
  });
});
