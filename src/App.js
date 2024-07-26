import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import './assets/main.scss'
import Home from './components/Home';

const App = () => {
  return (
    <div>
      <Router>
        <MainLayout>
          <Routes>
            <Route exact path='/' element={<Home />} />
          </Routes>
        </MainLayout>
      </Router>
    </div>
  )
};

export default App