
import { stateData } from '../stateData';

// Type definition for heritage sites
export type HeritageSite = {
  name: string;
  location: string;
  description: string;
  stateName: string;
  stateId: string;
  image: string;
};

// Default image for heritage sites
const defaultHeritageSiteImage = "https://images.unsplash.com/photo-1599661046289-e31897d36a68?q=80&w=1170";

// Transform heritage sites from state data and ensure each has an image property
export const heritageSites: HeritageSite[] = stateData.flatMap(state => 
  state.heritage?.sites?.map(site => ({
    ...site,
    stateName: state.name,
    stateId: state.id,
    // Add the image property with a default if it doesn't exist in the source data
    image: site.image || defaultHeritageSiteImage
  })) || []
);

// Function to get heritage sites by state
export const getHeritageSitesByState = (stateId: string): HeritageSite[] => {
  if (stateId === 'all') return heritageSites;
  return heritageSites.filter(site => site.stateId === stateId);
};

// Function to get a specific heritage site by name and state
export const getHeritageSiteByNameAndState = (name: string, stateId: string): HeritageSite | undefined => {
  return heritageSites.find(site => site.name === name && site.stateId === stateId);
};
