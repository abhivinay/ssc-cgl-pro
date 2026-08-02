const percentagePYQs=[
];

export const getPercentagePYQById=id=>
percentagePYQs.find(
question=>question.id===String(id)
)||null;

export const getPercentagePYQsByYear=year=>
percentagePYQs.filter(
question=>question.year===year
);

export default percentagePYQs;