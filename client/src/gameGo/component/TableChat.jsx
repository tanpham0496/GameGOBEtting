import React, { Component, Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socketActions } from "../../_store/actions/socketActions";

let page = 1;

const TableChat = () => {
  const dispatch = useDispatch();
  const {
    user: { user },
    socket: { listMessage, statusSendMessage, amountMessage }
  } = useSelector(state => state);
  const [message, setMessage] = useState();
  const [listContent, setListContent] = useState();
  const [loading, setLoading] = useState(false);
  const [pauseLoading, setPauseLoading] = useState(true);
  useEffect(() => {
    dispatch(socketActions.getAllChat());
  }, []);

  //set State message and
  useEffect(() => {
    if (listMessage) {
      setListContent(listMessage);
      setTimeout(() => {
        // document.getElementById(
        //   "container-chat"
        // ).scrollTop = document.getElementById("container-chat").scrollHeight;
      }, 0.02);
    }
  }, [listMessage]);

  //auto scroll when send message
  useEffect(() => {
    if (statusSendMessage) {
      setTimeout(() => {
        // document.getElementById(
        //   "container-chat"
        // ).scrollTop = document.getElementById("container-chat").scrollHeight;
      }, 200);
      dispatch(socketActions.clearStatusSendMessage());
    }
  }, [statusSendMessage]);

  //scroll top get api pagination
  const handleScrollFetchApi = () => {
    if (amountMessage && listMessage && amountMessage === listMessage.length) {
      setPauseLoading(false);
      setLoading(false);
    }
    if (
      document.getElementById("container-chat").scrollTop === 0 &&
      pauseLoading
    ) {
      setLoading(true);
      dispatch(socketActions.getMessagePagination({ page }));
      page++;
      setTimeout(() => {
        setLoading(false);
        document.getElementById("container-chat").scrollTop =
          document.getElementById("container-chat").scrollHeight / 2;
      }, 1000);
    }
  };


  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      sendContent();
    }
  };

  const sendContent = () => {
    if (message && message !== "" && user) {
      const param = {
        message: message,
        userId: user._id,
        userName: user.userName
      };
      console.log('message: ', message);
      dispatch(socketActions.sendMessage(param));
      setMessage("");
    }
  };
  return (
    <div className="table-chat">
        <div className="table-chat-background">
          <img src="./image/Covay-31.png"/>
        </div>
        <div className="table-chat-content">
          <div className="table-btn-action">
            <div className="btn-action-item active">
              <h3>채팅</h3>
            </div>
            <div className="btn-action-item">
              <h3>참여현황</h3>
            </div>
          </div>

          <div
            className="table-content-chat"
            id={"container-chat"}
            onScroll={handleScrollFetchApi}
          >
            {loading && (
              <div className="lds-ellipsis">
                {" "}
                <div> </div> <div> </div> <div> </div>
                <div> </div>{" "}
              </div>
            )}
            {listContent && listContent.map((item,index) => {
                return (
                  <div className="content-chat" key={index}>
                    <div className="name">{item.senderName}</div>
                    <div className="content-input">{item.message}</div>
                  </div>
                );
            })}
          </div>
          <div className="table-input-chat">
            <div className='input-chat'>

            <input
              onChange={e => setMessage(e.target.value)}
              value={message}
              onKeyDown={handleKeyDown}
              placeholder='Text...............'
            />
            </div>
            <img src='./image/Covay-19.png' onClick={sendContent}/>
          </div>
        </div>
      </div>
  );
};

export default TableChat;
