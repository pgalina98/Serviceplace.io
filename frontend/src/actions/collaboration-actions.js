import { getDoc } from "firebase/firestore";
import {
  COLLABORATION_STATUS,
  mapIdToStatus,
} from "constants/collaboration-status-constants";

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
    .fetchCollaborationById(collaborationId)
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

      if (allCollaboratorsJoinedCollaboration(collaboration)) {
        collaboration.messages = [];
        collaboration.status = COLLABORATION_STATUS.JOINED;
      }

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

        const messages = await Promise.all(
          collaboration["messages"].map(async (messageRef) => {
            const document = await getDoc(messageRef);

            const message = {
              id: document.id,
              ...document.data(),
              fromUser: document.data()["fromUserRef"].id,
              toUser: document.data()["toUserRef"].id,
            };

            delete Object.assign(message, {
              fromUser: message.fromUserRef.id,
            })["fromUserRef"];

            delete Object.assign(message, {
              toUser: message.toUserRef.id,
            })["toUserRef"];

            return message;
          })
        );

        const offerDocument = await getDoc(collaboration.offerRef);
        const serviceDocument = await getDoc(offerDocument.data().serviceRef);

        return {
          ...collaboration,
          collaborators,
          messages,
          offer: {
            id: offerDocument.id,
            ...offerDocument.data(),
            service: {
              id: serviceDocument.id,
              ...serviceDocument.data(),
            },
          },
          status: mapIdToStatus(collaboration["status"]),
        };
      })
    );

    callback(data);
  });
};

const allCollaboratorsJoinedCollaboration = (collaboration) => {
  return collaboration.collaborators.every(
    (collaborator) => collaborator.joined
  );
};
