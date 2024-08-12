import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Main from './pages/main/Main.tsx';
import UncontrolledForm from './pages/uncontrolledForm/UncontrolledForm.tsx';
import HookForm from './pages/hookForm/HookForm.tsx';
import './App.css';

function App() {
  return (
    <div className='app-container'>
      <Router>
        <nav>
          <ul>
            <li>
              <NavLink to='/' className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
                Main
              </NavLink>
            </li>
            <li>
              <NavLink to='/uncontrolled-form' className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
                Uncontrolled Form
              </NavLink>
            </li>
            <li>
              <NavLink to='/hook-form' className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
                Hook Form
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/uncontrolled-form' element={<UncontrolledForm />} />
          <Route path='/hook-form' element={<HookForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
