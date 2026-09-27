import { useEffect, useState } from 'react';
import { getMasterProfiles, loadMasterProfiles, MASTER_UPDATE_EVENT, sortProfiles } from '../services/masterDatabase';

export default function useMasterProfiles() {
  const read = () => {
    try { return { profiles: sortProfiles(getMasterProfiles()), error: '' }; }
    catch (error) { return { profiles: [], error: error.message }; }
  };
  const [state, setState] = useState(read);
  useEffect(() => {
    loadMasterProfiles().catch(error => setState(current => ({ ...current, error: error.message })));
    const refresh = event => {
      setState(read());
    };
    window.addEventListener(MASTER_UPDATE_EVENT, refresh);
    return () => {
      window.removeEventListener(MASTER_UPDATE_EVENT, refresh);
    };
  }, []);
  return state;
}
