import{useState}from"react";
import DebugCard from"./DebugCard";
import TestActions from"./TestActions";
import StorageViewer from"./StorageViewer";

export default function DeveloperPanel(){
const[refreshKey,setRefreshKey]=useState(0);

const refreshStorage=()=>{
setRefreshKey(previous=>previous+1);
};

return(
<div className="space-y-6">
<DebugCard
title="Test Actions"
description="Simulate Brain Trainer sessions, XP, achievements and reset actions."
icon="🧪"
>
<TestActions onChange={refreshStorage}/>
</DebugCard>

<DebugCard
title="Storage Tools"
description="Inspect, export and import SSC Sentinel LocalStorage data."
icon="💾"
>
<StorageViewer
refreshKey={refreshKey}
onChange={refreshStorage}
/>
</DebugCard>
</div>
);
}