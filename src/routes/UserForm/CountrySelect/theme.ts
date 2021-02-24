import { Theme } from 'react-autosuggest';

const theme = {
  container: {
    height: '100%',
    position: 'relative',
  },
  containerOpen: {

  },
  inputOpen: {
    borderRadius: '.25rem .25rem 0px 0px',
  },
  inputFocused: {

  },
  suggestionsContainer: {
    position: 'absolute',
    background: 'white',
    width: '100%',
    borderRadius: '0 0 6px 6px',
    border: 'none',
    zIndex: 10,
  },
  suggestionsContainerOpen: {
    border: 'solid 1px #bbb',
    borderTop: 'none',
  },
  suggestionsList: {
    margin: '0',
    padding: '0',
  },
  suggestion: {
    listStyle: 'none',
    margin: '0',
    padding: '0',
  },
  suggestionFirst: {

  },
  suggestionHighlighted: {
    background: '#f0f7ff',
  },
  sectionContainer: {

  },
  sectionContainerFirst: {

  },
  sectionTitle: {

  },
} as Theme;

export default theme;
