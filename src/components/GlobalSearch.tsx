import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import cropsData from '../data/crops.json';
import diseasesData from '../data/diseases.json';
import schemesData from '../data/schemes.json';
import { getLocalizedText } from '../utils/i18n';

export const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 1) {
      const q = val.toLowerCase();
      
      const cropRes = cropsData.filter(c => getLocalizedText(c.name, lang).toLowerCase().includes(q))
        .map(c => ({ type: 'crop', id: c.id, label: getLocalizedText(c.name, lang), url: `/crops/${c.id}` }));
      
      const diseaseRes = diseasesData.filter(d => getLocalizedText(d.name, lang).toLowerCase().includes(q))
        .map(d => ({ type: 'disease', id: d.id, label: getLocalizedText(d.name, lang), url: `/disease-guide` }));
        
      const schemeRes = schemesData.filter(s => getLocalizedText(s.name, lang).toLowerCase().includes(q))
        .map(s => ({ type: 'scheme', id: s.id, label: getLocalizedText(s.name, lang), url: `/schemes` }));

      setResults([...cropRes, ...diseaseRes, ...schemeRes].slice(0, 5));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleClick = (url: string) => {
    navigate(url);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder={t('nav.search')}
          className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64 touch-target"
        />
      </div>
      {isOpen && query.trim().length > 1 && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
          {results.length > 0 ? (
            <ul>
              {results.map((r, i) => (
                <li 
                  key={i} 
                  onClick={() => handleClick(r.url)}
                  className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm border-b last:border-0 border-gray-100 dark:border-gray-700 flex justify-between items-center"
                >
                  <span>{r.label}</span>
                  <span className="text-xs text-gray-500 capitalize px-2 py-1 bg-gray-100 dark:bg-gray-900 rounded">{r.type}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-sm text-gray-500">{t('common.noResults')}</div>
          )}
        </div>
      )}
    </div>
  );
};
