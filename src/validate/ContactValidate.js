export default contact => {
  // console.log("validating");
  if ((true === /^([a-z0-9_\-.])+@([a-z0-9_\-.])+\.([a-z]{2,4})$/.test(contact)) || (true === /^([0-9]{10})$/.test(contact))) {
    // console.log(/^([a-z0-9_\-.])+@([a-z0-9_\-.])+\.([a-z]{2,4})$/.test(contact));
    // console.log(/^([0-9]{10})$/.test(contact));
    return true;
  }
  return false;
}
