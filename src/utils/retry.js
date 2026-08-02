export async function retry(operation,{
maxAttempts=3,
initialDelay=5000,
factor=2
}={}){
let attempt=0;
let delay=initialDelay;

while(attempt<maxAttempts){
try{
return await operation();
}catch(error){
attempt++;

if(attempt>=maxAttempts){
throw error;
}

await new Promise(resolve=>setTimeout(resolve,delay));

delay*=factor;
}
}
}