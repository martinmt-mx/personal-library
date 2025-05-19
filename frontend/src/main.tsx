import { store } from './store';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloWrapper } from './apolloClient.tsx'
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ApolloWrapper>
      <App />
    </ApolloWrapper>
  </Provider>
)
