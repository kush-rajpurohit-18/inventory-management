import React from "react";
import "./style.css";

export default function Card({ icon: Icon, number, title }) {
  return (
    <div className="card">
      <div className="card-icon-size">
        <Icon />
      </div>
      <div>
        <span>{title}</span>
        <h1 className="card-title">
          {title === "Total Store Value" ? `$${number}` : number}
        </h1>
      </div>
    </div>
  );
}
