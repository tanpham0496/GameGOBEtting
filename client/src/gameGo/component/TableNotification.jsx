import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function TableNotification(props) {
  //   const {user} = useSelector(state => state);
  const [availableAssets, setAvailabelAssets] = useState(0);
  const {
    user: { user },
    socket: { param }
  } = useSelector(state => state);

  // console.log("param: ", param);

  useEffect(() => {
    if (props && props.receiveProps) {
      setAvailabelAssets(props.receiveProps);
    }
  }, [props]);
  return (
    <div className="table-notification">
      <div className="table-notification-background">
        <img src="./image/Covay-32.png" />
      </div>
      <div className="table-notification-content">
        <h1>NOTIFICATION</h1>
        {param && (
          <div className="notification-detail">
            YOU HAVE BET : {param.battingAmount} ORO
          </div>
        )}
      </div>
    </div>
  );
}

export default TableNotification;
