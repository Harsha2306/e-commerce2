exports.handleError = (properties) => {
  console.log("hi");
  const error = new Error();
  for (let i in properties) error[i] = properties[i];
  return error;
};
