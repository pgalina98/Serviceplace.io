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

export const updateCollaboratorStatus = async (
  collaborationId,
  userId,
  joined
) => {
  return await api
    .getCollaborationById(collaborationId)
    .then(async (document) => {
      const collaboration = { id: document.id, ...document.data() };

      collaboration.collaborators = collaboration.collaborators.map(
        (collaborator) => {
          if (collaborator.userRef.id === userId) {
            collaborator.joined = joined;
          }

          return collaborator;
        }
      );

      return await api.updateCollaboration(collaboration);
    });
};
