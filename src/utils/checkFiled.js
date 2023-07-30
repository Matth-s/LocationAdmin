const filedRequired = "Champ obligatoire";
const wrongFormat = "Champ non valide";
const imageError = "Selectionnez une image";

export const checkString = (string) => {
  if (string.trim().length === 0) {
    return filedRequired;
  }

  return "";
};

export const checkNumber = (number) => {
  if (number.toString().length === 0) {
    return filedRequired;
  } else if (isNaN(number)) {
    return wrongFormat;
  }

  return "";
};

export const checkImageArray = (array) => {
  if (array.length === 0) {
    return imageError;
  }

  return "";
};
