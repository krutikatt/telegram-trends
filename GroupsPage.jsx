import React from "react";
import "./GroupsPage.css"; // Optional: For custom styling

const GroupsPage = () => {
  const groups = [
    "Nulsio",
    "Nahmii",
    "Kadena_io",
    "Blocknet",
    "KardiaChain",
    "Polkastarter",
    "CovalentHQ",
    "AscendEXEnglish",
    "DeFiOfThronesOfficial",
    "CircuitSociety",
  ];

  return (
    <div className="groups-page">
      <h2>Groups</h2>
      <div className="groups-container">
        {groups.map((group, index) => (
          <div key={index} className="group-box">
            {group}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsPage;