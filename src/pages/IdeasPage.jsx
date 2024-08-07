import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-con/firebase_config";

export default function IdeasPage() {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = [];
      const querySnapshot = await getDocs(collection(db, "ideas"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedData.push({ name: data.name, idea: data.idea });
      });
      setAllData(fetchedData);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        height: "80vh",
      }}
    >
      <p style={{ fontSize: 50, fontWeight: "bold", color: "black" }}>
        All the ideas are displayed here
      </p>
      <table
        style={{
          borderCollapse: "collapse",
          borderStyle: "solid",
          borderWidth: 1,
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th style={{ borderStyle: "solid", borderWidth: 1 }}>id</th>
            <th style={{ borderStyle: "solid", borderWidth: 1 }}>Name</th>
            <th style={{ borderStyle: "solid", borderWidth: 1 }}>Ideas</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((item, index) => (
            <tr key={index}>
              <td style={{ borderStyle: "solid", borderWidth: 1 }}>
                {index + 1}
              </td>
              <td style={{ borderStyle: "solid", borderWidth: 1 }}>
                {item.name}
              </td>
              <td style={{ borderStyle: "solid", borderWidth: 1 }}>
                {item.idea}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
