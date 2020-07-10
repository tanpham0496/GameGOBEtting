import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";

function TableInfo (props){
  const {user} = useSelector(state => state);
  const [availableAssets, setAvailabelAssets] = useState(0);

  

  useEffect(() => {
    if(props && props.receiveProps) {
      setAvailabelAssets(props.receiveProps)
    }
  },[props]);
    return (
      <div className="user-infor">
        <div className="user-infor-background">
          <img src="./image/Covay-29.png"></img>
        </div>
        <div className="user-infor-body">
          <div className="user-infor-body-content">
            <div className="body-item__title-name-user">
              <p>아이디</p>
            </div>
            <div className="body-item__title-total-money">
              <p>자산 보유</p>
            </div>
            <div className="body-item__title-money-betting">
              <p>사용 가능 자산</p>
            </div>
            <div className="body-item__name-user">
              <h3>{user && user.user && user.user.userName }</h3>
            </div>
            <div className="body-item__total-money">
              <h3>{user && user.user && user.user.userBalance }</h3>
            </div>
            <div className="body-item__money-betting">
              <h3>{availableAssets ? availableAssets : (user && user.user && user.user.userBalance)} ORO</h3>
            </div>
          </div>
          <div className="user-infor-img">
            <img src="./image/Covay-28.png"></img>
          </div>
        </div>
      </div>
    );
  }

export default TableInfo;
