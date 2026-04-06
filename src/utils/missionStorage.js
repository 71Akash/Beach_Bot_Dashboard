export function saveMissionToLocal(mission) {
  const existing = JSON.parse(localStorage.getItem("savedMissions") || "[]");
  const updated = [mission, ...existing];
  localStorage.setItem("savedMissions", JSON.stringify(updated));
}

export function getSavedMissions() {
  return JSON.parse(localStorage.getItem("savedMissions") || "[]");
}

export function deleteMission(index) {
  const existing = JSON.parse(localStorage.getItem("savedMissions") || "[]");
  existing.splice(index, 1);
  localStorage.setItem("savedMissions", JSON.stringify(existing));
  localStorage.setItem("currentMission", JSON.stringify(null));
}