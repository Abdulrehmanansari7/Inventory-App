  // Runs when no route matched.
  export const notFound = (req, res, next) => {
    const err = new Error("Page not found");
    err.status = 404;
    next(err);
  };

  // Express knows this is an error handler because it has 4 arguments.
  // It must be the LAST app.use(...) in index.js.
  export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) return next(err);

    let status = err.status || 500;
    let message = err.message;

    // Postgres errors
    if (err.code === "23503") {        // foreign key: company does not exist
      status = 404;
      message = "That company does not exist.";
    } else if (err.code === "22003") { // number too big for the column
      status = 400;
      message = "One of the numbers is too large.";
    } else if (err.code === "22P02") { // bad number format
      status = 400;
      message = "Invalid value sent.";
    }

    if (status >= 500) {
      console.error(err); // full details only in the terminal
      message = "Something went wrong on our side. Please try again.";
    }

    res.status(status).render("error", { title: "Error", status, message });
  };
