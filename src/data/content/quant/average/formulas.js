const f = (id, name, formula, usage, condition = "") => ({ id, name, formula, usage, condition });

const formulas = {
  title: "Average Formulas",
  description: "SSC CGL Average topic complete formula bank with usage conditions.",
  estimatedMinutes: 40,
  sections: [
    {
      id: "basics",
      title: "Core Formulas",
      formulas: [
        f("AVG-F-001", "Arithmetic Average", "Average = Sum of observations / Number of observations", "Basic average calculate cheyyadaniki.", "Count non-zero undali."),
        f("AVG-F-002", "Total from Average", "Sum = Average × Count", "Average and count nunchi total find cheyyadaniki."),
        f("AVG-F-003", "Count from Total", "Count = Sum / Average", "Total and average nunchi observations count find cheyyadaniki.", "Average non-zero undali."),
        f("AVG-F-004", "Missing Value", "Missing value = Required total − Sum of known values", "Oka observation missing unnappudu."),
        f("AVG-F-005", "Assumed Average", "Actual average = Assumed average + Σdeviations/n", "Close or large values fast-ga average cheyyadaniki.")
      ]
    },
    {
      id: "series",
      title: "Consecutive Numbers and AP",
      formulas: [
        f("AVG-F-006", "AP Average", "Average = (First term + Last term)/2", "Equally spaced series average.", "Common difference constant undali."),
        f("AVG-F-007", "Odd-count AP", "Average = Middle term", "Odd number of equally spaced terms."),
        f("AVG-F-008", "First n Natural Numbers", "Average = (n+1)/2", "1 to n natural numbers."),
        f("AVG-F-009", "First n Even Numbers", "Average = n+1", "2,4,...,2n."),
        f("AVG-F-010", "First n Odd Numbers", "Average = n", "1,3,...,2n−1."),
        f("AVG-F-011", "Consecutive Integers", "Average of a to b = (a+b)/2", "All integers a through b included.")
      ]
    },
    {
      id: "uniform-change",
      title: "Uniform Change",
      formulas: [
        f("AVG-F-012", "Same Addition", "New average = Old average + k", "Every observation ki k add ayinappudu."),
        f("AVG-F-013", "Same Subtraction", "New average = Old average − k", "Every observation nunchi k subtract ayinappudu."),
        f("AVG-F-014", "Same Multiplication", "New average = k × Old average", "Every observation-ni k tho multiply chesinappudu."),
        f("AVG-F-015", "Same Division", "New average = Old average / k", "Every observation-ni k tho divide chesinappudu.", "k≠0.")
      ]
    },
    {
      id: "inclusion-exclusion",
      title: "Adding and Removing Observations",
      formulas: [
        f("AVG-F-016", "One Added Value", "Added value = (n+1)A₂ − nA₁", "n values average A1; one joins and average A2."),
        f("AVG-F-017", "One Removed Value", "Removed value = nA₁ − (n−1)A₂", "n values average A1; one leaves and average A2."),
        f("AVG-F-018", "k Added Values Sum", "Added sum = (n+k)A₂ − nA₁", "k new observations join."),
        f("AVG-F-019", "k Removed Values Sum", "Removed sum = nA₁ − (n−k)A₂", "k observations leave."),
        f("AVG-F-020", "Average Change after One Addition", "A₂−A₁ = (x−A₁)/(n+1)", "Added value x effect quickly find cheyyadaniki."),
        f("AVG-F-021", "Average Change after One Removal", "A₂−A₁ = (A₁−x)/(n−1)", "Removed value x effect quickly find cheyyadaniki.")
      ]
    },
    {
      id: "replacement-correction",
      title: "Replacement and Correction",
      formulas: [
        f("AVG-F-022", "One Replacement", "New average = Old average + (New value−Old value)/n", "Count same-ga one observation replace ayinappudu."),
        f("AVG-F-023", "Replacement Difference", "New value−Old value = n(New average−Old average)", "Average change nunchi replacement difference find cheyyadaniki."),
        f("AVG-F-024", "Wrong Entry Correction", "Correct average = Wrong average + (Correct entry−Wrong entry)/n", "Oka wrong entry correct chesinappudu."),
        f("AVG-F-025", "Multiple Corrections", "Correct average = Wrong average + Σ(correct−wrong)/n", "Multiple wrong entries unnappudu.")
      ]
    },
    {
      id: "combined-weighted",
      title: "Combined and Weighted Average",
      formulas: [
        f("AVG-F-026", "Two-group Combined Average", "A = (n₁A₁+n₂A₂)/(n₁+n₂)", "Two groups combine chesinappudu."),
        f("AVG-F-027", "Multi-group Combined Average", "A = Σ(nᵢAᵢ)/Σnᵢ", "Three or more groups combine chesinappudu."),
        f("AVG-F-028", "Weighted Average", "Weighted average = Σ(wᵢxᵢ)/Σwᵢ", "Values ki weights/frequencies different unnappudu."),
        f("AVG-F-029", "Group-size Ratio", "n₁:n₂ = (A₂−A):(A−A₁)", "Two group averages and combined average nunchi size ratio.", "A₁<A<A₂."),
        f("AVG-F-030", "Equal-size Groups", "Combined average = (A₁+A₂+...+Aₖ)/k", "All groups sizes equal unnappudu.")
      ]
    },
    {
      id: "targets-applications",
      title: "Target and Application Formulas",
      formulas: [
        f("AVG-F-031", "Required Next Score", "Required score = Target average×new count − Current average×current count", "Runs, marks or sales target average."),
        f("AVG-F-032", "Same Group Age", "New average age = Old average age + elapsed years", "Same persons remain in group."),
        f("AVG-F-033", "Average Expenditure", "Average expenditure = Total expenditure/number of periods", "Monthly/daily expenditure questions."),
        f("AVG-F-034", "Known Part Average", "Unknown-part sum = Overall total−Known-part total", "Group split questions.")
      ]
    },
    {
      id: "average-speed",
      title: "Average Speed",
      formulas: [
        f("AVG-F-035", "General Average Speed", "Average speed = Total distance/Total time", "Any journey average speed."),
        f("AVG-F-036", "Two Equal Distances", "Average speed = 2xy/(x+y)", "Same distance at speeds x and y."),
        f("AVG-F-037", "Two Equal Times", "Average speed = (x+y)/2", "Same time at speeds x and y."),
        f("AVG-F-038", "n Equal Distances", "Average speed = n/(1/x₁+1/x₂+...+1/xₙ)", "Each leg distance equal."),
        f("AVG-F-039", "Distance-weighted Speed", "Average speed = Σdᵢ / Σ(dᵢ/vᵢ)", "Leg distances and speeds different."),
        f("AVG-F-040", "Time-weighted Speed", "Average speed = Σ(vᵢtᵢ)/Σtᵢ", "Travel times given.")
      ]
    }
  ],
  quickRevision: [
    "A=S/n and S=A×n.", "Missing value=required total−known total.", "AP average=(first+last)/2.",
    "Uniform change in all values gives same change in average.", "Replacement effect=(new−old)/n.",
    "Correct−wrong entry adjustment use cheyyi.", "Combined average is total-weighted, not simple average.",
    "Group ratio uses opposite deviations.", "Average speed always total distance/total time.",
    "Equal distance: harmonic mean; equal time: arithmetic mean."
  ],
  masteryRequirements: { totalFormulas: 40, minimumRecallAccuracy: 85, recommendedRevisionMinutes: 40, nextModule: "shortcuts" }
};

export default formulas;
