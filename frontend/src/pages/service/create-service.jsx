import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";

import { isValidImage } from "../../helpers/validator";

import "./service.scss";

const CreateService = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [isSavingData, setIsSavingData] = useState(false);

  const handleCreateServiceButtonClick = (data) => {
    setIsSavingData(true);
  };

  return (
    <div className="create-page">
      <div className="container">
        <div className="form-container">
          <h1 className="title">Create Service</h1>
          <form onSubmit={handleSubmit(handleCreateServiceButtonClick)}>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select
                    name="category"
                    {...register("category", {
                      required: true,
                    })}
                  >
                    <option value="mathematics">Mathematics</option>
                    <option value="programming">Programming</option>
                    <option value="painting">Painting</option>
                    <option value="singing">Singing</option>
                  </select>
                  {errors.category && (
                    <div className="form-error">
                      <span className="help is-danger">
                        Category is required
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  {...register("title", {
                    required: true,
                  })}
                  name="title"
                  className="input"
                  type="text"
                  placeholder="Enter service title"
                />
                {errors.title && (
                  <div className="form-error">
                    <span className="help is-danger">Title is required</span>
                  </div>
                )}
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  {...register("description", {
                    required: true,
                  })}
                  name="description"
                  className="textarea"
                  placeholder="Enter service description"
                />
                {errors.description && (
                  <div className="form-error">
                    <span className="help is-danger">
                      Description is required
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="field">
              <label className="label">Image Url</label>
              <div className="control">
                <input
                  {...register("image", {
                    required: true,
                    validate: { isValidImage },
                  })}
                  name="image"
                  className="input"
                  type="text"
                  placeholder="Enter service image url"
                />
                {errors.image && (
                  <div className="form-error">
                    {errors.image.type === "required" ? (
                      <span className="help is-danger">Image is required</span>
                    ) : (
                      <span className="help is-danger">
                        Image extension is not valid
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="field">
              <label className="label">Price per Hour</label>
              <div className="control">
                <input
                  {...register("price", {
                    required: true,
                  })}
                  name="price"
                  className="input"
                  type="number"
                  placeholder="Enter service price"
                />
                {errors.price && (
                  <div className="form-error">
                    <span className="help is-danger">Price is required</span>
                  </div>
                )}
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  type="submit"
                  className="button is-link"
                  disabled={isSavingData}
                >
                  {isSavingData ? (
                    <Spinner as="span" animation="border" size="sm" />
                  ) : (
                    "Create service"
                  )}
                </button>
              </div>
              <div className="control">
                <button
                  type="button"
                  className="button btn-secondary"
                  disabled={isSavingData}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
