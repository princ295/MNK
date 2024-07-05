import { useState } from "react";
import Autosuggest from "react-autosuggest";
import { User } from "../../redux/database/slice";

interface SuggestionData {
  name: string;
}

interface AutoSuggestionPorps {
  data: User[]
  callback: (data: any) => void;
  placeholder: string
  name: string
}

export const AutoSuggestion: React.FC<AutoSuggestionPorps> = ({ name, placeholder, data }) => {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<SuggestionData[]>([]);

  const suggestionData: SuggestionData[] = data.map(el => ({
    name: el.accountNo.toLowerCase()
  }));

  function getSuggestions(value: string): SuggestionData[] {
    return suggestionData.filter(el =>
      el.name.includes(value.trim().toLowerCase())
    );
  }

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsClearRequested={() => setSuggestions([])}
      onSuggestionsFetchRequested={({ value }) => {
        console.log(value);
        setValue(value);
        setSuggestions(getSuggestions(value));
      }}
      onSuggestionSelected={(_, { suggestionValue }) =>
        console.log("Selected: " + suggestionValue)
      }
      getSuggestionValue={suggestion => suggestion.name}
      renderSuggestion={suggestion => <span>{suggestion.name}</span>}
      inputProps={{
        id: name,
        name: name,
        placeholder: placeholder,
        value: value,
        onChange: (_, { newValue }) => {
          setValue(newValue);
        }
      }}
      highlightFirstSuggestion={true}
    />
  );
};
