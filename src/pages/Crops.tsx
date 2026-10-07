import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedText } from '../utils/i18n';
import cropsData from '../data/crops.json';
import { Leaf } from 'lucide-react';

export const Crops = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Leaf className="text-primary" /> {t('nav.crops')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Select a crop to view detailed agronomic information.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cropsData.map(crop => (
          <Link key={crop.id} to={`/crops/${crop.id}`} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 transition-all overflow-hidden flex flex-col">
            <div className="h-40 bg-green-50 dark:bg-green-900/10 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
              <span className="text-6xl">🌱</span>
            </div>
            <div className="p-5 flex-grow flex flex-col">
              <h2 className="text-xl font-bold mb-1">{getLocalizedText(crop.name, lang)}</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium uppercase tracking-wider">
                {getLocalizedText(crop.season, lang)}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-4 flex-grow">
                {getLocalizedText(crop.soilType, lang)}
              </p>
              <div className="text-primary font-semibold mt-auto flex items-center">
                {t('common.viewDetails')} &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
