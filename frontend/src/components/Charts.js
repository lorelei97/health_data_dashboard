import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Charts({ data }) {
  const chartData = data.map((item, index) => {
    const heartRates = item.vitals?.heart_rate || [];
    const avgHeartRate = heartRates.length
      ? heartRates.reduce((sum, val) => sum + val, 0) / heartRates.length
      : 0;
    const tempReadings = item.vitals?.temperature || [];
    const avgTemp = tempReadings.length
      ? tempReadings.reduce((sum, val) => sum + val, 0) / tempReadings.length
      : 0;

    return {
      day: `Day ${index + 1}`,
      heartRate: Math.round(avgHeartRate),
      avgTemp: parseFloat(avgTemp.toFixed(1)),
      steps: item.activity?.steps || 0,
      activeMinutes: item.activity?.active_minutes || 0,
      sleepHours: item.sleep?.duration_hours || 0,
      sleepInterruptions: item.sleep?.interruptions || 0,
      calories: item.nutrition?.calories || 0,
      waterIntake: item.nutrition?.water_oz || 0,
      protein: item.nutrition?.macros?.protein_g ?? 0,
      carbs: item.nutrition?.macros?.carbs_g ?? 0,
      fat: item.nutrition?.macros?.fat_g ?? 0,
    };
  });

  const chartStyle = {
    background: "#fffafc",
    border: "1px solid #ffe3e3",
    borderRadius: "16px",
    padding: "1rem",
    boxShadow: "0 4px 12px rgba(255, 183, 197, 0.2)",
    margin: "1rem",
    width: "calc(50% - 2rem)",
    minWidth: "300px",
    flex: "0 0 calc(50% - 2rem)",
    boxSizing: "border-box",
  };

  const headingStyle = {
    textAlign: "center",
    fontSize: "1.6rem",
    color: "#7a4f4f",
    marginBottom: "2rem",
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "'Quicksand', sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ ...headingStyle, marginTop: "0" }}>Health Overview</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={chartStyle}>
          <h4 style={{ color: "#8a5a44", marginBottom: "1rem" }}>
            Average Heart Rate
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="heartRate" stroke="#ff9aa2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={chartStyle}>
          <h4 style={{ color: "#8a5a44", marginBottom: "1rem" }}>
            Daily Steps
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="steps" fill="#a0e7e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={chartStyle}>
          <h4 style={{ color: "#8a5a44", marginBottom: "1rem" }}>
            Sleep Duration (hours)
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sleepHours" fill="#ffd6e0" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={chartStyle}>
          <h4 style={{ color: "#8a5a44", marginBottom: "1rem" }}>
            Sleep Overview (Duration & Interruptions)
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="sleepHours"
                name="Sleep Duration (hrs)"
                fill="#b5ead7"
              />
              <Line
                type="monotone"
                dataKey="sleepInterruptions"
                name="Sleep Interruptions"
                stroke="#ff8fab"
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div style={chartStyle}>
          <h4 style={{ color: "#8a5a44", marginBottom: "1rem" }}>
            Water Intake (liters)
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="waterIntake" fill="#bae1ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={chartStyle}>
          <h4 style={{ color: "#8a5a44", marginBottom: "1rem" }}>
            Daily Caloric Intake
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calories" fill="#ffdac1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ marginTop: "3rem" }}>
          <h4 style={{ color: "#2a9d8f", marginBottom: "1rem" }}>
            Vitals Summary (Average Heart Rate & Temperature)
          </h4>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "center",
            }}
          >
            <thead style={{ backgroundColor: "#e0f7fa" }}>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Day
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Avg. Heart Rate (bpm)
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Avg. Temperature (°F)
                </th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f1f1f1",
                  }}
                >
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {item.day}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {item.heartRate || "N/A"}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {item.avgTemp || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
