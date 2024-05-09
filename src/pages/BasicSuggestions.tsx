import React, { useState } from "react";

interface CareerSuggestionsProps {
  results: string;
}

const CareerSuggestions: React.FC<CareerSuggestionsProps> = ({ results }) => {
  const suggestions = results.split(/\d+\. /).filter(Boolean);

  const DropdownItem: React.FC<{ careerName: string; description: string }> = ({
    careerName,
    description
  }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpansion = () => {
      setExpanded(!expanded);
    };

    return (
      <div className="dropdown-item" onClick={toggleExpansion}>
        <div style={{ marginBottom: "5px" }}>{careerName}</div>
        {expanded && <div className="description">{description}</div>}
      </div>
    );
  };

  return (
    <div className="career-suggestions">
      {suggestions.map((suggestion, index) => {
        const [careerName, description] = suggestion.split(":");
        return <DropdownItem key={index} careerName={careerName.trim()} description={description.trim()} />;
      })}
    </div>
  );
};

export default CareerSuggestions;
