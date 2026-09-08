export async function retry(operation,{
maxAttempts=3,
initialDelay=5000,
factor=2,
shouldRetry=error=>error?.name!=="AbortError"&&error?.retryable!==false,
getDelay=()=>null,
maxDelay=60000,
signal
}={}){
let attempt=0;
let delay=initialDelay;
maxAttempts=Math.max(1,Math.min(5,Math.floor(maxAttempts)||1));

while(attempt<maxAttempts){
try{
if(signal?.aborted)throw new DOMException("Operation cancelled","AbortError");
return await operation();
}catch(error){
attempt++;

if(attempt>=maxAttempts||!shouldRetry(error)||signal?.aborted){
throw error;
}

const requested=getDelay(error,attempt);
const wait=Math.max(0,Math.min(maxDelay,requested==null?delay:Number(requested)||0));
await new Promise((resolve,reject)=>{
const cleanup=()=>signal?.removeEventListener("abort",abort);
const timer=setTimeout(()=>{cleanup();resolve();},wait);
const abort=()=>{clearTimeout(timer);cleanup();reject(new DOMException("Operation cancelled","AbortError"));};
signal?.addEventListener("abort",abort,{once:true});
if(signal?.aborted)abort();
});

delay*=factor;
}
}
}
