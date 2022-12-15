import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from 'routes/privateRoute';
import { routes } from 'routes/index';
import { Route as RouteModel } from 'models/common';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {routes &&
            routes.map((route: RouteModel, index: number) => (
              <Route
                path={route.path}
                key={index}
                element={
                  <>
                    {route.isPrivate ? (
                      <PrivateRoute>
                        <route.element />
                      </PrivateRoute>
                    ) : (
                      <route.element />
                    )}
                  </>
                }
              />
            ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
