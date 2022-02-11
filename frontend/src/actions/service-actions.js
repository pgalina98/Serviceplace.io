export const ACTION_TYPES = {
  GET_SERVICES_DATA: "servicesState/GET_SERVICES_DATA",
};

export const getServices = () => {
  return {
    type: ACTION_TYPES.GET_SERVICES_DATA,
    payload: {
      id: 1,
      name: "test service",
      description: "test service description",
    },
  };
};
