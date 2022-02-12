import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getServices } from "actions/service-actions";

const Services = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServices());
  });

  return <div>Services page</div>;
};

export default Services;
