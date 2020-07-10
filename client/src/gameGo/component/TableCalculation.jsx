import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCalculate, optionChoosePlayer } from "./data";
import { roundActions } from "../../_store/actions/roundActions";
import { socketActions } from "../../_store/actions/socketActions";

const TableCalculation = props => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state);
  const [moneyPut, setMoneyPut] = useState(1);
  const [balance, setBalance] = useState();
  const [chooseStone, setChooseStone] = useState("Black");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (user && user.user) {
      setBalance(user.user.userBalance);
    }
  }, [user]);

  const inCreateMoneyBet = () => {
    if (moneyPut < balance) {
      setMoneyPut(moneyPut + 1);
      setBalance(balance - 1);
    }
  };
  const reduceMoneyBet = () => {
    if (moneyPut > 1) {
      setMoneyPut(moneyPut - 1);
      setBalance(balance + 1);
    }
  };

  const handleCalculation = item => {
    if (moneyPut + item.value <= balance) {
      setMoneyPut(moneyPut + item.value);
      setBalance(balance - (moneyPut + item.value));
    }
  };
  const onHandleEnter = e => {
    if (e.keyCode === 13) {
      alert("enter input");
    }
  };
  const handleSubmit = () => {
    if (moneyPut > 1) {
      const param = {
        userId: user.user._id,
        chooseStone,
        battingAmount: moneyPut
      };
      console.log("moneyPut: ", moneyPut);
      dispatch(socketActions.putMoneyOnBet(param));
      console.log("param: ", param);
      setMoneyPut(1);
      setDisabled(true);
    } else {
      alert("Please Betting");
    }
  };
  useEffect(() => {
    if (props && props.passProps) {
      props.passProps(balance);
    }
  }, [balance]);
  return (
    <div className="table-caculate">
      <div className="table-caculate-background">
        <img src="./image/Covay-03.png" />
      </div>
      <div className="table-caculate-content">
        <div className="choose-color">
          {optionChoosePlayer.map((value, index) => {
            return (
              <div
                key={index}
                className={value.className}
                onClick={() => setChooseStone(value.name)}
              >
                <img src={value.urlImage} alt={value.name} />
                <input
                  type="radio"
                  name="color"
                  value={value.name}
                  checked={chooseStone === value.name}
                />
              </div>
            );
          })}
        </div>
        <div className="choose-unit">
          {listCalculate.map((item, index) => {
            return (
              <img
                src={item.urlImage}
                // onClick= {()=>handleCalculation(item)}

                onClick={!disabled && (() => handleCalculation(item))}
                key={index}
                style={{ cursor: disabled ? "no-drop" : "pointer" }}
              />
            );
          })}
        </div>
        <div className="input-unit">
          <div className="input-money">
            <div className="input-poit">
              <input
                type="number"
                value={moneyPut}
                onChange={e =>
                  e.target.value <= balance &&
                  setMoneyPut(parseInt(e.target.value))
                }
                onKeyDown={onHandleEnter}
              />
              <h5>ORO</h5>
            </div>
            <div className="btn-updown-unit">
              <img
                alt={"inCreate money"}
                className="btn-up"
                src="./image/Covay-24.png"
                onClick={!disabled && inCreateMoneyBet}
                style={{ cursor: disabled ? "no-drop" : "pointer" }}
              />
              <img
                alt={"reduce money"}
                className="btn-down"
                src="./image/Covay-25.png"
                onClick={!disabled && reduceMoneyBet}
                style={{ cursor: disabled ? "no-drop" : "pointer" }}
              />
              <div className="btn-reset">
                <img
                  src="./image/Covay-26.png"
                  onClick={() => {
                    setMoneyPut(1);
                    setBalance(user.user.userBalance);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="btn-confirm"
          onClick={!disabled && handleSubmit}
          style={{ cursor: disabled ? "no-drop" : "pointer" }}
        >
          <img
            alt={"button submit"}
            src="./image/Covay-11.png"
            style={{ cursor: disabled ? "no-drop" : "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TableCalculation;
