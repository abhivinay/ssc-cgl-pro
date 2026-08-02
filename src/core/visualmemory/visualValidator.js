const normalizeIndexes=value=>{
if(!Array.isArray(value))return[];

return[
...new Set(
value
.map(Number)
.filter(Number.isInteger)
)
].sort((a,b)=>a-b);
};

export function validateVisualSelection(
expectedIndexes=[],
selectedIndexes=[]
){
const expected=normalizeIndexes(expectedIndexes);
const selected=normalizeIndexes(selectedIndexes);

const expectedSet=new Set(expected);
const selectedSet=new Set(selected);

const correctSelections=selected.filter(index=>
expectedSet.has(index)
);

const missedIndexes=expected.filter(index=>
!selectedSet.has(index)
);

const wrongIndexes=selected.filter(index=>
!expectedSet.has(index)
);

const correct=
missedIndexes.length===0&&
wrongIndexes.length===0&&
expected.length>0;

return{
correct,
expected,
selected,
correctSelections,
missedIndexes,
wrongIndexes,
totalExpected:expected.length,
totalSelected:selected.length
};
}

export function getVisualAccuracy(
expectedIndexes=[],
selectedIndexes=[]
){
const result=validateVisualSelection(
expectedIndexes,
selectedIndexes
);

if(!result.totalExpected)return 0;

const correctCount=result.correctSelections.length;
const penalty=result.wrongIndexes.length;

const score=Math.max(
0,
correctCount-penalty
);

return Math.round(
score/result.totalExpected*100
);
}

export default{
validateVisualSelection,
getVisualAccuracy
};