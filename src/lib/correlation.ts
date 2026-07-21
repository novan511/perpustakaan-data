import { DataPoint } from "@/types";

export interface CorrelationResult {
  r: number;
  rSquared: number;
  strength: "sangat kuat" | "kuat" | "sedang" | "lemah" | "sangat lemah" | "tidak ada";
  direction: "positif" | "negatif";
  scatterData: Array<{ x: number; y: number; periodX: string; periodY: string }>;
  regressionLine: { slope: number; intercept: number };
  sampleSize: number;
  simpleSummary: string;
  whatItMeans: string;
  analogy: string;
  confidence: string;
}

function pearsonCorrelation(x: number[], y: number[]): number {
  const n = Math.min(x.length, y.length);
  if (n < 3) return 0;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);
  const sumY2 = y.reduce((a, b) => a + b * b, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
  );

  if (denominator === 0) return 0;
  return numerator / denominator;
}

function linearRegression(
  x: number[],
  y: number[]
): { slope: number; intercept: number } {
  const n = Math.min(x.length, y.length);
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, b, i) => a + b * y[i], 0);
  const sumX2 = x.reduce((a, b) => a + b * b, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

function interpretCorrelation(r: number, labelX: string, labelY: string): Omit<CorrelationResult, "r" | "rSquared" | "scatterData" | "regressionLine" | "sampleSize"> {
  const absR = Math.abs(r);
  const isPos = r >= 0;
  const dir = isPos ? "positif" : "negatif";
  const arah = isPos ? "naik" : "turun";

  let strength: CorrelationResult["strength"];
  let simpleSummary: string;
  let whatItMeans: string;
  let analogy: string;
  let confidence: string;

  if (absR >= 0.8) {
    strength = "sangat kuat";
    simpleSummary = `${labelX} dan ${labelY} sangat berkaitan erat.`;
    whatItMeans = `Ketika ${labelX} ${arah}, ${labelY} hampir pasti juga ${arah}. Hubungan ini sangat bisa diandalkan untuk memprediksi.`;
    analogy = `Ibarat sepasang kekasih yang selalu kompak — kalau satu sedih, yang lain juga sedih. Kalau satu senang, yang lain juga senang.`;
    confidence = "Kamu bisa cukup yakin bahwa perubahan di satu variabel berkaitan dengan perubahan di variabel lainnya.";
  } else if (absR >= 0.6) {
    strength = "kuat";
    simpleSummary = `${labelX} dan ${labelY} punya hubungan yang cukup kuat.`;
    whatItMeans = `Umumnya, ketika ${labelX} ${arah}, ${labelY} juga cenderung ${arah}. Tapi ada pengecualian di beberapa kasus.`;
    analogy = `Ibarat teman sekamar — biasanya tidur dan bangun di waktu yang sama, tapi kadang ada yang begadang duluan.`;
    confidence = "Hubungan ini cukup bisa diandalkan, tapi jangan hanya mengandalkan satu variabel untuk prediksi.";
  } else if (absR >= 0.4) {
    strength = "sedang";
    simpleSummary = `${labelX} dan ${labelY} punya hubungan yang cukup terasa.`;
    whatItMeans = `Ada kecenderungan ${labelX} ${arah} → ${labelY} ${arah}, tapi hubungannya tidak selalu konsisten. Ada faktor lain yang juga mempengaruhi.`;
    analogy = `Ibarat rekan kerja — kadang sejalan, kadang tidak. Perlu komunikasi lebih untuk memahami polanya.`;
    confidence = "Hubungan ini ada, tapi jangan terlalu yakin. Butuh data atau konteks tambahan untuk konfirmasi.";
  } else if (absR >= 0.2) {
    strength = "lemah";
    simpleSummary = `${labelX} dan ${labelY} hanya sedikit saling berkaitan.`;
    whatItMeans = `Perubahan di ${labelX} tidak terlalu bisa menjelaskan perubahan di ${labelY}. Ada banyak faktor lain yang lebih berpengaruh.`;
    analogy = `Ibarat tetangga — sesekali saling sapa, tapi hidup masing-masing jalan sendiri.`;
    confidence = "Jangan terlalu yakin hubungan ini signifikan. Lebih baik cari variabel lain yang lebih berkaitan.";
  } else if (absR >= 0.05) {
    strength = "sangat lemah";
    simpleSummary = `${labelX} dan ${labelY} hampir tidak saling berkaitan.`;
    whatItMeans = `Perubahan di ${labelX} hampir tidak menjelaskan apa pun tentang perubahan di ${labelY}. Hubungannya sangat tipis.`;
    analogy = `Ibarat orang asing di kereta — berada di tempat yang sama tapi tidak saling mempengaruhi.`;
    confidence = "Hubungan ini sangat lemah. Kemungkinan besar kebetulan.";
  } else {
    strength = "tidak ada";
    simpleSummary = `${labelX} dan ${labelY} tidak saling berkaitan.`;
    whatItMeans = `Perubahan di ${labelX} sama sekali tidak berkaitan dengan perubahan di ${labelY}. Keduanya bergerak sendiri-sendiri.`;
    analogy = `Ibarat awan dan asphalt — dua hal yang tidak ada hubungannya sama sekali.`;
    confidence = "Tidak ada hubungan yang bisa diandalkan antara kedua variabel ini.";
  }

  return {
    strength,
    direction: dir,
    simpleSummary,
    whatItMeans,
    analogy,
    confidence,
  };
}

export function calculateCorrelation(
  dataX: DataPoint[],
  dataY: DataPoint[],
): CorrelationResult {
  const periodMapX = new Map(dataX.map((d) => [d.period, d.value]));
  const periodMapY = new Map(dataY.map((d) => [d.period, d.value]));

  const commonPeriods = dataX
    .filter((d) => periodMapY.has(d.period))
    .map((d) => d.period);

  const xValues = commonPeriods.map((p) => periodMapX.get(p)!);
  const yValues = commonPeriods.map((p) => periodMapY.get(p)!);

  const r = pearsonCorrelation(xValues, yValues);
  const regression = linearRegression(xValues, yValues);

  const scatterData = commonPeriods.map((period, i) => ({
    x: xValues[i],
    y: yValues[i],
    periodX: period,
    periodY: period,
  }));

  const labelX = dataX[0]?.label || "Variabel X";
  const labelY = dataY[0]?.label || "Variabel Y";
  const { strength, direction, simpleSummary, whatItMeans, analogy, confidence } = interpretCorrelation(r, labelX, labelY);

  return {
    r,
    rSquared: r * r,
    strength,
    direction,
    scatterData,
    regressionLine: regression,
    sampleSize: commonPeriods.length,
    simpleSummary,
    whatItMeans,
    analogy,
    confidence,
  };
}

export function formatR(value: number): string {
  return value.toFixed(4);
}
