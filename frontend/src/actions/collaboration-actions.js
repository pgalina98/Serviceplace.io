import { getDoc } from "firebase/firestore";
import {
  COLLABORATION_STATUS,
  mapIdToStatus,
} from "constants/collaboration-status-constants";

import { SUCCESS } from "utils/action-type-util";

import * as api from "../firebase/api/controllers/collaborations-controller";

export const ACTION_TYPES = {
  SET_COLLABORATION_STATE: "collaborationState/SET_COLLABORATION_STATE",
  CLEAR_COLLABORATION_STATE: "collaborationState/CLEAR_COLLABORATION_STATE",
};

export const createNewCollaboration = (collaboration) => {
  return api.saveCollaboration(collaboration);
};

export const updateCollaboratorStatus = (collaborationId, userId, joined) => {
  return api.fetchCollaborationById(collaborationId).then(async (document) => {
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
      collaboration.status = COLLABORATION_STATUS.IN_PROGRESS;
    }

    return api.updateCollaboration(collaboration);
  });
};

export const getLoggedUserCollaborations = (userId) => {
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
              toUser: offerDocument.data()["toUserRef"].id,
            },
            status: mapIdToStatus(document.data()["status"]),
          };

          delete collaboration.offerRef;
          delete collaboration.offer.toUserRef;

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
  type: SUCCESS(ACTION_TYPES.SET_COLLABORATION_STATE),
  payload: collaboration,
});

export const clearSelectedCollaboration = () => ({
  type: SUCCESS(ACTION_TYPES.CLEAR_COLLABORATION_STATE),
});

export const getMessagesByCollaborationId = (collaborationId) => {
  return api.fetchCollaborationById(collaborationId).then(async (document) => {
    const collaboration = { id: document.id, ...document.data() };

    return Promise.all(
      collaboration.messages.map(async (snapshot) => {
        const messageDocument = await getDoc(snapshot);

        const message = {
          id: messageDocument.id,
          ...messageDocument.data(),
        };

        const fromUserDocument = await getDoc(message["fromUserRef"]);
        const toUserDocument = await getDoc(message["toUserRef"]);

        delete Object.assign(message, {
          fromUser: {
            id: fromUserDocument.id,
            ...fromUserDocument.data(),
          },
        })["fromUserRef"];

        delete Object.assign(message, {
          tpUser: {
            id: toUserDocument.id,
            ...toUserDocument.data(),
          },
        })["toUserRef"];

        return message;
      })
    );
  });
};

export const updateCollaborationStatus = (collaborationId, status) => {
  return api.fetchCollaborationById(collaborationId).then((document) => {
    const updatedDoc = {
      id: document.id,
      ...document.data(),
      status,
    };

    return api.updateCollaboration(updatedDoc);
  });
};

const allCollaboratorsJoinedCollaboration = (collaboration) => {
  return collaboration.collaborators.every(
    (collaborator) => collaborator.joined
  );
};
