import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Charts from "./components/Charts";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      const querySnapshot = await getDocs(collection(db, "patientData"));
      const result = querySnapshot.docs.map((doc) => doc.data());
      setData(result);
      console.log(
        "Sample Firebase record:",
        JSON.stringify(result[0], null, 2)
      );
    };

    fetchPatientData();
  }, []);

  const exportToJSON = () => {
    if (!data || data.length === 0) {
      alert("No data to export!");
      return;
    }

    const fileData = JSON.stringify(data, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "firebase_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "linear-gradient(to bottom, #fff9f5, #ffe5ec)",
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          width: "100%",
          backgroundColor: "#ffffffcc",
          padding: "2rem",
          margin: "1rem",
          borderRadius: "24px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            margin: "0 0 1rem 0",
            marginBottom: "1rem",
            color: "#8a5a44",
          }}
        >
          Patient Data Dashboard
        </h1>

        <button
          onClick={exportToJSON}
          style={{
            padding: "12px 24px",
            backgroundColor: "#ffb6b9",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            marginBottom: "1.5rem",
            boxShadow: "0 4px 10px rgba(255, 182, 185, 0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ff9aa2")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ffb6b9")}
        >
          📁 Export JSON for ML
        </button>

        <h2 style={{ fontSize: "1.5rem", color: "#7a4f4f" }}>
          📄 Raw JSON Data
        </h2>
        <pre
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            background: "#fff0f0",
            padding: "1rem",
            borderRadius: "12px",
            fontSize: "0.9rem",
            whiteSpace: "pre-wrap",
            border: "1px solid #ffd5d5",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>

        {data.length > 0 && (
          <>
            <h2
              style={{
                fontSize: "1.5rem",
                marginTop: "2rem",
                color: "#7a4f4f",
              }}
            >
              Visual Insights
            </h2>
            <div
              style={{
                background: "#fffafa",
                padding: "1rem",
                borderRadius: "12px",
                border: "1px solid #ffe3e3",
                marginTop: "1rem",
              }}
            >
              <Charts data={data} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
