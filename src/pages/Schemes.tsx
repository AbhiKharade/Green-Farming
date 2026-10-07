import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedText } from '../utils/i18n';
import schemesData from '../data/schemes.json';
import { Landmark, ExternalLink, Calendar } from 'lucide-react';

export const Schemes = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Landmark className="text-primary w-10 h-10" /> {t('nav.schemes')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explore government schemes, subsidies, and initiatives designed to support farmers and boost agricultural productivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemesData.map(scheme => (
          <div key={scheme.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
            <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              {getLocalizedText(scheme.name, lang)}
            </h2>
            
            <div className="mb-4 flex-grow">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Purpose:</h3>
              <p className="text-gray-600 dark:text-gray-400">{getLocalizedText(scheme.purpose, lang)}</p>
            </div>
            
            <div className="mb-6 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Eligibility:</h3>
              <p className="text-gray-600 dark:text-gray-400">{getLocalizedText(scheme.eligibility, lang)}</p>
            </div>
            
            <div className="mt-auto flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
               <div className="flex items-center text-xs text-gray-500">
                 <Calendar className="w-4 h-4 mr-1" /> Last checked: {scheme.lastChecked}
               </div>
               <a 
                 href={scheme.link} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center justify-center bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-bold transition-colors w-full sm:w-auto touch-target"
               >
                 Official Website <ExternalLink className="w-4 h-4 ml-2" />
               </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
