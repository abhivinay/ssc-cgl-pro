const commonMistakes = {
  "id": "sci-common-mistakes",
  "title": "Common Mistakes and SSC Traps",
  "items": [
    {
      "id": "M01",
      "mistake": "Using months directly as years",
      "correction": "Convert months/12 before SI formula."
    },
    {
      "id": "M02",
      "mistake": "Treating amount as interest",
      "correction": "Interest=A−P."
    },
    {
      "id": "M03",
      "mistake": "Not halving rate for half-yearly CI",
      "correction": "Use R/2 per half-year."
    },
    {
      "id": "M04",
      "mistake": "Not doubling periods for half-yearly CI",
      "correction": "Use 2T periods."
    },
    {
      "id": "M05",
      "mistake": "Not quartering rate for quarterly CI",
      "correction": "Use R/4."
    },
    {
      "id": "M06",
      "mistake": "Averaging unequal yearly rates",
      "correction": "Multiply growth factors."
    },
    {
      "id": "M07",
      "mistake": "Using plus sign for depreciation",
      "correction": "Use 1−R/100."
    },
    {
      "id": "M08",
      "mistake": "Assuming equal rise and fall cancel",
      "correction": "They cause x²/100 loss."
    },
    {
      "id": "M09",
      "mistake": "Using 2-year difference formula for 3 years",
      "correction": "3-year formula has extra factor 3+r."
    },
    {
      "id": "M10",
      "mistake": "Thinking SI and CI differ in first year",
      "correction": "They are equal for one year."
    },
    {
      "id": "M11",
      "mistake": "Rounding too early",
      "correction": "Keep fractions/factors until final step."
    },
    {
      "id": "M12",
      "mistake": "Ignoring asked unit",
      "correction": "Return months/years/rupees/% exactly."
    },
    {
      "id": "M13",
      "mistake": "Reverse growth by subtraction",
      "correction": "Divide by growth factor."
    },
    {
      "id": "M14",
      "mistake": "Applying annual compounding to fractional period blindly",
      "correction": "Follow stated convention."
    },
    {
      "id": "M15",
      "mistake": "No answer sanity check",
      "correction": "Positive rate: A>P and CI≥SI."
    }
  ],
  "finalWarning": "Compounding frequency chadavakunda calculation start cheyyadam ee chapter lo biggest avoidable error."
};

export default commonMistakes;
