const percentageExamples=[
{
id:"basic-percentage-1",
subtopic:"Meaning of Percentage",
difficulty:"easy",
question:"Express 18 out of 24 as a percentage.",
method:"Direct percentage formula",
solution:[
"Required percentage = 18/24 × 100",
"18/24 = 3/4",
"3/4 × 100 = 75%"
],
answer:"75%",
shortcut:"Recognize 18/24 as 3/4, and 3/4 = 75%.",
commonMistake:"Dividing 24 by 18 instead of 18 by 24."
},
{
id:"fraction-conversion-1",
subtopic:"Fraction to Percentage",
difficulty:"easy",
question:"Convert 7/8 into a percentage.",
method:"Fraction × 100",
solution:[
"7/8 × 100",
"100 ÷ 8 = 12.5",
"7 × 12.5 = 87.5%"
],
answer:"87.5%",
shortcut:"Memorize 1/8 = 12.5%, so 7/8 = 87.5%."
},
{
id:"decimal-conversion-1",
subtopic:"Decimal to Percentage",
difficulty:"easy",
question:"Convert 0.375 into a percentage.",
method:"Multiply by 100",
solution:[
"0.375 × 100 = 37.5%"
],
answer:"37.5%",
shortcut:"Move the decimal point two places to the right."
},
{
id:"percentage-of-number-1",
subtopic:"Percentage of Quantity",
difficulty:"easy",
question:"Find 35% of 480.",
method:"Break 35% into 30% and 5%",
solution:[
"30% of 480 = 144",
"5% of 480 = 24",
"35% of 480 = 144 + 24 = 168"
],
answer:"168",
shortcut:"35% = 7/20, so 480 × 7/20 = 168."
},
{
id:"reverse-property-1",
subtopic:"Percentage of Quantity",
difficulty:"easy",
question:"Find 16% of 25.",
method:"Reverse percentage property",
solution:[
"16% of 25 = 25% of 16",
"25% of 16 = 1/4 × 16 = 4"
],
answer:"4",
shortcut:"Use x% of y = y% of x."
},
{
id:"comparison-1",
subtopic:"Percentage Comparison",
difficulty:"easy",
question:"72 is what percent of 48?",
method:"Part/Whole × 100",
solution:[
"72/48 × 100",
"72/48 = 3/2",
"3/2 × 100 = 150%"
],
answer:"150%",
commonMistake:"Assuming the answer cannot exceed 100%."
},
{
id:"increase-1",
subtopic:"Percentage Increase",
difficulty:"easy",
question:"The price of an article increases from ₹800 to ₹920. Find the percentage increase.",
method:"Increase/original × 100",
solution:[
"Increase = 920 − 800 = 120",
"Percentage increase = 120/800 × 100",
"= 15%"
],
answer:"15%",
commonMistake:"Using 920 as the denominator."
},
{
id:"decrease-1",
subtopic:"Percentage Decrease",
difficulty:"easy",
question:"A quantity decreases from 750 to 600. Find the percentage decrease.",
method:"Decrease/original × 100",
solution:[
"Decrease = 750 − 600 = 150",
"Percentage decrease = 150/750 × 100",
"= 20%"
],
answer:"20%"
},
{
id:"successive-increase-1",
subtopic:"Successive Percentage Change",
difficulty:"medium",
question:"A number is increased by 20% and then by 25%. Find the net percentage increase.",
method:"a + b + ab/100",
solution:[
"Net change = 20 + 25 + 20×25/100",
"= 45 + 5",
"= 50% increase"
],
answer:"50% increase",
shortcut:"Use factors: 1.20 × 1.25 = 1.50."
},
{
id:"increase-decrease-1",
subtopic:"Successive Percentage Change",
difficulty:"medium",
question:"A value is increased by 25% and then decreased by 20%. Find the net change.",
method:"Successive percentage formula",
solution:[
"Take a = 25 and b = −20",
"Net change = 25 − 20 − 5",
"= 0%"
],
answer:"No net change",
shortcut:"1.25 × 0.80 = 1."
},
{
id:"equal-change-1",
subtopic:"Equal Increase and Decrease",
difficulty:"medium",
question:"A salary is increased by 30% and then reduced by 30%. Find the net percentage change.",
method:"x²/100 decrease",
solution:[
"Net decrease = 30²/100",
"= 900/100",
"= 9%"
],
answer:"9% decrease",
commonMistake:"Thinking the two changes cancel each other."
},
{
id:"reverse-percentage-1",
subtopic:"Reverse Percentage",
difficulty:"medium",
question:"After a 20% increase, the value becomes 540. Find the original value.",
method:"New × 100/(100+x)",
solution:[
"Original = 540 × 100/120",
"= 540 × 5/6",
"= 450"
],
answer:"450"
},
{
id:"reverse-decrease-1",
subtopic:"Reverse Percentage",
difficulty:"medium",
question:"After a 25% decrease, the price becomes ₹900. Find the original price.",
method:"New × 100/(100−x)",
solution:[
"Original = 900 × 100/75",
"= 900 × 4/3",
"= ₹1200"
],
answer:"₹1200"
},
{
id:"more-less-1",
subtopic:"More Than and Less Than",
difficulty:"medium",
question:"A is 40% more than B. By what percent is B less than A?",
method:"100x/(100+x)",
solution:[
"Required percentage = 100×40/140",
"= 4000/140",
"= 28 4/7%"
],
answer:"28 4/7%",
shortcut:"Assume B = 100, then A = 140. Difference = 40. So 40/140 × 100."
},
{
id:"less-more-1",
subtopic:"More Than and Less Than",
difficulty:"medium",
question:"A is 25% less than B. By what percent is B more than A?",
method:"100x/(100−x)",
solution:[
"Required percentage = 100×25/75",
"= 100/3",
"= 33⅓%"
],
answer:"33⅓%"
},
{
id:"population-1",
subtopic:"Population",
difficulty:"medium",
question:"The population of a town is 40,000. It increases by 10% annually. Find the population after 2 years.",
method:"Repeated growth factor",
solution:[
"Population after 2 years = 40,000 × 1.1²",
"= 40,000 × 1.21",
"= 48,400"
],
answer:"48,400"
},
{
id:"population-reverse-1",
subtopic:"Population",
difficulty:"hard",
question:"The present population of a town is 72,600 after increasing by 10% annually for 2 years. Find the population 2 years ago.",
method:"Reverse compound growth",
solution:[
"Past population = 72,600 ÷ 1.1²",
"= 72,600 ÷ 1.21",
"= 60,000"
],
answer:"60,000"
},
{
id:"marks-1",
subtopic:"Marks",
difficulty:"medium",
question:"A student scores 35% marks and fails by 12 marks. Another student scores 47% marks and gets 24 marks more than the pass marks. Find the total marks.",
method:"Difference in percentage corresponds to difference in marks",
solution:[
"Difference in percentage = 47% − 35% = 12%",
"Difference in marks = 12 + 24 = 36",
"12% of total marks = 36",
"Total marks = 36 × 100/12",
"= 300"
],
answer:"300"
},
{
id:"income-saving-1",
subtopic:"Income, Expenditure and Savings",
difficulty:"hard",
question:"A person's income increases by 20% and expenditure increases by 10%. If originally income was ₹15,000 and savings were ₹3,000, find the percentage increase in savings.",
method:"Calculate original and new savings",
solution:[
"Original expenditure = 15,000 − 3,000 = 12,000",
"New income = 15,000 × 1.20 = 18,000",
"New expenditure = 12,000 × 1.10 = 13,200",
"New savings = 18,000 − 13,200 = 4,800",
"Increase in savings = 4,800 − 3,000 = 1,800",
"Percentage increase = 1,800/3,000 × 100 = 60%"
],
answer:"60%"
},
{
id:"consumption-price-1",
subtopic:"Expenditure Control",
difficulty:"hard",
question:"The price of sugar increases by 25%. By what percent must consumption be reduced so that expenditure remains unchanged?",
method:"Reduction formula x/(100+x) × 100",
solution:[
"Required reduction = 25/125 × 100",
"= 20%"
],
answer:"20%",
shortcut:"If price rises by x%, consumption reduction = 100x/(100+x)%."
},
{
id:"price-consumption-2",
subtopic:"Expenditure Control",
difficulty:"hard",
question:"The price of an article decreases by 20%. By what percent can consumption increase without changing expenditure?",
method:"Increase formula x/(100−x) × 100",
solution:[
"Required increase = 20/80 × 100",
"= 25%"
],
answer:"25%"
},
{
id:"vote-1",
subtopic:"Votes",
difficulty:"hard",
question:"In an election, a candidate gets 55% of valid votes and wins by 1,200 votes. Find the total number of valid votes.",
method:"Winning margin as percentage difference",
solution:[
"Opponent's percentage = 45%",
"Winning margin = 55% − 45% = 10%",
"10% of valid votes = 1,200",
"Total valid votes = 1,200 × 100/10",
"= 12,000"
],
answer:"12,000"
},
{
id:"failed-candidates-1",
subtopic:"Examination",
difficulty:"hard",
question:"In an examination, 70% students passed English, 65% passed Mathematics and 10% failed both. Find the percentage who passed both subjects.",
method:"Set relation using inclusion-exclusion",
solution:[
"Passed at least one = 100% − 10% = 90%",
"English + Mathematics − Both = At least one",
"70 + 65 − Both = 90",
"Both = 45%"
],
answer:"45%"
}
];

export const getPercentageExampleById=id=>
percentageExamples.find(
example=>example.id===String(id)
)||null;

export const getPercentageExamplesByDifficulty=difficulty=>
percentageExamples.filter(
example=>example.difficulty===difficulty
);

export const getPercentageExamplesBySubtopic=subtopic=>
percentageExamples.filter(
example=>example.subtopic===subtopic
);

export default percentageExamples;