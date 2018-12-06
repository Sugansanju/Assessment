export default email => {
  if (true === /^([a-z0-9_\-.])+@([a-z0-9_\-.])+\.([a-z]{2,4})$/.test(email)) {
    return true;
  }
  return false;
}
