import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Errors from './pages/Errors';
import Bloatware from './pages/Bloatware';
import Scanner from './pages/Scanner';
import Contribute from './pages/Contribute';
import Dashboard from './pages/Dashboard';
import Hardware from './pages/Hardware';
import Compatibility from './pages/Compatibility';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/errors" element={<Errors />} />
        <Route path="/bloatware" element={<Bloatware />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hardware" element={<Hardware />} />
        <Route path="/compatibility" element={<Compatibility />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}