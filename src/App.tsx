import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './hooks/useLanguage';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Crops } from './pages/Crops';
import { CropDetail } from './pages/CropDetail';
import { DiseaseGuide } from './pages/DiseaseGuide';
import { FertilizerGuide } from './pages/FertilizerGuide';
import { Schemes } from './pages/Schemes';
import { Tips } from './pages/Tips';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crops" element={<Crops />} />
            <Route path="/crops/:id" element={<CropDetail />} />
            <Route path="/disease-guide" element={<DiseaseGuide />} />
            <Route path="/fertilizer-guide" element={<FertilizerGuide />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;
