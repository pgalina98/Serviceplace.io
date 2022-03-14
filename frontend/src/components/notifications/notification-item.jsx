import React from "react";

const NotificationItem = () => {
  return (
    <div className="sec new">
      <div className="d-flex align-items-center">
        <img
          className="profile-image"
          src="https://obamawhitehouse.archives.gov/sites/obamawhitehouse.archives.gov/files/styles/person_medium_photo/public/person-photo/amanda_lucidon22.jpg?itok=JFPi8OFJ"
          alt="profile-img"
        />
        <div>
          <div className="txt">
            Annita liked your post: "Pure css notification"
          </div>
          <div className="txt sub">11/7 - 2:13 pm</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
