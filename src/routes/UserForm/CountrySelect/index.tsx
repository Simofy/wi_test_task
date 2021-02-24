/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import Autosuggest from 'react-autosuggest';
import theme from './theme';
import './style.css';
import { CountryType } from '../../../types';
import AppContext from '../../../App/AppContext';

function escapeRegExp(string: string) {
  return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

type LanguageSelectType = {
  name: string;
  initialValue?: string;
  disableAutoComplete?: boolean;
  label?: string;
  required?: boolean;
};

const renderCountryOption = (suggestion: CountryType) => {
  const { alpha2Code, name } = suggestion || {};
  return (
    <span className="registration-country-entry">
      {name}
      <img
        alt={name}
        src={`https://www.countryflags.io/${alpha2Code}/flat/64.png`}
      />
    </span>
  );
};

function getSuggestions(countries: CountryType[], query: string) {
  const promise = new Promise<CountryType[]>((resolve, reject) => {
    try {
      const toReturn = [] as Array<CountryType>;
      const limit = 10;
      let counter = 0;
      const escaped = escapeRegExp(query.toLowerCase());
      for (let i = 0; i < countries.length; i += 1) {
        const country = countries[i];
        if (country.name.toLowerCase().search(escaped) !== -1) {
          counter += 1;
          toReturn.push(country);
        }
        if (counter > limit) break;
      }
      resolve(toReturn);
    } catch (e) {
      reject(e);
    }
  });
  return promise;
}

export default function CountrySelect({
  initialValue = '',
  name,
  label,
  required,
  disableAutoComplete
}: LanguageSelectType) {
  const { countries } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestions, setSuggestions] = useState<CountryType[]>([]);
  const [typedCountry, setTypedCountry] = useState(initialValue);
  const [alert, setAlert] = useState(false);

  const [
    selectedSuggestion,
    setSelectedSuggestion
  ] = useState<CountryType | null>(null);

  const handleInputChange = useCallback((event, { newValue }) => {
    setTypedCountry(newValue);
    setSelectedSuggestion(null);
  }, []);

  const handleSuggestionSelect = useCallback(
    (event, { suggestion, suggestionValue }) => {
      event.preventDefault();
      setSelectedSuggestion(suggestion);
      setTypedCountry(suggestionValue);
      setAlert(false);
      inputRef?.current?.setCustomValidity('');
    },
    [inputRef]
  );

  const handleFetchRequest = useCallback(
    ({ value: fetchInput, reason }) => {
      if (reason === 'input-changed') {
        getSuggestions(countries, fetchInput)
          .then((newSuggestions) => setSuggestions(newSuggestions))
          .catch(() => setSuggestions([]));
      }
    },
    [countries]
  );

  const customCheck = useCallback(() => {
    if (!typedCountry.length) {
      setAlert(false);
      inputRef?.current?.setCustomValidity('');
      return;
    }
    const country = countries.find(
      (value) => value.name.toLowerCase() === typedCountry.toLowerCase()
    );
    if (country) {
      if (!selectedSuggestion) {
        setTypedCountry(country.name);
        setSelectedSuggestion(country);
      }
      setAlert(false);
      inputRef?.current?.setCustomValidity('');
      return;
    }
    setAlert(true);
    inputRef?.current?.setCustomValidity('Wrong country');
  }, [typedCountry, countries, inputRef, selectedSuggestion]);

  useEffect(() => {
    setTypedCountry(initialValue);
  }, [initialValue]);

  useEffect(() => {
    customCheck();
    /**
     * Gali būti edge case ir neužkrauti
     * Initial nuotraukos jei vartotojų
     * sąrašas bus gaunamas vėliau nei country API
     */
  }, [countries, customCheck]);
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <div className="form-group position-relative">
        <Autosuggest
          shouldRenderSuggestions={() => true}
          theme={theme}
          suggestions={suggestions}
          getSuggestionValue={(selectedValue: CountryType) => {
            if (typeof selectedValue === 'string') {
              return selectedValue;
            }
            const { name: autoName } = selectedValue;
            return autoName;
          }}
          highlightFirstSuggestion
          inputProps={{
            ref: inputRef,
            autoComplete: disableAutoComplete ? 'off' : undefined,
            className: `form-control${alert ? ' input-alert' : ''}`,
            'aria-invalid': alert ? 'true' : undefined,
            'aria-describedby': alert ? 'Country not recognized' : undefined,
            onSubmitCapture: (e) => e.preventDefault(),
            onSubmit: (e) => e.preventDefault(),
            placeholder: 'Type country...',
            type: 'text',
            name,
            value: typedCountry,
            required,
            onBlur: customCheck,
            // 'custom-check': keywordMethodName ? shouldSearch : true,
            onChange: handleInputChange
          }}
          onSuggestionSelected={handleSuggestionSelect}
          onSuggestionsFetchRequested={handleFetchRequest}
          renderSuggestion={renderCountryOption}
          onSuggestionsClearRequested={() => {
            setSuggestions([]);
          }}
        />
        <span className="registration-country-flag">
          {selectedSuggestion ? (
            <img
              alt={name}
              src={`https://www.countryflags.io/${selectedSuggestion.alpha2Code}/flat/64.png`}
            />
          ) : undefined}
        </span>
      </div>
    </div>
  );
}
