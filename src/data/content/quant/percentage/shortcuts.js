const percentageShortcuts=[
{
id:"fraction-percentage-memory",
title:"Memorize Standard Fraction Values",
idea:"Convert common fractions directly instead of dividing during the exam.",
items:[
"1/2 = 50%",
"1/3 = 33⅓%",
"2/3 = 66⅔%",
"1/4 = 25%",
"3/4 = 75%",
"1/5 = 20%",
"2/5 = 40%",
"3/5 = 60%",
"4/5 = 80%",
"1/6 = 16⅔%",
"5/6 = 83⅓%",
"1/8 = 12.5%",
"3/8 = 37.5%",
"5/8 = 62.5%",
"7/8 = 87.5%",
"1/10 = 10%",
"1/20 = 5%",
"1/25 = 4%",
"1/40 = 2.5%"
],
examUse:"These conversions save time in marks, ratio, DI, profit-loss and population questions."
},
{
id:"reverse-percentage-property",
title:"Reverse the Percentage",
formula:"x% of y = y% of x",
idea:"Swap the numbers when the reversed calculation is easier.",
examples:[
"18% of 50 = 50% of 18 = 9",
"4% of 75 = 75% of 4 = 3",
"16% of 25 = 25% of 16 = 4"
]
},
{
id:"ten-percent-method",
title:"Build from 10%",
idea:"Find 10% first, then combine multiples.",
examples:[
"35% of 240 = 30% + 5% = 72 + 12 = 84",
"70% of 450 = 7 × 10% of 450 = 7 × 45 = 315",
"15% of 320 = 10% + 5% = 32 + 16 = 48"
]
},
{
id:"one-percent-method",
title:"Use 1% for Unusual Percentages",
idea:"Find 1% by dividing by 100, then multiply.",
examples:[
"7% of 600 = 1% is 6, so 7% is 42",
"13% of 800 = 1% is 8, so 13% is 104",
"17% of 300 = 1% is 3, so 17% is 51"
]
},
{
id:"special-percentage-fractions",
title:"Convert Special Percentages into Fractions",
idea:"Fraction form is usually faster than multiplication.",
items:[
"50% = 1/2",
"25% = 1/4",
"75% = 3/4",
"20% = 1/5",
"40% = 2/5",
"60% = 3/5",
"80% = 4/5",
"12.5% = 1/8",
"37.5% = 3/8",
"62.5% = 5/8",
"87.5% = 7/8",
"16⅔% = 1/6",
"33⅓% = 1/3",
"66⅔% = 2/3",
"83⅓% = 5/6"
],
examples:[
"12.5% of 640 = 640/8 = 80",
"37.5% of 240 = 3/8 × 240 = 90",
"66⅔% of 150 = 2/3 × 150 = 100"
]
},
{
id:"percentage-change-factor",
title:"Use Multiplication Factors",
idea:"Replace increase and decrease with direct factors.",
items:[
"10% increase → multiply by 1.10",
"20% increase → multiply by 1.20",
"25% increase → multiply by 1.25",
"10% decrease → multiply by 0.90",
"20% decrease → multiply by 0.80",
"25% decrease → multiply by 0.75"
],
examples:[
"₹800 increased by 25% = 800 × 1.25 = ₹1000",
"₹800 decreased by 25% = 800 × 0.75 = ₹600"
]
},
{
id:"successive-change-shortcut",
title:"Successive Change Formula",
formula:"Net change = a + b + ab/100",
idea:"Use signs carefully: increase is positive, decrease is negative.",
examples:[
"20% increase, then 10% increase → 20+10+2 = 32% increase",
"20% increase, then 10% decrease → 20−10−2 = 8% increase",
"20% decrease, then 10% decrease → −20−10+2 = 28% decrease"
]
},
{
id:"same-increase-decrease",
title:"Equal Increase and Decrease",
formula:"Net decrease = x²/100%",
idea:"Equal increase and decrease never cancel.",
examples:[
"10% increase then 10% decrease → 1% decrease",
"20% increase then 20% decrease → 4% decrease",
"30% increase then 30% decrease → 9% decrease"
]
},
{
id:"base-100-method",
title:"Assume Base as 100",
idea:"When only percentages are given, assume the original quantity is 100.",
examples:[
{
question:"A value rises by 20% and then falls by 10%.",
method:"Assume 100 → 120 → 108. Final value is 8% more."
},
{
question:"A is 25% more than B.",
method:"Assume B=100, then A=125. Difference as a percentage of A is 25/125×100=20%."
}
]
},
{
id:"difference-percentage-total",
title:"Use Percentage Difference to Find Total",
idea:"In marks questions, difference in percentages corresponds to difference in marks.",
example:"30% fails by 20 and 40% passes by 30. Difference in marks=50 and percentage difference=10%. Total=50×100/10=500."
},
{
id:"comparison-ratio-method",
title:"Convert Percentage Comparison into Ratio",
idea:"Turn more-than and less-than statements into ratios.",
items:[
"If A is x% more than B, A:B = (100+x):100",
"If A is x% less than B, A:B = (100−x):100"
],
examples:[
"A is 25% more than B → A:B=125:100=5:4",
"A is 20% less than B → A:B=80:100=4:5"
]
},
{
id:"successive-factor-method",
title:"Multiply Factors for Repeated Changes",
idea:"For multiple years or repeated changes, multiply factors instead of calculating each percentage separately.",
examples:[
"10% growth for 2 years → multiply by 1.1²",
"20% decline for 3 years → multiply by 0.8³",
"10% rise then 20% fall → multiply by 1.1×0.8=0.88, so 12% decrease"
]
},
{
id:"quick-check-original-base",
title:"Always Identify the Base",
idea:"Ask: 'Percentage of what?' before calculating.",
checks:[
"In increase/decrease, base = original value.",
"In 'A is what percent of B?', base = B.",
"In pass/fail marks, base = total marks.",
"In savings, base may be income or original savings depending on the question."
]
},
{
id:"avoid-decimals",
title:"Cancel Before Multiplying",
idea:"Reduce fractions and cancel common factors to avoid long multiplication.",
examples:[
"35/100 × 240 → cancel 20 with 100 → 35×12/5 = 84",
"72/450 × 100 → cancel 50 → 72×2/9 = 16%"
]
},
{
id:"mental-benchmarks",
title:"Use Mental Benchmarks",
items:[
"5% = half of 10%",
"15% = 10% + 5%",
"30% = 3 × 10%",
"35% = 30% + 5%",
"45% = 50% − 5%",
"90% = 100% − 10%",
"99% = 100% − 1%"
],
examples:[
"45% of 200 = 100 − 10 = 90",
"99% of 650 = 650 − 6.5 = 643.5"
]
}
];

export const getPercentageShortcutById=id=>
percentageShortcuts.find(
shortcut=>shortcut.id===String(id)
)||null;

export default percentageShortcuts;