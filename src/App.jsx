import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/errors" element={<Errors />} />
      <Route path="/bloatware" element={<Bloatware />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/hardware" element={<Hardware />} />
      <Route path="/contribute" element={<Contribute />} />
      <Route path="/compatibility" element={<Compatibility />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}