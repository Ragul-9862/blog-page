import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Signup from './Frontend/Signup/Signup';
import Login from './Frontend/Login/Login';
import Uploadimage from './Frontend/Uploadimage/Uploadimage';
import Home from './Pages/Home';
import Posts from './components/Posts/Posts';
import Context from './components/Context/Context';
import Update from './Frontend/Update/Update';

import Side from './components/Sidebar/Sidebar';
function App() {
  return (
    <div>
     <BrowserRouter>
     <Context>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/upload" element={<Uploadimage/>}/>
      <Route path="/posts" element={<Posts/>}/>
      <Route path="/update/:imageId" component={Update} />
      <Route path="/side" element={<Side/>} />

     </Routes>
     </Context>
     </BrowserRouter>
      </div>
  );
}

export default App;
