import { getDoc } from "firebase/firestore";
import { mapIdToStatus } from "utils/collaboration-status-constants";

import * as api from "../firebase/api/controllers/collaborations-controller";

export const createNewCollaboration = (collaboration) => {
  return api.saveCollaboration(collaboration);
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

export const getLoggedUserCollaborations = async (userId) => {
  return api.fetchLoggedUserCollaborations(userId).then(async (response) => {
    return await Promise.all(
      response.docs.map(async (document) => {
        const collaborators = await Promise.all(
          document.data()["collaborators"].map(async (collaborator) => {
            const user = await getDoc(collaborator.userRef);

            return { id: user.id, ...user.data() };
          })
        );

        return {
          id: document.id,
          ...document.data(),
          collaborators,
          status: mapIdToStatus(document.data()["status"]),
        };
      })
    );
  });
};
