import * as api from "../firebase/api/controllers/collaborations-controller";

export const createNewCollaboration = (collaboration) => {
  return api.saveCollaboration(collaboration);
};

export const getLoggedUserCollaborations = async (userId) => {
  return await api.fetchLoggedUserCollaborations(userId).then((response) => {
    const userCollaborations = response.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return userCollaborations;
  });
};
