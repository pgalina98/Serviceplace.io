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
  return api
    .fetchJoinedLoggedUserCollaborations(userId)
    .then(async (response) => {
      return await Promise.all(
        response.docs.map(async (document) => {
          const collaborators = await Promise.all(
            document.data()["collaborators"].map(async (collaborator) => {
              const document = await getDoc(collaborator.userRef);

              return {
                id: document.id,
                ...document.data(),
                joined: collaborator.joined,
              };
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

export const subscribe = (userId, callback) => {
  api.subscribe(userId, async (collaborations) => {
    const data = await Promise.all(
      collaborations.map(async (collaboration) => {
        const collaborators = await Promise.all(
          collaboration["collaborators"].map(async (collaborator) => {
            const document = await getDoc(collaborator.userRef);

            return {
              id: document.id,
              ...document.data(),
              joined: collaborator.joined,
            };
          })
        );

        return {
          ...collaboration,
          collaborators,
          status: mapIdToStatus(collaboration["status"]),
        };
      })
    );

    callback(data);
  });
};
