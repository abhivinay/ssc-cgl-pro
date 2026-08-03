import"dotenv/config";
import app from"./app.js";

const PORT=Number(process.env.PORT)||5000;

const server=app.listen(PORT,()=>{
console.log(`SSC extraction server running at http://localhost:${PORT}`);
console.log(`Health check: http://localhost:${PORT}/api/health`);
});

function shutdown(signal){
console.log(`${signal} received. Closing server...`);
server.close(error=>{
if(error){
console.error("Server shutdown failed:",error);
process.exit(1);
}
process.exit(0);
});
}

process.on("SIGINT",()=>shutdown("SIGINT"));
process.on("SIGTERM",()=>shutdown("SIGTERM"));

process.on("unhandledRejection",error=>{
console.error("Unhandled promise rejection:",error);
});

process.on("uncaughtException",error=>{
console.error("Uncaught exception:",error);
process.exit(1);
});