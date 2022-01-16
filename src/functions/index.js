export const verifyUser = () => {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
};
