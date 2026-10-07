import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { PhoneCall } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">🌱 Green Farming</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Providing expert guidance on crops, diseases, and farming practices.
            </p>
            <div className="flex items-center gap-2 font-bold text-primary">
              <PhoneCall className="w-5 h-5" />
              <a href="tel:18001801551" className="hover:underline">Kisan Call Centre: 1800-180-1551</a>
            </div>
          </div>
          
          <div>
             <h3 className="text-lg font-bold mb-4">Disclaimer</h3>
             <p className="text-sm text-gray-600 dark:text-gray-400 italic p-3 bg-gray-200 dark:bg-gray-800 rounded-lg">
               Information provided here is for educational purposes only. Do not use chemical fertilizer as a disease treatment. 
               This is not a substitute for an agronomist or certified soil testing lab. Contact your local KVK or State Agricultural University for exact recommendations.
             </p>
          </div>

          <div>
             <h3 className="text-lg font-bold mb-4">Feedback</h3>
             <form className="flex flex-col gap-2" onSubmit={(e) => { e.preventDefault(); alert('Feedback submitted! Thank you.'); }}>
               <input type="text" placeholder="Your Name" required className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" />
               <textarea placeholder="Your Feedback" required className="p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 min-h-[80px]"></textarea>
               <button type="submit" className="bg-primary hover:bg-primary-hover text-white py-2 px-4 rounded-md font-medium transition-colors touch-target">
                 Submit
               </button>
             </form>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Green Farming. Built for Indian Farmers.
        </div>
      </div>
    </footer>
  );
};
