module.exports.notFound = (req, res, next) => {
  // 404 page
  res.status(404).render("404", {
    layout: "404-layout",
    docTitle: "Not Found",
    url: "/404",
  });
};
