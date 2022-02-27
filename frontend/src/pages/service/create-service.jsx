import React from "react";

import "./service.scss";

const CreateService = () => {
  return (
    <div className="create-page">
      <div className="container">
        <div className="form-container">
          <h1 className="title">Create Service</h1>
          <form>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <div className="select">
                  <select name="category">
                    <option value="mathematics">Mathematics</option>
                    <option value="programming">Programming</option>
                    <option value="painting">Painting</option>
                    <option value="singing">Singing</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  name="title"
                  className="input"
                  type="text"
                  placeholder="Enter service title"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  name="description"
                  className="textarea"
                  placeholder="Enter service description"
                ></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Image Url</label>
              <div className="control">
                <input
                  name="image"
                  className="input"
                  type="text"
                  placeholder="Enter service image url"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Price per Hour</label>
              <div className="control">
                <input
                  name="price"
                  className="input"
                  type="number"
                  placeholder="Enter service price"
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button type="button" className="button is-link">
                  Create
                </button>
              </div>
              <div className="control">
                <button type="button" className="button btn-secondary">
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
