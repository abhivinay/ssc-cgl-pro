const percentageFormulas=[
{
id:"basic-percentage",
title:"Basic Percentage Formula",
formula:"Percentage = (Part / Whole) × 100",
use:"Use when one quantity must be expressed as a percentage of another.",
example:"45 out of 60 = 45/60 × 100 = 75%"
},
{
id:"part-from-percentage",
title:"Find the Part",
formula:"Part = Percentage × Whole / 100",
use:"Use when the total and percentage are known.",
example:"35% of 240 = 35/100 × 240 = 84"
},
{
id:"whole-from-part",
title:"Find the Whole",
formula:"Whole = Part × 100 / Percentage",
use:"Use when the part and percentage are known.",
example:"72 is 24% of a number, so number = 72 × 100 / 24 = 300"
},
{
id:"percentage-increase",
title:"Percentage Increase",
formula:"Percentage Increase = Increase / Original Value × 100",
use:"Original value must be used as the denominator.",
example:"400 to 460: increase = 60, so 60/400 × 100 = 15%"
},
{
id:"percentage-decrease",
title:"Percentage Decrease",
formula:"Percentage Decrease = Decrease / Original Value × 100",
use:"Original value must be used as the denominator.",
example:"500 to 425: decrease = 75, so 75/500 × 100 = 15%"
},
{
id:"new-value-after-increase",
title:"New Value After Increase",
formula:"New Value = Original Value × (100 + x) / 100",
use:"Use when a value increases by x%.",
example:"₹800 increased by 25% = 800 × 125/100 = ₹1000"
},
{
id:"new-value-after-decrease",
title:"New Value After Decrease",
formula:"New Value = Original Value × (100 - x) / 100",
use:"Use when a value decreases by x%.",
example:"₹800 decreased by 25% = 800 × 75/100 = ₹600"
},
{
id:"original-after-increase",
title:"Original Value After Increase",
formula:"Original Value = New Value × 100 / (100 + x)",
use:"Use in reverse-percentage questions after an increase.",
example:"After 20% increase, value is 240. Original = 240 × 100/120 = 200"
},
{
id:"original-after-decrease",
title:"Original Value After Decrease",
formula:"Original Value = New Value × 100 / (100 - x)",
use:"Use in reverse-percentage questions after a decrease.",
example:"After 25% decrease, value is 600. Original = 600 × 100/75 = 800"
},
{
id:"successive-change",
title:"Successive Percentage Change",
formula:"Net Change = a + b + ab/100",
use:"Take increases as positive and decreases as negative.",
example:"20% increase and 10% decrease = 20 - 10 - 2 = 8% increase"
},
{
id:"equal-increase-decrease",
title:"Equal Increase and Decrease",
formula:"Net Decrease = x² / 100 %",
use:"When a quantity rises by x% and then falls by x%.",
example:"20% increase then 20% decrease = 20²/100 = 4% decrease"
},
{
id:"more-to-less",
title:"Reverse Comparison: More to Less",
formula:"If A is x% more than B, then B is [100x / (100 + x)]% less than A",
use:"The base changes from B to A.",
example:"A is 25% more than B, so B is 100×25/125 = 20% less than A"
},
{
id:"less-to-more",
title:"Reverse Comparison: Less to More",
formula:"If A is x% less than B, then B is [100x / (100 - x)]% more than A",
use:"The base changes from B to A.",
example:"A is 20% less than B, so B is 100×20/80 = 25% more than A"
},
{
id:"population-growth",
title:"Population After Growth",
formula:"Future Population = Present Population × (1 + r/100)ⁿ",
use:"Use for repeated annual percentage growth.",
example:"20000 at 10% for 2 years = 20000 × 1.1² = 24200"
},
{
id:"population-decline",
title:"Population After Decline",
formula:"Future Population = Present Population × (1 - r/100)ⁿ",
use:"Use for repeated annual percentage decline.",
example:"50000 declining 10% for 2 years = 50000 × 0.9² = 40500"
},
{
id:"past-population",
title:"Population in the Past",
formula:"Past Population = Present Population ÷ (1 ± r/100)ⁿ",
use:"Use reverse calculation depending on growth or decline.",
example:"Present 24200 after 10% growth for 2 years: 24200 ÷ 1.21 = 20000"
},
{
id:"marks-obtained",
title:"Marks Obtained",
formula:"Marks Obtained = Percentage × Total Marks / 100",
use:"Use when percentage and total marks are given.",
example:"72% of 500 = 360 marks"
},
{
id:"total-marks",
title:"Total Marks",
formula:"Total Marks = Marks Obtained × 100 / Percentage",
use:"Use when marks obtained and percentage are known.",
example:"360 marks represent 72%, so total = 360 × 100/72 = 500"
},
{
id:"savings",
title:"Savings",
formula:"Savings = Income - Expenditure",
use:"Percentage changes in income and expenditure should be applied separately.",
example:"Income ₹10000, expenditure ₹8000, savings = ₹2000"
}
];

export const getPercentageFormulaById=id=>
percentageFormulas.find(
formula=>formula.id===String(id)
)||null;

export default percentageFormulas;