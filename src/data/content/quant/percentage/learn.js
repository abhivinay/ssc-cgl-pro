const percentageLearn={
introduction:{
title:"Percentage",
definition:"Percentage means a value expressed out of 100. The symbol % means per hundred.",
coreIdea:"Any fraction, decimal or ratio can be converted into a percentage by comparing it with 100.",
examImportance:"Percentage is a foundation topic for Profit and Loss, Discount, Simple Interest, Compound Interest, Ratio, Average, Marks, Population and Data Interpretation."
},

objectives:[
"Understand percentage as a value out of 100.",
"Convert fractions and decimals into percentages.",
"Convert percentages into fractions and decimals.",
"Calculate a percentage of a quantity quickly.",
"Find percentage increase and decrease.",
"Solve reverse-percentage questions.",
"Handle successive percentage changes.",
"Apply percentage concepts to SSC-style marks, salary, population and comparison questions."
],

sections:[
{
id:"percentage-meaning",
title:"1. Meaning of Percentage",
content:[
"Percentage compares a quantity with 100.",
"25% means 25 out of every 100.",
"60% means 60/100, which simplifies to 3/5.",
"A percentage is a ratio with denominator 100."
],
examples:[
{
question:"What does 35% mean?",
solution:"35% = 35/100 = 7/20."
},
{
question:"Express 8 out of 20 as a percentage.",
solution:"8/20 × 100 = 40%."
}
],
examNote:"SSC often tests the same concept indirectly through marks, votes, salary, population and expenditure."
},

{
id:"fraction-to-percentage",
title:"2. Fraction to Percentage",
rule:"Multiply the fraction by 100.",
formula:"Fraction × 100 = Percentage",
content:[
"First simplify the fraction whenever possible.",
"Use standard fraction-percentage values for faster calculation.",
"Do not convert every fraction into decimal form during the exam."
],
examples:[
{
question:"Convert 3/5 into percentage.",
solution:"3/5 × 100 = 60%."
},
{
question:"Convert 7/8 into percentage.",
solution:"7/8 × 100 = 87.5%."
},
{
question:"Convert 11/20 into percentage.",
solution:"11/20 × 100 = 55%."
}
]
},

{
id:"decimal-to-percentage",
title:"3. Decimal to Percentage",
rule:"Multiply the decimal by 100 and add the percentage symbol.",
examples:[
{
question:"Convert 0.25 into percentage.",
solution:"0.25 × 100 = 25%."
},
{
question:"Convert 1.4 into percentage.",
solution:"1.4 × 100 = 140%."
},
{
question:"Convert 0.075 into percentage.",
solution:"0.075 × 100 = 7.5%."
}
],
commonMistake:"Moving the decimal point only one place instead of two places."
},

{
id:"percentage-to-fraction",
title:"4. Percentage to Fraction",
rule:"Remove the percentage symbol, divide by 100 and simplify.",
examples:[
{
question:"Convert 45% into a fraction.",
solution:"45/100 = 9/20."
},
{
question:"Convert 12.5% into a fraction.",
solution:"12.5/100 = 1/8."
},
{
question:"Convert 66⅔% into a fraction.",
solution:"66⅔% = 2/3."
}
]
},

{
id:"percentage-of-quantity",
title:"5. Finding a Percentage of a Quantity",
formula:"x% of y = x/100 × y",
content:[
"The word 'of' means multiplication.",
"Cancel common factors before multiplying.",
"Sometimes reversing the percentage makes calculation easier: x% of y = y% of x."
],
examples:[
{
question:"Find 35% of 240.",
solution:"35/100 × 240 = 84."
},
{
question:"Find 18% of 50.",
solution:"18% of 50 = 50% of 18 = 9."
},
{
question:"Find 12.5% of 640.",
solution:"12.5% = 1/8, so 640 ÷ 8 = 80."
}
]
},

{
id:"percentage-comparison",
title:"6. One Quantity as a Percentage of Another",
formula:"Required percentage = First quantity / Second quantity × 100",
examples:[
{
question:"45 is what percent of 60?",
solution:"45/60 × 100 = 75%."
},
{
question:"72 is what percent of 48?",
solution:"72/48 × 100 = 150%."
}
],
commonMistake:"Using the wrong number as the denominator. The denominator is the quantity after the word 'of'."
},

{
id:"percentage-increase",
title:"7. Percentage Increase",
formula:"Percentage increase = Increase / Original value × 100",
content:[
"Increase = New value − Original value.",
"The denominator is always the original value.",
"Original value is the base from which change occurred."
],
examples:[
{
question:"A price rises from ₹400 to ₹460. Find the percentage increase.",
solution:"Increase = 60. Percentage increase = 60/400 × 100 = 15%."
},
{
question:"Salary increases from ₹20,000 to ₹23,000.",
solution:"Increase = 3,000. Percentage increase = 3,000/20,000 × 100 = 15%."
}
]
},

{
id:"percentage-decrease",
title:"8. Percentage Decrease",
formula:"Percentage decrease = Decrease / Original value × 100",
content:[
"Decrease = Original value − New value.",
"The original quantity remains the denominator."
],
examples:[
{
question:"A value decreases from 500 to 425. Find the decrease percent.",
solution:"Decrease = 75. Percentage decrease = 75/500 × 100 = 15%."
},
{
question:"Population falls from 80,000 to 72,000.",
solution:"Decrease = 8,000. Percentage decrease = 8,000/80,000 × 100 = 10%."
}
]
},

{
id:"successive-change",
title:"9. Successive Percentage Change",
formula:"Net percentage change = a + b + ab/100",
content:[
"Use positive signs for increases.",
"Use negative signs for decreases.",
"The formula works because the second change applies to the changed value, not the original value."
],
examples:[
{
question:"A quantity increases by 20% and then by 10%.",
solution:"Net change = 20 + 10 + 20×10/100 = 32% increase."
},
{
question:"A quantity increases by 20% and then decreases by 10%.",
solution:"Take b = −10. Net change = 20 − 10 − 2 = 8% increase."
},
{
question:"A quantity decreases by 20% and then decreases by 10%.",
solution:"Take a = −20 and b = −10. Net change = −20 −10 +2 = −28%, so 28% decrease."
}
],
commonMistake:"Simply adding 20% increase and 10% decrease and calling it 10% increase."
},

{
id:"equal-increase-decrease",
title:"10. Equal Increase and Decrease",
rule:"If a quantity is increased by x% and then decreased by x%, the net result is always a decrease.",
formula:"Net decrease = x²/100 %",
examples:[
{
question:"A price increases by 20% and then decreases by 20%.",
solution:"Net decrease = 20²/100 = 4%."
},
{
question:"A population rises by 10% and then falls by 10%.",
solution:"Net decrease = 10²/100 = 1%."
}
]
},

{
id:"reverse-percentage",
title:"11. Reverse Percentage",
content:[
"Reverse percentage is used when the changed value is known and the original value must be found.",
"After x% increase, new value = original × (100+x)/100.",
"After x% decrease, new value = original × (100−x)/100."
],
formulas:[
"Original after x% increase = New value × 100/(100+x)",
"Original after x% decrease = New value × 100/(100−x)"
],
examples:[
{
question:"After a 20% increase, a salary becomes ₹24,000. Find the original salary.",
solution:"Original = 24,000 × 100/120 = ₹20,000."
},
{
question:"After a 25% decrease, a price becomes ₹600. Find the original price.",
solution:"Original = 600 × 100/75 = ₹800."
}
]
},

{
id:"more-less-comparison",
title:"12. More Than and Less Than Comparison",
content:[
"If A is x% more than B, then A = B(100+x)/100.",
"If A is x% less than B, then A = B(100−x)/100.",
"The reverse comparison uses a different base and therefore gives a different percentage."
],
formulas:[
"If A is x% more than B, then B is [100x/(100+x)]% less than A.",
"If A is x% less than B, then B is [100x/(100−x)]% more than A."
],
examples:[
{
question:"A is 25% more than B. By what percent is B less than A?",
solution:"Required percent = 100×25/125 = 20%."
},
{
question:"A is 20% less than B. By what percent is B more than A?",
solution:"Required percent = 100×20/80 = 25%."
}
],
commonMistake:"Assuming that if A is 25% more than B, then B is also 25% less than A."
},

{
id:"population",
title:"13. Population Increase and Decrease",
content:[
"Population questions usually involve repeated percentage change over several years.",
"For repeated annual growth, multiply by the growth factor each year.",
"For repeated decline, multiply by the decline factor each year."
],
formulas:[
"Population after n years = Present population × (1+r/100)ⁿ",
"Population n years ago = Present population ÷ (1+r/100)ⁿ"
],
examples:[
{
question:"A town has population 20,000. It grows by 10% annually for 2 years.",
solution:"Population = 20,000 × 1.1 × 1.1 = 24,200."
},
{
question:"A town's population becomes 24,200 after growing 10% annually for 2 years. Find the original population.",
solution:"Original = 24,200 ÷ 1.21 = 20,000."
}
]
},

{
id:"marks",
title:"14. Marks-Based Percentage Problems",
content:[
"Marks obtained = Percentage × Total marks / 100.",
"Total marks = Marks obtained × 100 / Percentage.",
"Pass and fail questions often combine percentage with difference in marks."
],
examples:[
{
question:"A student scores 360 marks out of 450. Find the percentage.",
solution:"360/450 × 100 = 80%."
},
{
question:"A candidate gets 30% marks and fails by 20 marks. Another gets 40% and scores 30 marks above pass marks. Find total marks.",
solution:"Difference of 10% corresponds to 50 marks. Total marks = 50 × 100/10 = 500."
}
]
},

{
id:"income-expenditure",
title:"15. Income, Expenditure and Savings",
content:[
"Savings = Income − Expenditure.",
"Convert all percentages to the same base before comparing.",
"If income and expenditure both change, calculate the actual factors."
],
examples:[
{
question:"A person spends 80% of income. What percent of income is saved?",
solution:"Savings = 100% − 80% = 20%."
},
{
question:"Income rises by 20% and expenditure rises by 10%. Original income is ₹10,000 and expenditure ₹8,000. Find percentage increase in savings.",
solution:"Original saving = 2,000. New income = 12,000. New expenditure = 8,800. New saving = 3,200. Increase = 1,200. Percentage increase = 1,200/2,000 × 100 = 60%."
}
]
}
],

standardConversions:[
{fraction:"1/2",percentage:"50%"},
{fraction:"1/3",percentage:"33⅓%"},
{fraction:"2/3",percentage:"66⅔%"},
{fraction:"1/4",percentage:"25%"},
{fraction:"3/4",percentage:"75%"},
{fraction:"1/5",percentage:"20%"},
{fraction:"2/5",percentage:"40%"},
{fraction:"3/5",percentage:"60%"},
{fraction:"4/5",percentage:"80%"},
{fraction:"1/6",percentage:"16⅔%"},
{fraction:"5/6",percentage:"83⅓%"},
{fraction:"1/8",percentage:"12.5%"},
{fraction:"3/8",percentage:"37.5%"},
{fraction:"5/8",percentage:"62.5%"},
{fraction:"7/8",percentage:"87.5%"},
{fraction:"1/10",percentage:"10%"},
{fraction:"1/20",percentage:"5%"},
{fraction:"1/25",percentage:"4%"},
{fraction:"1/40",percentage:"2.5%"}
],

sscPatterns:[
"Direct fraction, decimal and percentage conversion.",
"Finding a percentage of a given quantity.",
"Finding one number as a percentage of another.",
"Percentage increase or decrease.",
"Successive percentage change.",
"Reverse percentage.",
"More-than and less-than comparison.",
"Population growth or decline.",
"Marks and pass-percentage questions.",
"Income, expenditure and savings.",
"Applications in Profit and Loss, Discount and Data Interpretation."
],

commonMistakes:[
"Using the new value instead of the original value as the denominator.",
"Adding successive percentage changes directly.",
"Assuming equal increase and decrease cancel each other.",
"Confusing 'A is x% more than B' with 'B is x% less than A'.",
"Applying a percentage to the wrong base quantity.",
"Using 20 instead of 0.20 while multiplying.",
"Skipping fraction-percentage conversions and wasting calculation time."
],

masteryChecklist:[
"I can convert common fractions into percentages without calculation.",
"I can calculate a percentage of a number mentally.",
"I can identify the correct base value.",
"I can solve successive-change questions.",
"I can solve reverse-percentage questions.",
"I can solve more-than and less-than comparisons.",
"I can solve marks, salary and population applications.",
"I can complete standard SSC percentage questions within the expected time."
]
};

export default percentageLearn;