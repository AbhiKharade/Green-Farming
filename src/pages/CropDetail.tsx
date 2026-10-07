import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedText } from '../utils/i18n';
import cropsData from '../data/crops.json';
import { ArrowLeft, Droplets, Sun, Scissors, Layers } from 'lucide-react';

export const CropDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  
  const crop = cropsData.find(c => c.id === id);

  if (!crop) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Crop not found</h2>
        <Link to="/crops" className="text-primary hover:underline font-medium inline-flex items-center touch-target p-2">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Crops
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/crops" className="text-primary hover:underline font-medium inline-flex items-center mb-6 touch-target p-2 -ml-2">
        <ArrowLeft className="w-4 h-4 mr-1" /> {t('common.back')}
      </Link>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
        <div className="bg-primary/10 p-8 flex items-center justify-between">
           <div>
             <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
               {getLocalizedText(crop.name, lang)}
             </h1>
             <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full">
               {getLocalizedText(crop.season, lang)}
             </span>
           </div>
           <span className="text-7xl">🌾</span>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
             <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg flex-shrink-0 self-start">
               <Layers className="w-6 h-6 text-amber-600 dark:text-amber-400" />
             </div>
             <div>
               <h3 className="font-bold text-lg mb-1">{t('crops.soil')}</h3>
               <p className="text-gray-700 dark:text-gray-300">{getLocalizedText(crop.soilType, lang)}</p>
             </div>
          </div>
          
          <div className="flex gap-4">
             <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg flex-shrink-0 self-start">
               <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
             </div>
             <div>
               <h3 className="font-bold text-lg mb-1">{t('crops.irrigation')}</h3>
               <p className="text-gray-700 dark:text-gray-300">{getLocalizedText(crop.irrigationNotes, lang)}</p>
             </div>
          </div>
          
          <div className="flex gap-4 md:col-span-2">
             <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg flex-shrink-0 self-start">
               <Scissors className="w-6 h-6 text-green-600 dark:text-green-400" />
             </div>
             <div>
               <h3 className="font-bold text-lg mb-1">{t('crops.harvest')}</h3>
               <p className="text-gray-700 dark:text-gray-300">{getLocalizedText(crop.harvestingTips, lang)}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
