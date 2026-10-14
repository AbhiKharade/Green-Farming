import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Droplets,
  Search,
  AlertTriangle,
  CheckCircle,
  ShieldAlert,
  Sprout,
  Calendar,
  X,
  Sparkles,
  Info
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { getLocalizedText } from '../utils/i18n';
import fertilizersData from '../data/fertilizers.json';

export const FertilizerGuide = () => {
  const { lang, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read crop from URL if provided (e.g. ?crop=tomato)
  const initialCropId = searchParams.get('crop') || 'tomato';
  const [selectedCropId, setSelectedCropId] = useState<string>(initialCropId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'disease' | 'schedule' | 'safety'>('disease');
  const [filterType, setFilterType] = useState<'all' | 'disease_defense' | 'deficiency'>('all');

  // Keep state synced with URL param if URL changes
  useEffect(() => {
    const cropFromUrl = searchParams.get('crop');
    if (cropFromUrl && cropFromUrl !== selectedCropId) {
      setSelectedCropId(cropFromUrl);
    }
  }, [searchParams]);

  // If user types a crop name (e.g. "onion", "tomato", "कांदा"), automatically select it
  useEffect(() => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.trim().toLowerCase();
    const exactMatch = fertilizersData.find(
      (c) =>
        c.cropId.toLowerCase() === q ||
        c.name.en.toLowerCase() === q ||
        c.name.mr.toLowerCase() === q
    );
    if (exactMatch && exactMatch.cropId !== selectedCropId) {
      setSelectedCropId(exactMatch.cropId);
      setSearchParams({ crop: exactMatch.cropId });
    }
  }, [searchQuery]);

  const handleSelectCrop = (cropId: string) => {
    setSelectedCropId(cropId);
    setSearchQuery('');
    setSearchParams({ crop: cropId });
  };

  // Find the selected crop in fertilizers dataset
  const currentFertilizerCrop = useMemo(() => {
    return fertilizersData.find((item) => item.cropId === selectedCropId) || fertilizersData[0];
  }, [selectedCropId]);

  // Matching crops if search query matches crop names
  const matchingCrops = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return fertilizersData.filter((crop) => {
      const nameEn = crop.name.en.toLowerCase();
      const nameMr = crop.name.mr.toLowerCase();
      const id = crop.cropId.toLowerCase();
      return nameEn.includes(q) || nameMr.includes(q) || id.includes(q);
    });
  }, [searchQuery]);

  // Filter diseases / conditions based on search query and category filter
  // If search query is entered, also search across all crops if no match in current crop
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    // If no search query, return current crop's conditions filtered by causeType
    if (!q) {
      let list = currentFertilizerCrop.diseaseConditions.map((c) => ({
        ...c,
        parentCrop: currentFertilizerCrop
      }));
      if (filterType !== 'all') {
        list = list.filter((item) => item.causeType === filterType);
      }
      return list;
    }

    // If query matches a crop name exactly and user selected it, show current crop conditions
    const isSearchingCurrentCropName =
      currentFertilizerCrop.name.en.toLowerCase().includes(q) ||
      currentFertilizerCrop.name.mr.toLowerCase().includes(q);

    // Search across ALL crops when query is given
    const allMatches: Array<any> = [];
    fertilizersData.forEach((crop) => {
      crop.diseaseConditions.forEach((condition) => {
        if (filterType !== 'all' && condition.causeType !== filterType) return;

        const titleEn = condition.title.en.toLowerCase();
        const titleMr = condition.title.mr.toLowerCase();
        const fertEn = condition.recommendedFertilizer.en.toLowerCase();
        const fertMr = condition.recommendedFertilizer.mr.toLowerCase();
        const sympEn = condition.symptoms.en.toLowerCase();
        const sympMr = condition.symptoms.mr.toLowerCase();
        const cropEn = crop.name.en.toLowerCase();
        const cropMr = crop.name.mr.toLowerCase();

        if (
          titleEn.includes(q) ||
          titleMr.includes(q) ||
          fertEn.includes(q) ||
          fertMr.includes(q) ||
          sympEn.includes(q) ||
          sympMr.includes(q) ||
          cropEn.includes(q) ||
          cropMr.includes(q)
        ) {
          allMatches.push({
            ...condition,
            parentCrop: crop
          });
        }
      });
    });

    // If matches were found across crops, sort so current crop appears first if relevant
    if (allMatches.length > 0) {
      return allMatches.sort((a, b) => {
        if (a.parentCrop.cropId === selectedCropId) return -1;
        if (b.parentCrop.cropId === selectedCropId) return 1;
        return 0;
      });
    }

    // Fallback: if only crop name matched and it has conditions
    if (isSearchingCurrentCropName) {
      return currentFertilizerCrop.diseaseConditions.map((c) => ({
        ...c,
        parentCrop: currentFertilizerCrop
      }));
    }

    return [];
  }, [currentFertilizerCrop, filterType, searchQuery, selectedCropId]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-950/40 rounded-full mb-3 text-primary shadow-sm">
          <Droplets className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          {t('fertilizer.title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('fertilizer.subtitle')}
        </p>
      </div>

      {/* Plant Search & Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-5 mb-8">
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('fertilizer.searchPlant')}
            className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* If user typed a plant name that matches crops, show quick jump chips */}
        {matchingCrops.length > 0 && searchQuery.trim() && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/40">
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-2">
              Matching Plant(s):
            </span>
            <div className="flex flex-wrap gap-2">
              {matchingCrops.map((c) => (
                <button
                  key={c.cropId}
                  onClick={() => handleSelectCrop(c.cropId)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-bold border shadow-sm transition-all flex items-center gap-1.5 ${
                    selectedCropId === c.cropId
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
                  }`}
                >
                  <span>{c.icon}</span>
                  <span>{getLocalizedText(c.name, lang)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Crop Selection Pill Bar */}
        <div>
          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-3">
            {t('fertilizer.selectPlant')}
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
            {fertilizersData.map((crop) => {
              const isSelected = selectedCropId === crop.cropId && !searchQuery.trim();
              return (
                <button
                  key={crop.cropId}
                  onClick={() => handleSelectCrop(crop.cropId)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-primary text-white border-primary shadow-md scale-105'
                      : 'bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xl">{crop.icon}</span>
                  <span>{getLocalizedText(crop.name, lang)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Crop Banner */}
      {currentFertilizerCrop && (
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl shadow-xl p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute right-4 bottom-2 text-8xl md:text-9xl opacity-20 select-none pointer-events-none">
            {currentFertilizerCrop.icon}
          </div>
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{currentFertilizerCrop.icon}</span>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  {getLocalizedText(currentFertilizerCrop.name, lang)}
                </h2>
                <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full inline-block mt-1">
                  {currentFertilizerCrop.cropId}
                </span>
              </div>
            </div>
            <p className="text-emerald-100 text-base md:text-lg mb-4 leading-relaxed">
              {getLocalizedText(currentFertilizerCrop.overview, lang)}
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-950/60 backdrop-blur-sm border border-emerald-400/30 px-4 py-2 rounded-xl text-sm font-medium">
              <Sprout className="w-4 h-4 text-emerald-300" />
              <span>
                <strong className="text-emerald-200">{t('fertilizer.npkStandard')}:</strong>{' '}
                {currentFertilizerCrop.npkRecommendation}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 mb-8 pb-1">
        <button
          onClick={() => setActiveTab('disease')}
          className={`pb-3 px-4 font-bold text-base flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'disease'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>{t('fertilizer.diseaseNutritionTab')}</span>
          <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 text-xs px-2 py-0.5 rounded-full font-extrabold">
            {searchResults.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`pb-3 px-4 font-bold text-base flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'schedule'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Calendar className="w-5 h-5 text-blue-500" />
          <span>{t('fertilizer.scheduleTab')}</span>
        </button>

        <button
          onClick={() => setActiveTab('safety')}
          className={`pb-3 px-4 font-bold text-base flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'safety'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <span>{t('fertilizer.safetyTab')}</span>
        </button>
      </div>

      {/* TAB 1: DISEASE & DEFICIENCY FERTILIZER REMEDIES */}
      {activeTab === 'disease' && (
        <div className="space-y-6">
          {/* Sub-filter chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Filter by Condition Type:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'all'
                    ? 'bg-gray-800 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                }`}
              >
                All Conditions
              </button>
              <button
                onClick={() => setFilterType('disease_defense')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'disease_defense'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                }`}
              >
                🛡️ Disease Defense
              </button>
              <button
                onClick={() => setFilterType('deficiency')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'deficiency'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                }`}
              >
                ⚡ Nutrient Deficiency
              </button>
            </div>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {searchResults.map((condition) => {
                const isDeficiency = condition.causeType === 'deficiency';
                const parentCrop = condition.parentCrop || currentFertilizerCrop;
                return (
                  <div
                    key={`${parentCrop.cropId}-${condition.id}`}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-primary/50 transition-all duration-200"
                  >
                    {/* Condition Header Bar */}
                    <div
                      className={`p-5 md:p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                        isDeficiency
                          ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30'
                          : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30'
                      }`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <button
                            onClick={() => handleSelectCrop(parentCrop.cropId)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-sm hover:border-primary transition-all text-gray-800 dark:text-gray-200"
                            title="Filter this crop"
                          >
                            <span>{parentCrop.icon}</span>
                            <span>{getLocalizedText(parentCrop.name, lang)}</span>
                          </button>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                              isDeficiency
                                ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200'
                                : 'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200'
                            }`}
                          >
                            {isDeficiency ? '⚡ Nutrient Deficiency' : '🛡️ Disease Defense & Recovery'}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white">
                          {getLocalizedText(condition.title, lang)}
                        </h3>
                      </div>
                    </div>

                    {/* Condition Details Body */}
                    <div className="p-6 space-y-5">
                      {/* Symptoms */}
                      <div className="flex items-start gap-3.5 bg-gray-50 dark:bg-gray-900/40 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                            {t('fertilizer.symptoms')}
                          </h4>
                          <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                            {getLocalizedText(condition.symptoms, lang)}
                          </p>
                        </div>
                      </div>

                      {/* Recommended Fertilizer Highlight Box */}
                      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 p-5 rounded-xl border-2 border-emerald-500/30 shadow-sm">
                        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs uppercase tracking-wider mb-2">
                          <Droplets className="w-4 h-4 text-emerald-600" />
                          <span>{t('fertilizer.recommendedFertilizer')}</span>
                        </div>
                        <p className="text-xl md:text-2xl font-black text-emerald-900 dark:text-emerald-100 mb-2">
                          {getLocalizedText(condition.recommendedFertilizer, lang)}
                        </p>
                        <div className="mt-3 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40">
                          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block mb-1">
                            {t('fertilizer.dosage')}
                          </span>
                          <p className="text-gray-800 dark:text-gray-200 font-medium text-base">
                            {getLocalizedText(condition.dosage, lang)}
                          </p>
                        </div>
                      </div>

                      {/* Defense Role & Precaution Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Role in Defense */}
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-200 dark:border-blue-900/30">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5 mb-2">
                            <Info className="w-4 h-4" />
                            <span>{t('fertilizer.defenseRole')}</span>
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {getLocalizedText(condition.defenseRole, lang)}
                          </p>
                        </div>

                        {/* Precaution */}
                        <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-xl border border-red-200 dark:border-red-900/30">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-300 flex items-center gap-1.5 mb-2">
                            <ShieldAlert className="w-4 h-4" />
                            <span>{t('fertilizer.precaution')}</span>
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {getLocalizedText(condition.precaution, lang)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 p-12 text-center rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="text-5xl mb-3">🔍</div>
              <h3 className="text-xl font-bold mb-2">{t('fertilizer.noMatch')}</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-4">
                Try searching for terms like "blight", "rot", "calcium", "boron", or select a plant pill.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg font-bold text-sm shadow hover:bg-primary-hover transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: GROWTH STAGE SCHEDULE */}
      {activeTab === 'schedule' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                <span>
                  {getLocalizedText(currentFertilizerCrop.name, lang)} Fertilizer Schedule
                </span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Standard schedule for optimal yield from land preparation to harvest.
              </p>
            </div>
            <span className="text-3xl hidden sm:inline">{currentFertilizerCrop.icon}</span>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-primary/20">
            {currentFertilizerCrop.growthStages.map((stage, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shadow flex-shrink-0 z-10">
                  {idx + 1}
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/40 p-5 rounded-xl border border-gray-200 dark:border-gray-700/80 flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="text-lg font-extrabold text-gray-900 dark:text-white">
                      {getLocalizedText(stage.stage, lang)}
                    </h4>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full inline-block self-start sm:self-auto">
                      {getLocalizedText(stage.timing, lang)}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                    {getLocalizedText(stage.fertilizers, lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SOIL HEALTH & SAFETY RULES */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          {/* Soil Testing */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-primary/10 p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Search className="w-6 h-6 text-primary" /> 1. Soil Testing is Crucial
              </h2>
            </div>
            <div className="p-6 text-lg text-gray-700 dark:text-gray-300">
              <p className="mb-4">
                Before applying any fertilizer, it is vital to know your soil's current nutrient status.
                Blanket application of fertilizers leads to waste and can harm the soil.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Test soil every 2-3 years.</li>
                <li>Follow the recommendations given in your Soil Health Card.</li>
                <li>Apply Nitrogen (N), Phosphorus (P), and Potassium (K) in a balanced ratio as recommended.</li>
              </ul>
            </div>
          </section>

          {/* Critical Safety Notices */}
          <section className="bg-red-50 dark:bg-red-950/20 rounded-2xl shadow-md border-2 border-red-500 overflow-hidden">
            <div className="bg-red-100 dark:bg-red-900/40 p-6 border-b border-red-200 dark:border-red-800 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <h2 className="text-2xl font-black text-red-800 dark:text-red-300">Critical Safety Notices</h2>
            </div>
            <div className="p-6 text-lg text-gray-800 dark:text-gray-200 space-y-4 font-medium">
              <p className="flex gap-2 items-start">
                <span className="text-red-500 text-2xl leading-none">•</span>
                <span>
                  <strong>Never use chemical fertilizer as a disease treatment:</strong> Fertilizers only provide nutrients; they cannot cure fungal or viral infections alone. Always use certified IPM and fungicides when an active pathogen outbreak occurs.
                </span>
              </p>
              <p className="flex gap-2 items-start">
                <span className="text-red-500 text-2xl leading-none">•</span>
                <span>
                  <strong>Avoid excess nitrogen (Urea):</strong> Too much urea/nitrogen makes plant tissues succulent and watery, attracting sucking pests (whiteflies, thrips, aphids) and dramatically increasing vulnerability to fungal blight.
                </span>
              </p>
              <p className="flex gap-2 items-start">
                <span className="text-red-500 text-2xl leading-none">•</span>
                <span>
                  <strong>Wear PPE:</strong> Always wear gloves and a face mask when spraying or handling chemical fertilizers or pesticides.
                </span>
              </p>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-green-50 dark:bg-green-950/20 p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" /> Best Practices
              </h2>
            </div>
            <div className="p-6 text-lg text-gray-700 dark:text-gray-300">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 font-bold px-3 py-1 rounded-lg">
                    1
                  </div>
                  <p>
                    <strong>Split Application:</strong> Apply Nitrogen in splits (2-3 times) during the crop cycle to prevent leaching loss.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 font-bold px-3 py-1 rounded-lg">
                    2
                  </div>
                  <p>
                    <strong>Use Organics:</strong> Combine chemical fertilizers with Farm Yard Manure (FYM) or compost to improve soil structure and microbial diversity.
                  </p>
                </li>
                <li className="flex gap-3">
                  <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 font-bold px-3 py-1 rounded-lg">
                    3
                  </div>
                  <p>
                    <strong>Placement:</strong> Place fertilizer near the root zone (band placement) rather than broadcasting, for much higher fertilizer use efficiency.
                  </p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
