import React, { Component, Fragment, useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";

const TableBetting = () => {

  const {user} = useSelector(state =>state);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
     if(user && user.user)
     {
        setBalance(user.user.userBalance);
     }
  },[]);
    return (
      <Fragment>
        <div className="table-betting">
          <div className="table-betting-background">
            <img src="./image/Covay-30.png"></img>
          </div>
          <div className="table-betting-content">
            <div className="table-betting-header">
              <h3>배팅현황</h3>
            </div>
            <div className="table-betting-body">
              <div className="table-side">
                <div className="white">
                  <h3>백</h3>
                </div>
                <div className="black">
                  <h3>흑</h3>
                </div>
              </div>
              <div className="round">
                <div className="round-item">
                  <span>1R</span>
                  <div className="table-r1">
                    <div className="betting-white-r1">5000</div>
                    <div className="betting-black-r1">5000</div>
                  </div>
                </div>
                <div className="round-item">
                  <span>2R</span>
                  <div className="table-r2">
                    <div className="betting-white-r2">5000</div>
                    <div className="betting-black-r2">550</div>
                  </div>
                </div>
                <div className="round-item">
                  <span>3R</span>
                  <div className="table-r3">
                    <div className="betting-white-r3">450</div>
                    <div className="betting-black-r3">6000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

export default TableBetting;
