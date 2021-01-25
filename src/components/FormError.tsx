import React from "react";

interface IFormError {
  errorMessage: string;
}

const FormError: React.FC<IFormError> = ({ errorMessage }) => {
  return <span className="text-red-300">{errorMessage}</span>;
};

export default FormError;
