import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import { MockedProvider } from "@apollo/client/testing"; // 🔄 Usamos MockedProvider en vez de ApolloProvider

const renderWithProviders = (ui: React.ReactElement, mocks: any[] = []) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>{ui}</Provider>
    </MockedProvider>
  );
};

export default renderWithProviders;
