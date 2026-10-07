import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedText } from '../utils/i18n';
import cropsData from '../data/crops.json';
import diseasesData from '../data/diseases.json';
import { Leaf, Bug, AlertTriangle, ShieldCheck, Sprout, Building, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

export const DiseaseGuide = () => {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedCropId, setSelectedCropId] = useState<string | null>(null);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string | null>(null);

  const selectedCrop = cropsData.find(c => c.id === selectedCropId);
  const cropDiseases = diseasesData.filter(d => d.cropId === selectedCropId);
  const selectedDisease = diseasesData.find(d => d.id === selectedDiseaseId);

  const handleNext = () => setStep(s => Math.min(s + 1, 6));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));
  const handleStartOver = () => {
    setStep(1);
    setSelectedCropId(null);
    setSelectedDiseaseId(null);
  };

  const StepProgress = () => (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {[1, 2, 3, 4, 5, 6].map(s => (
          <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
            {s}
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full w-full overflow-hidden">
        <div className="h-full bg-primary stepper-progress" style={{ width: `${((step - 1) / 5) * 100}%` }}></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <StethoscopeIcon className="w-8 h-8 text-primary" />
        {t('nav.diseaseGuide')}
      </h1>
      
      <StepProgress />

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 min-h-[400px] flex flex-col">
        
        {step === 1 && (
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Leaf /> Step 1: Select Crop</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {cropsData.map(crop => (
                <button
                  key={crop.id}
                  onClick={() => { setSelectedCropId(crop.id); setStep(2); }}
                  className={`p-4 rounded-xl border-2 text-center transition-all touch-target ${selectedCropId === crop.id ? 'border-primary bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
                >
                  <div className="text-4xl mb-2">🌱</div>
                  <div className="font-semibold">{getLocalizedText(crop.name, lang)}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Bug /> Step 2: Select Symptom/Disease for {getLocalizedText(selectedCrop?.name, lang)}
            </h2>
            {cropDiseases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cropDiseases.map(disease => (
                  <button
                    key={disease.id}
                    onClick={() => { setSelectedDiseaseId(disease.id); setStep(3); }}
                    className={`p-4 rounded-xl border-2 text-left transition-all touch-target ${selectedDiseaseId === disease.id ? 'border-primary bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
                  >
                    <div className="font-bold text-lg mb-1">{getLocalizedText(disease.name, lang)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{getLocalizedText(disease.symptoms, lang)}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No diseases found for this crop in our database.
              </div>
            )}
          </div>
        )}

        {step === 3 && selectedDisease && (
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="text-amber-500" /> Step 3: Symptoms & Causes
            </h2>
            <div className="space-y-6">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-100 dark:border-red-900/30">
                <h3 className="font-bold text-red-800 dark:text-red-400 mb-2 text-lg">Symptoms</h3>
                <p className="text-gray-800 dark:text-gray-200 text-lg">{getLocalizedText(selectedDisease.symptoms, lang)}</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-100 dark:border-amber-900/30">
                <h3 className="font-bold text-amber-800 dark:text-amber-400 mb-2 text-lg">Causes</h3>
                <p className="text-gray-800 dark:text-gray-200 text-lg">{getLocalizedText(selectedDisease.causes, lang)}</p>
              </div>
            </div>
          </div>
        )}

        {step === 4 && selectedDisease && (
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="text-green-500" /> Step 4: Prevention & IPM
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-900/30">
               <h3 className="font-bold text-green-800 dark:text-green-400 mb-4 text-lg">Recommended Practices</h3>
               <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">{getLocalizedText(selectedDisease.prevention, lang)}</p>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Sprout className="text-primary" /> Step 5: Nutrient Guidance
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-900/30 mb-6">
               <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-2 text-lg">Balanced Nutrition</h3>
               <p className="text-gray-800 dark:text-gray-200">Maintain proper N-P-K balance. Excess Nitrogen can make plants succulent and more susceptible to pests and diseases. Ensure adequate Potassium to improve disease resistance.</p>
            </div>
            
            <div className="bg-red-100 dark:bg-red-900/40 p-6 rounded-xl border-2 border-red-500">
               <div className="flex items-start gap-4">
                 <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                 <div>
                   <h3 className="font-black text-red-800 dark:text-red-300 text-xl mb-2">IMPORTANT NOTICE</h3>
                   <p className="text-red-900 dark:text-red-200 font-bold text-lg">FERTILIZER IS NOT A DISEASE CURE.</p>
                   <p className="text-red-800 dark:text-red-200 mt-2">Applying chemical fertilizers will not treat fungal, bacterial, or viral infections. Do not use them as pesticides.</p>
                 </div>
               </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Building className="text-purple-500" /> Step 6: Next Steps & Referrals
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><PhoneCall className="w-5 h-5" /> Expert Help</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Contact your local Krishi Vigyan Kendra (KVK) or State Agricultural University for exact chemical recommendations and dosages.</p>
                <a href="tel:18001801551" className="block w-full text-center bg-primary hover:bg-primary-hover text-white py-3 rounded-lg font-bold touch-target">Call Kisan Call Centre</a>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-900/50 p-6 rounded-xl">
                <h3 className="font-bold text-amber-800 dark:text-amber-400 text-lg mb-3 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Safety First (PPE)</h3>
                <ul className="list-disc list-inside text-gray-800 dark:text-gray-200 space-y-2">
                  <li>Always wear gloves and masks when handling agrochemicals.</li>
                  <li>Read the product label carefully.</li>
                  <li>Wash hands thoroughly with soap after application.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          {step > 1 && step < 6 ? (
            <button onClick={handlePrev} className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 touch-target">
              <ArrowLeft className="w-5 h-5" /> {t('common.back')}
            </button>
          ) : <div></div>}
          
          {step > 1 && step < 6 ? (
            <button onClick={handleNext} disabled={step === 2 && !selectedDiseaseId} className="px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-bold flex items-center gap-2 disabled:opacity-50 touch-target">
              {t('common.next')} <ArrowRight className="w-5 h-5" />
            </button>
          ) : step === 6 ? (
            <button onClick={handleStartOver} className="px-6 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 text-white rounded-lg font-bold flex items-center gap-2 touch-target">
              <RotateCcw className="w-5 h-5" /> {t('common.startOver')}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const StethoscopeIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></svg>
);
