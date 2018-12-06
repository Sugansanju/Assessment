export default name => {
  if (true === /^[a-zA-Z0-9]+$/.test(name)) {
    return true;
  }
  return false;
}
