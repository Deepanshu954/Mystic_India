
import { states } from '../data/states';

// Extract unique regions
export const getUniqueRegions = (): string[] => {
  return [...new Set(states.flatMap(state => 
    state.tags.filter(tag => tag.includes('India'))
  ))];
};

// Get states by region
export const getStatesByRegion = (region: string) => {
  return states.filter(state => state.tags.includes(region));
};

// Region theme mapping
export const regionThemes = {
  'North India': {
    primary: 'from-blue-500 to-cyan-400',
    secondary: 'bg-blue-100 text-blue-800',
    accent: 'bg-blue-500/10 border-blue-500/30'
  },
  'South India': {
    primary: 'from-emerald-500 to-green-400',
    secondary: 'bg-emerald-100 text-emerald-800', 
    accent: 'bg-emerald-500/10 border-emerald-500/30'
  },
  'East India': {
    primary: 'from-purple-500 to-pink-400',
    secondary: 'bg-purple-100 text-purple-800',
    accent: 'bg-purple-500/10 border-purple-500/30'
  },
  'West India': {
    primary: 'from-amber-500 to-yellow-400',
    secondary: 'bg-amber-100 text-amber-800',
    accent: 'bg-amber-500/10 border-amber-500/30'
  },
  'Central India': {
    primary: 'from-rose-500 to-red-400',
    secondary: 'bg-rose-100 text-rose-800',
    accent: 'bg-rose-500/10 border-rose-500/30'
  },
  'Northeast India': {
    primary: 'from-teal-500 to-cyan-400',
    secondary: 'bg-teal-100 text-teal-800',
    accent: 'bg-teal-500/10 border-teal-500/30'
  }
};
