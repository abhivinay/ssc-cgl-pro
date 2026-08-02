export const GAME_TYPES=Object.freeze({
MENTAL_MATH:"mental-math",
NUMBER_MEMORY:"number-memory",
VISUAL_MEMORY:"visual-memory",
PATTERN_RECOGNITION:"pattern-recognition",
SEQUENCE_RECALL:"sequence-recall",
SPEED_REACTION:"speed-reaction",
ODD_ONE_OUT:"odd-one-out",
DIRECTION_MEMORY:"direction-memory",
SYMBOL_MEMORY:"symbol-memory"
});

export const DIFFICULTIES=Object.freeze({
EASY:"easy",
MEDIUM:"medium",
HARD:"hard"
});

const GAME_CONFIG=Object.freeze({
[GAME_TYPES.MENTAL_MATH]:{
title:"Mental Math",
icon:"⚡",
duration:60,
defaultDifficulty:DIFFICULTIES.EASY
},
[GAME_TYPES.NUMBER_MEMORY]:{
title:"Number Memory",
icon:"🔢",
duration:60,
defaultDifficulty:DIFFICULTIES.EASY
},
[GAME_TYPES.VISUAL_MEMORY]:{
title:"Visual Memory",
icon:"👁️",
duration:60,
defaultDifficulty:DIFFICULTIES.EASY
},
[GAME_TYPES.PATTERN_RECOGNITION]:{
title:"Pattern Recognition",
icon:"🧩",
duration:60,
defaultDifficulty:DIFFICULTIES.EASY
},
[GAME_TYPES.SEQUENCE_RECALL]:{
title:"Sequence Recall",
icon:"🔁",
duration:60,
defaultDifficulty:DIFFICULTIES.EASY
},
[GAME_TYPES.SPEED_REACTION]:{
title:"Reaction Speed",
icon:"🎯",
duration:60,
defaultDifficulty:DIFFICULTIES.EASY
},
[GAME_TYPES.ODD_ONE_OUT]:{
title:"Odd One Out",
icon:"🔍",
duration:60,
defaultDifficulty:DIFFICULTIES.EASY
},
[GAME_TYPES.DIRECTION_MEMORY]:{
title:"Direction Memory",
icon:"🧭",
duration:60,
defaultDifficulty:DIFFICULTIES.EASY
},
[GAME_TYPES.SYMBOL_MEMORY]:{
title:"Symbol Memory",
icon:"🔣",
duration:60,
defaultDifficulty:DIFFICULTIES.EASY
}
});

const createId=prefix=>{
if(
typeof crypto!=="undefined"&&
typeof crypto.randomUUID==="function"
){
return `${prefix}-${crypto.randomUUID()}`;
}

return `${prefix}-${Date.now()}-${Math.random()
.toString(36)
.slice(2,8)}`;
};

const normalizeDifficulty=value=>{
const difficulty=String(value||"").toLowerCase();

return Object.values(DIFFICULTIES).includes(difficulty)
?difficulty
:DIFFICULTIES.EASY;
};

export function getGameConfig(gameType){
const type=String(gameType||"");

return GAME_CONFIG[type]
?{
type,
...GAME_CONFIG[type]
}
:null;
}

export function getAvailableGames(){
return Object.keys(GAME_CONFIG).map(type=>({
type,
...GAME_CONFIG[type]
}));
}

export function createGameSession({
gameType,
difficulty,
duration
}={}){
const config=getGameConfig(gameType);

if(!config){
throw new Error(
`Unsupported brain game type: ${String(gameType)}`
);
}

const safeDifficulty=normalizeDifficulty(
difficulty||config.defaultDifficulty
);

const safeDuration=Math.max(
10,
Math.min(
600,
Number(duration)||config.duration
)
);

return{
id:createId("brain-session"),
gameType:config.type,
title:config.title,
icon:config.icon,
difficulty:safeDifficulty,
duration:safeDuration,
startedAt:Date.now(),
completedAt:null,
status:"active",
score:0,
accuracy:0,
correctAnswers:0,
wrongAnswers:0,
totalAttempts:0,
reactionTime:0
};
}

export function completeGameSession(
session,
result={}
){
if(!session||typeof session!=="object"){
throw new Error("A valid brain game session is required.");
}

const correctAnswers=Math.max(
0,
Number(result.correctAnswers)||0
);

const wrongAnswers=Math.max(
0,
Number(result.wrongAnswers)||0
);

const totalAttempts=Math.max(
correctAnswers+wrongAnswers,
Number(result.totalAttempts)||0
);

const accuracy=totalAttempts
?Math.round(correctAnswers/totalAttempts*100)
:0;

return{
...session,
status:"completed",
completedAt:Date.now(),
score:Math.max(0,Number(result.score)||0),
accuracy,
correctAnswers,
wrongAnswers,
totalAttempts,
reactionTime:Math.max(
0,
Number(result.reactionTime)||0
)
};
}

export function isGameSessionComplete(session){
return Boolean(
session&&
session.status==="completed"&&
session.completedAt
);
}

export function getGameTitle(gameType){
return getGameConfig(gameType)?.title||"Brain Game";
}

export default{
GAME_TYPES,
DIFFICULTIES,
getGameConfig,
getAvailableGames,
createGameSession,
completeGameSession,
isGameSessionComplete,
getGameTitle
};