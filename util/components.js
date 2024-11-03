const generateNavbarOptions = (req) => {
  const defaultOptions = {
    authenticated: false,
    username: "",
  };

  try {
    const { authenticated, user } = req;

    defaultOptions.authenticated = authenticated;

    if (authenticated) {
      defaultOptions.username = user.username;
    }

    return defaultOptions;
  } catch (error) {
    return defaultOptions;
  }
};

module.exports = {
  generateNavbarOptions,
};
