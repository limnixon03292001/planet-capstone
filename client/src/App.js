import { Routes, Route } from 'react-router-dom';


import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';

// primary text  - black
// secondary - #536471
//button - #3DDAB4

function App() {
  return (
    <div className="font-interFont h-full w-full">
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Home/>}/>
      </Routes>

    </div>
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