const makeExample=(id,difficulty,question,solution,answer,concept,shortcut="")=>({id,difficulty,question,solution,answer,concept,shortcut});
const examples={title:"Ratio and Proportion Solved Examples",description:"SSC CGL-oriented solved examples from basics to advanced level.",estimatedMinutes:75,examples:[
makeExample("RAP-E-001","basic","Simplify 840:1260.","HCF=420. 840÷420:1260÷420=2:3.","2:3","simplification","Divide by HCF."),
makeExample("RAP-E-002","basic","Convert 1.5 kg:750 g.","1.5 kg=1500 g. 1500:750=2:1.","2:1","unit conversion","Same units first."),
makeExample("RAP-E-003","basic","Find x if 8:12=14:x.","8x=12×14; x=21.","21","proportion","Cross multiply."),
makeExample("RAP-E-004","basic","Find mean proportional between 16 and 36.","√(16×36)=√576=24.","24","mean proportional"),
makeExample("RAP-E-005","basic","Divide ₹1320 in 5:6.","Total parts=11; one part=120; shares=600,720.","₹600 and ₹720","division"),
makeExample("RAP-E-006","basic","A:B=3:7 and A+B=250. Find A and B.","10 parts=250; one part=25.","75 and 175","sum given"),
makeExample("RAP-E-007","moderate","A:B=4:5 and B:C=6:7. Find A:B:C.","Make B=30. First ratio×6=24:30; second×5=30:35.","24:30:35","combining ratios"),
makeExample("RAP-E-008","moderate","15 workers finish work in 24 days. 18 workers need?","Workers×days constant:15×24=18d; d=20.","20 days","inverse proportion"),
makeExample("RAP-E-009","moderate","Two numbers are 5:8 and differ by 45.","3 parts=45; one part=15; numbers=75,120.","75 and 120","difference given"),
makeExample("RAP-E-010","moderate","A:B=3:5. Adding 12 to both makes ratio 5:7. Find values.","(3x+12)/(5x+12)=5/7; 21x+84=25x+60; x=6.","18 and 30","ratio change"),
makeExample("RAP-E-011","moderate","Father:son=7:2; after 5 years ratio=8:3. Find present ages.","(7x+5)/(2x+5)=8/3; 21x+15=16x+40; x=5.","35 and 10 years","ages"),
makeExample("RAP-E-012","moderate","Income:expenditure=9:7 and savings ₹6000. Find income.","Savings=2 parts=6000; one part=3000; income=9×3000.","₹27,000","income-expenditure"),
makeExample("RAP-E-013","advanced","A:B=2:3, B:C=4:5 and C:D=10:7. Find A:B:C:D.","First two give 8:12:15. Match C=30: multiply by 2, and C:D=30:21.","16:24:30:21","ratio chain"),
makeExample("RAP-E-014","advanced","If (x+y):(x−y)=11:5, find x:y.","x:y=(11+5):(11−5)=16:6=8:3.","8:3","componendo-dividendo"),
makeExample("RAP-E-015","advanced","A invests ₹24,000 for 8 months; B ₹18,000 for 12 months. Profit ₹34,000. Find A share.","Capital-time ratio=192000:216000=8:9. A share=34000×8/17.","₹16,000","investment ratio"),
makeExample("RAP-E-016","advanced","A is 20% more than B and B is 25% less than C. Find A:C.","A:B=6:5; B:C=3:4. Match B=15 ⇒ A:B:C=18:15:20.","9:10","percentage ratio"),
makeExample("RAP-E-017","advanced","If a:b=5:3, find (2a+3b):(2a−b).","Put a=5k,b=3k. Ratio=(10+9):(10−3)=19:7.","19:7","substitution"),
makeExample("RAP-E-018","advanced","Milk:water=7:3 in 40 L. How much water makes ratio 7:5?","Milk=28 L, water=12 L. 28:(12+x)=7:5; 140=84+7x; x=8.","8 L","ratio change")
],examStrategy:["Units same-ga convert cheyyi.","Total aa difference aa identify cheyyi.","Linked ratios lo common term equal cheyyi.","More–more direct; more–less inverse.","Final ratio simplest form and asked order lo ivvu."],masteryRequirements:{totalExamples:18,minimumAccuracy:85,nextModule:"conceptCheck"}};
export default examples;
