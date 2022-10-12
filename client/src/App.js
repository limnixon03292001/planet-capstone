import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Toaster } from 'react-hot-toast';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoutes from './pages/ProtectedRoutes';
import MyMap from './pages/MyMap';

// primary text  - black
// secondary - #536471
//button - #3DDAB4

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-interFont tracking-normal antialiased text-gray-900 h-full w-full">
        <Toaster position='top-left'/>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/map-sample" element={<MyMap/>}/>
          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoutes path="/login"/>}>
            <Route path="/*" element={<Home/>}/>
          </Route>

          {/* PROTECTED ROUTES */}

          {/* 404 PAGE  */}

          <Route path="*" element={<NotFound/>}/>

          {/* 404 PAGE  */}
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;

// eslint in package.json that cause an error

// "eslintConfig": {
//   "extends": [
//     "react-app",
//     "react-app/jest"
//   ]
// },