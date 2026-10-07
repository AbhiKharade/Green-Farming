import React from 'react';
import { Droplets, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const FertilizerGuide = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Droplets className="text-primary w-10 h-10" /> {t('nav.fertilizerGuide')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Guidelines for effective and safe fertilizer management based on soil health.
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
           <div className="bg-primary/10 p-6 border-b border-gray-200 dark:border-gray-700">
             <h2 className="text-2xl font-bold flex items-center gap-2">
               <Search className="w-6 h-6" /> 1. Soil Testing is Crucial
             </h2>
           </div>
           <div className="p-6 text-lg text-gray-700 dark:text-gray-300">
             <p className="mb-4">Before applying any fertilizer, it is vital to know your soil's current nutrient status. Blanket application of fertilizers leads to waste and can harm the soil.</p>
             <ul className="list-disc list-inside space-y-2">
               <li>Test soil every 2-3 years.</li>
               <li>Follow the recommendations given in your Soil Health Card.</li>
               <li>Apply Nitrogen (N), Phosphorus (P), and Potassium (K) in a balanced ratio as recommended.</li>
             </ul>
           </div>
        </section>

        <section className="bg-red-50 dark:bg-red-900/10 rounded-xl shadow-md border-2 border-red-500 overflow-hidden">
           <div className="bg-red-100 dark:bg-red-900/30 p-6 border-b border-red-200 dark:border-red-800 flex items-center gap-3">
             <AlertTriangle className="w-8 h-8 text-red-600" />
             <h2 className="text-2xl font-black text-red-800 dark:text-red-400">Critical Safety Notices</h2>
           </div>
           <div className="p-6 text-lg text-gray-800 dark:text-gray-200 space-y-4 font-medium">
             <p className="flex gap-2 items-start"><span className="text-red-500 text-2xl leading-none">•</span> <strong>Never use chemical fertilizer as a disease treatment.</strong> Fertilizers only provide nutrients; they cannot cure fungal or viral infections.</p>
             <p className="flex gap-2 items-start"><span className="text-red-500 text-2xl leading-none">•</span> <strong>Avoid excess nitrogen.</strong> Too much urea/nitrogen makes plants succulent, attracting more sucking pests and making them vulnerable to diseases.</p>
             <p className="flex gap-2 items-start"><span className="text-red-500 text-2xl leading-none">•</span> Always follow product labels for dosage and application timing.</p>
             <p className="flex gap-2 items-start"><span className="text-red-500 text-2xl leading-none">•</span> <strong>Wear PPE:</strong> Always wear gloves and a mask when applying chemical fertilizers or pesticides.</p>
           </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
           <div className="bg-green-50 dark:bg-green-900/20 p-6 border-b border-gray-200 dark:border-gray-700">
             <h2 className="text-2xl font-bold flex items-center gap-2">
               <CheckCircle className="w-6 h-6 text-green-600" /> Best Practices
             </h2>
           </div>
           <div className="p-6 text-lg text-gray-700 dark:text-gray-300">
             <ul className="space-y-4">
               <li className="flex gap-3">
                 <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 font-bold px-3 py-1 rounded">1</div>
                 <p><strong>Split Application:</strong> Apply Nitrogen in splits (2-3 times) during the crop cycle to prevent leaching loss.</p>
               </li>
               <li className="flex gap-3">
                 <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 font-bold px-3 py-1 rounded">2</div>
                 <p><strong>Use Organics:</strong> Combine chemical fertilizers with Farm Yard Manure (FYM) or compost to improve soil structure and water retention.</p>
               </li>
               <li className="flex gap-3">
                 <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 font-bold px-3 py-1 rounded">3</div>
                 <p><strong>Placement:</strong> Place fertilizer near the root zone (band placement) rather than broadcasting, for better efficiency.</p>
               </li>
             </ul>
           </div>
        </section>
      </div>
    </div>
  );
};
