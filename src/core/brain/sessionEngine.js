import {
completeGameSession,
createGameSession,
isGameSessionComplete
} from "./gameEngine";
import {buildScoreSummary} from "./scoreEngine";

const STATUS=Object.freeze({
IDLE:"idle",
ACTIVE:"active",
COMPLETED:"completed"
});

export function createBrainSession({
games=[],
dateKey,
duration=600
}={}){
const safeGames=Array.isArray(games)
?games.filter(Boolean)
:[];

return{
id:
typeof crypto!=="undefined"&&
typeof crypto.randomUUID==="function"
?`brain-daily-${crypto.randomUUID()}`
:`brain-daily-${Date.now()}`,
dateKey:String(dateKey||""),
duration:Math.max(60,Number(duration)||600),
status:safeGames.length?STATUS.ACTIVE:STATUS.IDLE,
startedAt:safeGames.length?Date.now():null,
completedAt:null,
currentGameIndex:0,
games:safeGames,
results:[],
totalScore:0,
averageAccuracy:0,
xpEarned:0,
rewarded:false
};
}

export function startGame(
brainSession,
gameOptions={}
){
if(!brainSession||brainSession.status!==STATUS.ACTIVE){
return brainSession;
}

const gameSession=createGameSession(gameOptions);

return{
...brainSession,
activeGame:gameSession
};
}

export function completeCurrentGame(
brainSession,
result={}
){
if(
!brainSession||
!brainSession.activeGame||
isGameSessionComplete(brainSession.activeGame)
){
return brainSession;
}

const summary=buildScoreSummary({
...result,
difficulty:brainSession.activeGame.difficulty,
alreadyRewarded:false
});

const completedGame=completeGameSession(
brainSession.activeGame,
summary
);

const results=[
...(Array.isArray(brainSession.results)
?brainSession.results
:[]),
{
...completedGame,
performance:summary.performance,
xp:summary.xp
}
];

const nextIndex=
(Number(brainSession.currentGameIndex)||0)+1;

const finished=
nextIndex>=brainSession.games.length;

const totalScore=results.reduce(
(total,item)=>total+(Number(item.score)||0),
0
);

const averageAccuracy=results.length
?Math.round(
results.reduce(
(total,item)=>total+(Number(item.accuracy)||0),
0
)/results.length
)
:0;

const xpEarned=results.reduce(
(total,item)=>total+(Number(item.xp)||0),
0
);

return{
...brainSession,
activeGame:null,
currentGameIndex:nextIndex,
results,
totalScore,
averageAccuracy,
xpEarned,
status:finished
?STATUS.COMPLETED
:STATUS.ACTIVE,
completedAt:finished
?Date.now()
:null
};
}

export function getCurrentGameType(
brainSession
){
if(!brainSession||brainSession.status!==STATUS.ACTIVE){
return null;
}

return brainSession.games[
brainSession.currentGameIndex
]||null;
}

export function isBrainSessionComplete(
brainSession
){
return Boolean(
brainSession&&
brainSession.status===STATUS.COMPLETED&&
brainSession.completedAt
);
}

export function markBrainSessionRewarded(
brainSession
){
if(!brainSession)return brainSession;

return{
...brainSession,
rewarded:true
};
}

export default{
createBrainSession,
startGame,
completeCurrentGame,
getCurrentGameType,
isBrainSessionComplete,
markBrainSessionRewarded
};