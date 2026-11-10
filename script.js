"use strict";

const degrees = [
  { label: "Critical Failure", className: "critical-failure" },
  { label: "Failure", className: "failure" },
  { label: "Success", className: "success" },
  { label: "Critical Success", className: "critical-success" },
];

function getDegree(natural, modifier, dc) {
  const margin = natural + modifier - dc;
  let degree = 1;
  if (margin >= 10) degree = 3;
  else if (margin >= 0) degree = 2;
  else if (margin <= -10) degree = 0;

  if (natural === 20) degree += 1;
  else if (natural === 1) degree -= 1;
  return degrees[Math.min(3, Math.max(0, degree))];
}

function rollD20() {
  const sample = new Uint32Array(1);
  const limit = Math.floor(2 ** 32 / 20) * 20;
  // Discard the incomplete block so every remainder is equally likely.
  do {
    crypto.getRandomValues(sample);
  } while (sample[0] >= limit);
  return (sample[0] % 20) + 1;
}

const byId = (id) => document.getElementById(id);
const signed = (value) => value < 0 ? `−${Math.abs(value)}` : `+${value}`;
const form = byId("mission-form");
const dcInput = byId("dc");
const leaderInput = byId("leader");
const advantagesInput = byId("advantages");
const penaltiesInput = byId("penalties");
const result = byId("result");
const emptyResult = byId("empty-result");

function updateSetup() {
  const dc = dcInput.valueAsNumber;
  const valid = dcInput.validity.valid && Number.isSafeInteger(dc);
  const leader = leaderInput.valueAsNumber;
  const advantages = advantagesInput.valueAsNumber;
  const penalties = penaltiesInput.valueAsNumber;
  const modifier = leader + advantages - penalties;

  dcInput.setAttribute("aria-invalid", String(!valid));
  byId("dc-error").hidden = valid;
  byId("leader-value").textContent = signed(leader);
  byId("advantages-value").textContent = signed(advantages);
  byId("penalties-value").textContent = penalties ? signed(-penalties) : "0";
  penaltiesInput.setAttribute("aria-valuetext", penalties ? `minus ${penalties}` : "0");
  byId("modifier").textContent = signed(modifier);

  // Each natural face that meets the DC contributes five percentage points.
  const successfulFaces = Math.max(0, Math.min(20, 21 + modifier - dc));
  byId("chance").textContent = valid ? `${successfulFaces * 5}%` : "—";
  result.hidden = true;
  emptyResult.hidden = false;

  return { valid, dc, modifier };
}

form.addEventListener("input", updateSetup);
// The reset event fires before the browser restores the default values.
form.addEventListener("reset", () => setTimeout(updateSetup, 0));
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { valid, dc, modifier } = updateSetup();
  if (!valid) {
    dcInput.focus();
    return;
  }

  const natural = rollD20();
  const degree = getDegree(natural, modifier, dc);
  byId("degree").className = degree.className;
  byId("degree").textContent = degree.label;
  byId("natural").textContent = natural;
  byId("rolled-modifier").textContent = signed(modifier);
  byId("total").textContent = natural + modifier;
  byId("rolled-dc").textContent = dc;
  emptyResult.hidden = true;
  result.hidden = false;
});

updateSetup();
