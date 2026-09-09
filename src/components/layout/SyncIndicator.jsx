import {useSyncExternalStore} from 'react';
import {Link} from 'react-router-dom';
import {CloudCheck,CloudOff,LoaderCircle} from 'lucide-react';
import {getSyncStatus,subscribeSync} from '../../services/progressSync';
export default function SyncIndicator(){
 const state=useSyncExternalStore(subscribeSync,getSyncStatus,getSyncStatus);
 const saved=state.phase==='saved', waiting=['connecting','saving'].includes(state.phase);
 const Icon=saved?CloudCheck:waiting?LoaderCircle:CloudOff;
 return <Link to="/settings" className={`sync-indicator ${saved?'is-saved':''}`} aria-label={`Progress storage: ${saved?'Saved to disk':waiting?'Connecting or saving':'Needs attention'}`}><Icon size={16}/><span>{saved?'Saved to disk':waiting?'Syncing progress':'Device copy only'}</span></Link>;
}
