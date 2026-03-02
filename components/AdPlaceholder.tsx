import React from 'react';
import { TranslationDict } from '../types';

interface Props {
  type: 'horizontal' | 'sidebar' | 'content';
  className?: string;
  t: TranslationDict['ads'];
}

const AdPlaceholder: React.FC<Props> = ({ type, className = '', t }) => {
  const styles = {
    horizontal: 'w-full h-24 md:h-32 bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm rounded-lg',
    sidebar: 'w-full h-[600px] bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm rounded-lg',
    content: 'w-full h-48 bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm rounded-lg',
  };

  return (
    <div className={`${styles[type]} ${className}`}>
      <div className="text-center">
        <p className="font-medium">{t.label}</p>
        <p className="text-xs opacity-60">{t.reserved}</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;