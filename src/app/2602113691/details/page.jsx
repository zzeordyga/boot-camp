"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function Details() {
  const searchParams = useSearchParams();
  const fact = searchParams.get("fact");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("Thank you for your feedback!")
    router.push('/2602113691')
  }

  return (
    <div style={{ backgroundColor: "#99a1af", padding: 20, borderRadius: 10 }}>
      <p>{fact}</p>
      <p>How would you rate this fun fact?</p>
      <div style={{ display: "flex", gap: 30, width: 250 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <input type="radio" name="rating" id="1" value={1} />
          <label style={{ textAlign: "center" }} htmlFor="1">
            1
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <input type="radio" name="rating" id="2" value={2} />
          <label style={{ textAlign: "center" }} htmlFor="2">
            2
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <input type="radio" name="rating" id="3" value={3} />
          <label style={{ textAlign: "center" }} htmlFor="3">
            3
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <input type="radio" name="rating" id="4" value={4} />
          <label style={{ textAlign: "center" }} htmlFor="4">
            4
          </label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <input type="radio" name="rating" id="5" value={5} />
          <label style={{ textAlign: "center" }} htmlFor="5">
            5
          </label>
        </div>
      </div>
      <p>Did you find this fact interesting?</p>
      <div style={{ display: "flex", gap: 50 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="radio" name="is-interesting" id="no" />
          <label htmlFor="no">No</label>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="radio" name="is-interesting" id="yes" />
          <label htmlFor="yes">Yes</label>
        </div>
      </div>
      <p>Do you have a fact that you want to share?</p>
      <input type="text" maxLength={100} style={{width: 300}} /><br/>
      <button style={{padding: '5px 10px', border: 'none', borderRadius: 5, marginTop: 20}} onClick={handleSubmit}>Finish</button>
    </div>
  );
}
