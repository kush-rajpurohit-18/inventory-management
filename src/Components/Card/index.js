import React from "react";
import "./style.css";

export default function Card({ icon: Icon, number, title }) {
  return (
    <div className="card">
      <div className="card-icon-size">
        <Icon />
      </div>
      <div className="card-title-number-container">
        <span>{title}</span>
        <h1 className="card-title">{number}</h1>
      </div>
    </div>
  );
}
