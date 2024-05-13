import React from "react";

interface CareerSuggestionsProps {
  results: string;
}

const CareerSuggestions: React.FC<CareerSuggestionsProps> = ({ results }) => {
  console.log(results); 
  
  // Function to parse the results string into career suggestions
  const parseSuggestions = (results: string) => {
    const suggestions = results.split("\n").filter(Boolean); // Split by newline character and remove empty strings
    const parsedSuggestions = suggestions.map((suggestion) => {
      const [careerName, description] = suggestion.split(":");
      console.log(suggestion); // Split by ":" to separate the careerName and description
      return {
        careerName: careerName.trim(),
        description
      };
    });
    return parsedSuggestions;
  };

  // Parse the results string into career suggestions
  const suggestions = parseSuggestions(results);

  // Render the CareerSuggestions component
  return (
    <div className="career-suggestions">
      {/* Map through each parsed suggestion and render a DropdownItem for each */}
      {suggestions.map((suggestion, index) => (
        <DropdownItem key={index} careerName={suggestion.careerName} description={suggestion.description} />
      ))}
    </div>
  );
};

// Nested DropdownItem component
const DropdownItem: React.FC<{ careerName: string; description: string }> = ({ careerName, description }) => {
  const [expanded, setExpanded] = React.useState(false);

  // Function to toggle the expansion state
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  // Render the DropdownItem with clickable behavior to toggle description visibility
  return (
    <div className="dropdown-item" onClick={toggleExpansion}>
      <div style={{ marginBottom: "0px" }}>{careerName}</div>
      {expanded && <div className="description">{description}</div>}
    </div>
  );
};

export default CareerSuggestions;
