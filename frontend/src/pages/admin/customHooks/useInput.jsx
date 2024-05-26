import { useState } from "react";

const useInput = (pattern, errMsg, validate) => {
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState("");

  const inputChangeHandler = (e) => {
    if (e.target) {
      setInput(e.target.value);
      setInputErrorMessage(
        validate(e.target.value, pattern, setInputError, errMsg)
      );
    } else {
      setInput(e);
      setInputErrorMessage(validate(e, pattern, setInputError, errMsg));
    }
  };

  const reset = () => {
    setInput("");
  };

  return [
    input,
    inputError,
    inputErrorMessage,
    inputChangeHandler,
    reset,
    setInputError,
    setInputErrorMessage,
    setInput
  ];
};

export default useInput;
