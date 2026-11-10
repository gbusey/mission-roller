# Mission Roller

A browser-only GM utility for resolving Pathfinder 2e organization missions. 

The page includes Cloudflare Web Analytics using the beacon configured in `index.html`.

## Rules

Enter a positive whole-number Mission DC and adjust the three modifiers. The success chance counts d20 faces whose modified total meets or exceeds the DC, including critical successes. Each face contributes 5 percentage points. Natural 1 and 20 adjustments apply only to the rolled outcome.

A total at least 10 above the DC is a critical success, and a total at least 10 below is a critical failure. Other totals at or above the DC succeed, and other totals below it fail. A natural 20 moves the outcome up one degree and a natural 1 moves it down one degree, within the four possible degrees.

## Degree test cases

Open the app and call `getDegree(natural, modifier, dc).label` in the browser console with the inputs below.

| Natural | Modifier | DC | Expected degree | Case |
| ---: | ---: | ---: | --- | --- |
| 15 | +15 | 20 | Critical Success | Exactly 10 above |
| 14 | +15 | 20 | Success | Exactly 9 above |
| 15 | +5 | 20 | Success | Exactly at DC |
| 14 | +5 | 20 | Failure | Exactly 1 below |
| 11 | 0 | 20 | Failure | Exactly 9 below |
| 10 | 0 | 20 | Critical Failure | Exactly 10 below |
| 1 | +15 | 6 | Success | Natural 1 lowers critical success |
| 1 | +15 | 16 | Failure | Natural 1 lowers success |
| 1 | 0 | 2 | Critical Failure | Natural 1 lowers failure |
| 1 | 0 | 20 | Critical Failure | Natural 1 stays at the lower bound |
| 20 | 0 | 30 | Failure | Natural 20 raises critical failure |
| 20 | 0 | 21 | Success | Natural 20 raises failure |
| 20 | 0 | 20 | Critical Success | Natural 20 raises success |
| 20 | 0 | 10 | Critical Success | Natural 20 stays at the upper bound |
