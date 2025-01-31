import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Roboto";
  }

  /* Styles pour les boutons de quiz */
  .questionWrapperBody {
    button.correct.answerBtn.btn,
    button.incorrect.answerBtn.btn {
      background-color: rgb(176 176 176) !important;
      border-color: #e8e8e8 !important;
      color: #000 !important;
    }

    .tag-container {
      display: none;
    }
  }
`;

export default GlobalStyles; 