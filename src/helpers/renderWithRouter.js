import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

// const renderWithRouter = (
//   component,
//   {
//     // initialState = {},
//     // store = createStore(rootReducer, initialState,applyMiddleware(thunk)),
//     initialEntries = ['/'],
//     history = createMemoryHistory({ initialEntries }),
//   } = {},
// ) => ({
//   ...render(
//     <Router history={ history }>
//       {/* <Provider store={ store }> */}
//       {component}
//       {/* </Provider> */}
//     </Router>,
//   ),
//   history,
//   // store,
// });
export default renderWithRouter;
