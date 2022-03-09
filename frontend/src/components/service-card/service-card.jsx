/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="column is-one-third position-relative">
      {isDeleteIconShown && (
        <TrashboxIcon
          onDeleteButtonClick={() =>
            setDeleteModalState({ isOpen: true, serviceId: service.id })
          }
        />
      )}
      <div
        className="feature-card is-bordered has-text-centered revealOnScroll delay-3"
        data-animation="fadeInLeft"
        style={{ height: "350px" }}
      >
        <div className="card-title card-line-4">
          <h4>{service.title}</h4>
        </div>
        <div className="card-icon">
          <img src={service.image} alt="" />
        </div>
        <div className="card-text card-line-2">
          <p>{service.description}</p>
        </div>
        <div className="card-action">
          <Link
            to={`/services/${service.id}`}
            className="button btn-align-md primary-btn raised"
          >
            Learn more
          </Link>
        </div>
        <DeleteModal
          isModalOpen={deleteModalState.isOpen}
          onDeleteButtonClick={() => handleDeleteServiceButtonClick()}
          closeModal={() => closeModal()}
          isSavingData={isSavingData}
        />
      </div>
    </div>
  );
};

export default ServiceCard;
