import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedText } from '../utils/i18n';
import tipsData from '../data/tips.json';
import { BookOpen, CheckCircle } from 'lucide-react';

export const Tips = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <BookOpen className="text-primary w-10 h-10" /> {t('nav.tips')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Best practices for sustainable and profitable farming.
        </p>
      </div>

      <div className="space-y-6">
        {tipsData.map((tip, index) => (
          <div key={tip.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex gap-4">
             <div className="flex-shrink-0 mt-1">
               <CheckCircle className="w-6 h-6 text-primary" />
             </div>
             <div>
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {index + 1}. {getLocalizedText(tip.title, lang)}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {getLocalizedText(tip.description, lang)}
                </p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
