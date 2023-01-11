import './App.css';
import {Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Users from './pages/Users';
import Main from './layouts/Main';

function App() {
  return (
    <Main>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/users' element={<Users/>}/>
      </Routes>
    </Main>
  );
}

export default App;
