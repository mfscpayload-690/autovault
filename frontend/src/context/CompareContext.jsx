import { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = sessionStorage.getItem('autovault-compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    sessionStorage.setItem('autovault-compare', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (car) => {
    setCompareList(prev => {
      if (prev.length >= 3) return prev;
      if (prev.find(c => c.id === car.id)) return prev;
      return [...prev, car];
    });
  };

  const removeFromCompare = (id) => {
    setCompareList(prev => prev.filter(c => c.id !== id));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
