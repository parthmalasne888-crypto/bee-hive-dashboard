export const hives = [
  { id: "07", name: "HIVE 07", location: "Nashik, Maharashtra", health: 94, temperature: 34.2, humidity: 67, weight: 42.8, activity: 88, battery: 94, status: "Healthy", alert: "Stable colony behaviour", delta: "+1.4 kg" },
  { id: "03", name: "HIVE 03", location: "Nashik, Maharashtra", health: 74, temperature: 36.8, humidity: 71, weight: 34.9, activity: 63, battery: 71, status: "Attention", alert: "Unusual weight change detected", delta: "-2.1 kg" },
  { id: "02", name: "HIVE 02", location: "Nashik, Maharashtra", health: 91, temperature: 34.0, humidity: 64, weight: 40.2, activity: 84, battery: 88, status: "Healthy", alert: "Strong foraging activity", delta: "+0.9 kg" },
  { id: "04", name: "HIVE 04", location: "Nashik, Maharashtra", health: 61, temperature: 38.9, humidity: 78, weight: 34.2, activity: 47, battery: 56, status: "Critical", alert: "Heat stress needs inspection", delta: "-3.8 kg" },
];

export const products = [
  { id:"hs-001", name:"Wild Forest Honey", origin:"Maharashtra", type:"Wild forest", weight:"500 g", price:"₹720", seller:"Sahyadri Apiaries", availability:"18 jars", batch:"HS-2026-001", harvest:"18 September 2026", hive:"HIVE 07", hue:"forest", rating:"4.9", tone:"#48695f" },
  { id:"hs-002", name:"Farm Harvest Honey", origin:"Maharashtra", type:"Multi-floral", weight:"500 g", price:"₹590", seller:"Green Valley Farm", availability:"24 jars", batch:"HS-2026-002", harvest:"15 September 2026", hive:"HIVE 02", hue:"gold", rating:"4.8", tone:"#b27633" },
  { id:"hs-003", name:"Raw Wildflower Honey", origin:"Western Ghats", type:"Wildflower", weight:"500 g", price:"₹650", seller:"Western Ghats Collective", availability:"11 jars", batch:"HS-2026-003", harvest:"12 September 2026", hive:"HIVE 03", hue:"amber", rating:"4.7", tone:"#8c5a30" },
  { id:"hs-004", name:"Citrus Grove Honey", origin:"Konkan", type:"Citrus floral", weight:"350 g", price:"₹520", seller:"Konkan Bee Works", availability:"31 jars", batch:"HS-2026-004", harvest:"09 September 2026", hive:"HIVE 02", hue:"citrus", rating:"4.8", tone:"#9ca747" },
];

export const series = {
  temperature:[33.8,34,34.1,34.4,34.2,34.3,34.1,34.2,34.4,34.3,34.5,34.2],
  weight:[41.4,41.5,41.6,41.8,42.0,42.2,42.3,42.4,42.6,42.7,42.75,42.8],
  humidity:[62,64,65,66,67,66,65,66,67,66,68,67],
  activity:[20,18,28,44,62,79,92,88,74,63,51,43],
  health:[91,91,92,93,93,94,94,94,94,94,94,94],
};

export const events = [
  { time: "09:20", label: "Foraging activity increased", type: "activity" },
  { time: "12:45", label: "Weight gain detected", type: "weight" },
  { time: "15:10", label: "Temperature stable", type: "temperature" },
  { time: "18:30", label: "Activity tapering normally", type: "activity" },
];
