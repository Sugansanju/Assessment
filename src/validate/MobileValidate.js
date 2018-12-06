export default mobile => {
  if (true === /^([0-9]{10})$/.test(mobile)) {
    return true;
  }
  return false;
}
