import { useEffect, useState } from 'react';
import { getMasterProfiles, MASTER_STORAGE_KEY, MASTER_UPDATE_EVENT, sortProfiles } from '../services/masterDatabase';

export default function useMasterProfiles() {
  const read = () => {
    try { return { profiles: sortProfiles(getMasterProfiles()), error: '' }; }
    catch (error) { return { profiles: [], error: error.message }; }
  };
  const [state, setState] = useState(read);
  useEffect(() => {
    const refresh = event => {
      if (event.type !== 'storage' || event.key === MASTER_STORAGE_KEY || event.key === null) setState(read());
    };
    window.addEventListener('storage', refresh);
    window.addEventListener(MASTER_UPDATE_EVENT, refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener(MASTER_UPDATE_EVENT, refresh);
    };
  }, []);
  return state;
}
