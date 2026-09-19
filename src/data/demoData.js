export const hives = [
  { id: "07", name: "HIVE 07", location: "Nashik, Maharashtra", health: 94, temperature: 34.2, humidity: 67, weight: 42.8, activity: 88, battery: 94, status: "Healthy", alert: "Stable colony behaviour" },
  { id: "03", name: "HIVE 03", location: "Nashik, Maharashtra", health: 74, temperature: 36.8, humidity: 71, weight: 34.9, activity: 63, battery: 71, status: "Attention", alert: "Unusual weight change detected" },
  { id: "02", name: "HIVE 02", location: "Nashik, Maharashtra", health: 91, temperature: 34.0, humidity: 64, weight: 40.2, activity: 84, battery: 88, status: "Healthy", alert: "Strong foraging activity" },
  { id: "04", name: "HIVE 04", location: "Nashik, Maharashtra", health: 61, temperature: 38.9, humidity: 78, weight: 34.2, activity: 47, battery: 56, status: "Critical", alert: "Heat stress needs inspection" },
];

export const products = [
  { id:"hs-001", name:"Wild Forest Honey", origin:"Maharashtra", type:"Wild forest", weight:"500 g", price:"₹720", seller:"Sahyadri Apiaries", availability:"18 jars", batch:"HS-2026-001", harvest:"18 September 2026", hive:"HIVE 07", hue:"forest" },
  { id:"hs-002", name:"Farm Harvest Honey", origin:"Maharashtra", type:"Multi-floral", weight:"500 g", price:"₹590", seller:"Green Valley Farm", availability:"24 jars", batch:"HS-2026-002", harvest:"15 September 2026", hive:"HIVE 02", hue:"gold" },
  { id:"hs-003", name:"Raw Wildflower Honey", origin:"Western Ghats", type:"Wildflower", weight:"500 g", price:"₹650", seller:"Western Ghats Collective", availability:"11 jars", batch:"HS-2026-003", harvest:"12 September 2026", hive:"HIVE 03", hue:"amber" },
];

const series = {
  temperature: [33.8, 33.9, 34.0, 34.1, 34.0, 34.2, 34.3, 34.4, 34.3, 34.2, 34.1, 34.2, 34.2, 34.3, 34.2, 34.4, 34.5, 34.4, 34.3, 34.2, 34.1, 34.2, 34.2, 34.2],
  weight:      [41.4, 41.5, 41.6, 41.6, 41.7, 41.8, 42.0, 42.1, 42.0, 42.2, 42.3, 42.4, 42.4, 42.5, 42.5, 42.6, 42.7, 42.7, 42.8, 42.8, 42.7, 42.8, 42.8, 42.8],
  humidity:    [62, 62, 63, 64, 64, 65, 65, 66, 66, 67, 67, 66, 66, 67, 68, 68, 67, 67, 66, 66, 67, 67, 67, 67],
  activity:    [18, 20, 18, 24, 31, 42, 58, 71, 83, 89, 92, 94, 91, 88, 84, 79, 70, 61, 52, 43, 36, 28, 23, 20],
  health:      [91, 91, 92, 92, 93, 93, 93, 93, 94, 94, 94, 94, 94, 94, 94, 94, 95, 95, 94, 94, 94, 94, 94, 94],
};

export { series };

export function getHiveSeries(hive, tick = 0) {
  const risk = hive.status === "Critical" ? 1.45 : hive.status === "Attention" ? 0.8 : 0.35;
  const phase = tick * 0.22;
  const smooth = (arr, amp, offset = 0) => arr.map((value, index) => {
    const movement = Math.sin(index * 0.42 + phase + offset) * amp;
    return Number((value + movement).toFixed(1));
  });

  return {
    temperature: smooth(series.temperature.map((v) => v + (hive.temperature - series.temperature.at(-1)) * 0.55), 0.12 * risk, 0.3),
    weight: smooth(series.weight.map((v) => v + (hive.weight - series.weight.at(-1)) * 0.82), 0.06 * risk, 0.8),
    humidity: smooth(series.humidity.map((v) => v + (hive.humidity - series.humidity.at(-1)) * 0.65), 0.65 * risk, 1.2),
    activity: series.activity.map((v, index) => Math.max(8, Math.min(100, Math.round(v + (hive.activity - series.activity.at(-1)) * 0.58 + Math.sin(index * 0.55 + phase) * 2.2 * risk)))),
    health: smooth(series.health.map((v) => v + (hive.health - series.health.at(-1)) * 0.88), 0.12 * risk, 0.6).map((v) => Math.max(0, Math.min(100, Math.round(v)))),
  };
}

export function getHourlyLabels() {
  return ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
}
