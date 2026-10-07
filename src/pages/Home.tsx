import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Stethoscope, Droplets, Landmark, BookOpen, PhoneCall } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedText } from '../utils/i18n';
import cropsData from '../data/crops.json';

export const Home = () => {
  const { lang, t } = useLanguage();
  const featuredCrops = cropsData.slice(0, 4); // First 4 crops

  const quickActions = [
    { icon: <Leaf className="w-8 h-8 text-green-600" />, title: t('nav.crops'), path: '/crops' },
    { icon: <Stethoscope className="w-8 h-8 text-red-500" />, title: t('nav.diseaseGuide'), path: '/disease-guide' },
    { icon: <Droplets className="w-8 h-8 text-blue-500" />, title: t('nav.fertilizerGuide'), path: '/fertilizer-guide' },
    { icon: <Landmark className="w-8 h-8 text-purple-600" />, title: t('nav.schemes'), path: '/schemes' },
    { icon: <BookOpen className="w-8 h-8 text-amber-600" />, title: t('nav.tips'), path: '/tips' },
  ];

  return (
    <div>
      {/* Sticky Helpline */}
      <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-100 p-2 text-center sticky top-16 z-30 font-medium border-b border-amber-200 dark:border-amber-800 shadow-sm flex items-center justify-center gap-2">
        <PhoneCall className="w-4 h-4 animate-pulse" />
        {t('common.helpline')}: <a href="tel:18001801551" className="font-bold hover:underline touch-target inline-flex items-center">1800-180-1551</a>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-primary/10 to-transparent pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            {t('home.heroTitle')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('home.heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/disease-guide" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all touch-target inline-flex justify-center items-center">
              <Stethoscope className="w-5 h-5 mr-2" /> {t('home.diagnose')}
            </Link>
            <Link to="/schemes" className="bg-white dark:bg-gray-800 text-primary border border-primary px-8 py-3 rounded-lg font-bold text-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all touch-target inline-flex justify-center items-center">
              <Landmark className="w-5 h-5 mr-2" /> {t('home.viewSchemes')}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          {t('home.quickActions')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
          {quickActions.map((action, i) => (
            <Link key={i} to={action.path} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all group flex flex-col items-center justify-center gap-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-full group-hover:scale-110 transition-transform">
                {action.icon}
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-200">{action.title}</span>
            </Link>
          ))}
        </div>

        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold">{t('home.featuredCrops')}</h2>
          <Link to="/crops" className="text-primary hover:underline font-medium p-2 touch-target">
             {t('nav.crops')} &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCrops.map(crop => (
             <Link key={crop.id} to={`/crops/${crop.id}`} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all">
                <div className="h-32 bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <span className="text-5xl">🌾</span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{getLocalizedText(crop.name, lang)}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {getLocalizedText(crop.soilType, lang)}
                  </div>
                  <span className="text-primary font-medium">{t('common.viewDetails')} &rarr;</span>
                </div>
             </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
