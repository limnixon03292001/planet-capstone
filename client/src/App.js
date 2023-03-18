import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Toaster } from 'react-hot-toast';

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoutes from './pages/ProtectedRoutes';
import MyMap from './pages/MyMap';
import Verify from './pages/Verify';
import Confirmation from './pages/Confirmation';
import AccountRecover from './pages/AccountRecover';
import ResetPassword from './pages/ResetPassword';
import Maintenance from './pages/Maintenance';
import Admin from './pages/Admin';
import Homepage from './pages/Homepage';

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
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/verification" element={<Verify/>}/>
          <Route path="/account-recovery" element={<AccountRecover/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
          <Route path="/confirmation/:token" element={<Confirmation/>}/>
          <Route path="/map-sample" element={<MyMap/>}/>
          
          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoutes path="/homepage" allowedRole={['0329', '29']}/>}>
            <Route path="/admin/*" element={<Admin/>}/>
          </Route>
          <Route element={<ProtectedRoutes path="/homepage" allowedRole={['2001']} />}>
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