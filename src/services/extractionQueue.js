export default class ExtractionQueue{
constructor(items=[]){
this.items=[];
this.currentId=null;
this.running=false;
this.syncItems(items);
}

syncItems(items=[]){
const previousStatuses=new Map(
this.items.map(item=>[item.id,item.status])
);

this.items=items.map(item=>({
...item,
status:item.status||previousStatuses.get(item.id)||"pending"
}));

if(this.currentId&&!this.items.some(item=>item.id===this.currentId)){
this.currentId=null;
}
}

start(){
this.running=true;
}

pause(){
this.running=false;
}

resume(){
this.running=true;
}

stop(){
this.running=false;
this.currentId=null;
this.items=this.items.map(item=>(
item.status==="extracting"
?{...item,status:"pending"}
:item
));
}

isRunning(){
return this.running;
}

getCurrent(){
return this.items.find(item=>item.id===this.currentId)||null;
}

getNextPending(){
const item=this.items.find(item=>item.status==="pending")||null;
this.currentId=item?.id||null;
return item;
}

markExtracting(id){
this.currentId=id;
this.items=this.items.map(item=>
item.id===id?{...item,status:"extracting"}:item
);
}

markCompleted(id){
this.items=this.items.map(item=>
item.id===id?{...item,status:"completed"}:item
);
if(this.currentId===id)this.currentId=null;
}

markFailed(id){
this.items=this.items.map(item=>
item.id===id?{...item,status:"failed"}:item
);
if(this.currentId===id)this.currentId=null;
}

retryFailed(){
this.items=this.items.map(item=>
item.status==="failed"?{...item,status:"pending"}:item
);
}

hasPending(){
return this.items.some(item=>item.status==="pending");
}

getStats(){
const total=this.items.length;
const completed=this.items.filter(item=>item.status==="completed").length;
const failed=this.items.filter(item=>item.status==="failed").length;
const extracting=this.items.filter(item=>item.status==="extracting").length;
const pending=this.items.filter(item=>item.status==="pending").length;

return{
total,
completed,
failed,
extracting,
pending
};
}
}