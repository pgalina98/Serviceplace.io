import { getDoc } from "firebase/firestore";
import {
  COLLABORATION_STATUS,
  mapIdToStatus,
} from "constants/collaboration-status-constants";

import { SUCCESS } from "utils/action-type-util";

import * as api from "../firebase/api/controllers/collaborations-controller";

export const ACTION_TYPES = {
  SET_COLLABORATION_DATA: "collaborationState/SET_COLLABORATION_DATA",
};

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

          const messages = await Promise.all(
            document.data()["messages"].map(async (messageRef) => {
              const messageDocument = await getDoc(messageRef);
              const fromUserDocument = await getDoc(
                messageDocument.data()["fromUserRef"]
              );
              const toUserDocument = await getDoc(
                messageDocument.data()["toUserRef"]
              );

              const message = {
                id: messageDocument.id,
                ...messageDocument.data(),
              };

              delete Object.assign(message, {
                fromUser: {
                  id: fromUserDocument.id,
                  ...fromUserDocument.data(),
                },
              })["fromUserRef"];

              delete Object.assign(message, {
                toUser: { id: toUserDocument.id, ...toUserDocument.data() },
              })["toUserRef"];

              return message;
            })
          );

          const offerDocument = await getDoc(document.data()["offerRef"]);
          const serviceDocument = await getDoc(
            offerDocument.data()["serviceRef"]
          );

          const collaboration = {
            id: document.id,
            ...document.data(),
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
            status: mapIdToStatus(document.data()["status"]),
          };

          delete collaboration.offerRef;

          return collaboration;
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
            const messageDocument = await getDoc(messageRef);
            const fromUserDocument = await getDoc(
              messageDocument.data()["fromUserRef"]
            );
            const toUserDocument = await getDoc(
              messageDocument.data()["toUserRef"]
            );

            const message = {
              id: messageDocument.id,
              ...messageDocument.data(),
            };

            delete Object.assign(message, {
              fromUser: { id: fromUserDocument.id, ...fromUserDocument.data() },
            })["fromUserRef"];

            delete Object.assign(message, {
              toUser: { id: toUserDocument.id, ...toUserDocument.data() },
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

export const setSelectedCollaboration = (collaboration) => ({
  type: SUCCESS(ACTION_TYPES.SET_COLLABORATION_DATA),
  payload: collaboration,
});

const allCollaboratorsJoinedCollaboration = (collaboration) => {
  return collaboration.collaborators.every(
    (collaborator) => collaborator.joined
  );
};
