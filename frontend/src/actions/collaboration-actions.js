import * as api from "../firebase/api/controllers/collaborations-controller";

export const createNewCollaboration = (collaboration) => {
  return api.saveCollaboration(collaboration);
};
