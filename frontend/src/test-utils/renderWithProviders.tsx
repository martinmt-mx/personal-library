import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MockedProvider } from "@apollo/client/testing";
import bookReducer from "../store/bookSlice";

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { books: bookReducer },
      preloadedState,
    }),
    mocks = [],
    ...renderOptions
  } = {}
) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>{ui}</Provider>
    </MockedProvider>,
    renderOptions
  );
};

export default renderWithProviders;
