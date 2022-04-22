/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TrashboxIcon from "../../components/trashbox-icon/trashbox-icon";
import DeleteModal from "../../components/delete-modal/delete-modal";

import { deleteServiceById } from "actions/service-actions";

import { useToasts } from "react-toast-notifications";
import { TOAST_TYPES } from "utils/toast-util";
import { messages } from "config/constants";

const ServiceCard = ({
  data: service,
  fetchLoggedUserServices,
  isDeleteIconShown = false,
}) => {
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
  });

  const [isSavingData, setIsSavingData] = useState(false);

  const closeModal = () => {
    setDeleteModalState({ isOpen: false });
  };

  const handleDeleteServiceButtonClick = () => {
    setIsSavingData(true);

    deleteServiceById(deleteModalState.serviceId)
      .then(() => {
        addToast(messages.SERVICE_DELETING_SUCCESS, {
          appearance: TOAST_TYPES.SUCCESS,
        });
        setIsSavingData(false);
        closeModal();
        fetchLoggedUserServices();
      })
      .catch(({ message }) => {
        setIsSavingData(false);
        addToast(message, { appearance: TOAST_TYPES.ERROR });
      });
  };

  return (
    <>
      <a className="card revealOnScroll delay-1" data-animation="fadeInLeft">
        {isDeleteIconShown && (
          <TrashboxIcon
            onDeleteButtonClick={() =>
              setDeleteModalState({ isOpen: true, serviceId: service.id })
            }
          />
        )}
        <div
          className="card__background"
          style={{
            backgroundImage: `url(${service.image})`,
          }}
          onClick={() => navigate(`/services/${service.id}`)}
        ></div>
        <div
          className="card__content w-100"
          onClick={() => navigate(`/services/${service.id}`)}
        >
          <p className="card__category">{service.category}</p>
          <h3 className="card__heading">{service.title}</h3>
        </div>
      </a>
      <DeleteModal
        isModalOpen={deleteModalState.isOpen}
        handleDeleteButtonClick={() => handleDeleteServiceButtonClick()}
        closeModal={() => closeModal()}
        isSavingData={isSavingData}
      />
    </>
  );
};

export default ServiceCard;
