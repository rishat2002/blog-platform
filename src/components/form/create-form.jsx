import React from "react";
import { Redirect } from "react-router";

class CreateForm {
  getRedirectComponent = (condition, url) =>
    condition ? <Redirect to={url} /> : null;
}

export default CreateForm;
