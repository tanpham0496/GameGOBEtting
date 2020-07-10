import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { socketActions } from "../_store/actions/socketActions";
import { userActions } from "../_store/actions/userActions";
import { screenActions } from "../_store/actions/screenActions";
import TableCalculation from "./component/TableCalculation";
import TableChat from "./component/TableChat";
import TableBetting from "./component/TableBetting";
import TableInfo from "./component/TableInfo";
import Timeout from './component/Timeout'
import TableNotification from "./component/TableNotification";
const stepStart =
    ";B[qd];W[pp];B[dc];W[cp];B[ce];W[oc];B[pf];W[fq];B[qq];W[pq];B[qp];W[qn];B[qo];W[po];B[rn];W[qm];B[rm];W[ql];B[kc];W[df];B[dp];W[dq];B[cq];W[do];B[ep];W[eq];B[co];W[bp];B[dn];W[eo] ";
const stepAfterR1 =
    ";B[qd];W[pp];B[dc];W[cp];B[ce];W[oc];B[pf];W[fq];B[qq];W[pq];B[qp];W[qn];B[qo];W[po];B[rn];W[qm];B[rm];W[ql];B[kc];W[df];B[dp];W[dq];B[cq];W[do];B[ep];1;W[eq];B[co];W[bp];B[dn];W[eo];B[fp];W[cn];B[gq];W[cr];B[fo];W[en];B[fn];W[em];B[fm];W[el];B[gk];W[hq];B[gr];W[hp];B[gp];W[jp];B[jm];W[hn];B[hm];W[cf];B[de];W[fj];B[ef];W[eg];B[fg];W[eh];B[fh];W[fi];B[fk];W[ek] ";
const stepAfterR2 =
  ";B[qd];W[pp];B[dc];W[cp];B[ce];W[oc];B[pf];W[fq];B[qq];W[pq];B[qp];W[qn];B[qo];W[po];B[rn];W[qm];B[rm];W[ql];B[kc];W[df];B[dp];W[dq];B[cq];W[do];B[ep];W[eq];B[co];W[bp];B[dn];W[eo];B[fp];W[cn];B[gq];W[cr];B[fo];W[en];B[fn];W[em];B[fm];W[el];B[gk];W[hq];B[gr];W[hp];B[gp];W[jp];B[jm];W[hn];B[hm];W[cf];B[de];W[fj];B[ef];W[eg];B[fg];W[eh];B[fh];W[fi];B[fk];W[ek];B[ei];W[ff];B[ee];W[di];B[dg];W[ej];B[dh];W[ei];B[bf];W[jk];B[in];W[ho];B[hj];W[il];B[im];W[ii];B[ll];W[hi];B[kj];W[kk];B[lk];W[lo];B[ln];W[kn];B[ko];W[kp];B[mn];W[jo];B[li];W[kh] ";
const stepEnd =
    ";B[qd];W[pp];B[dc];W[cp];B[ce];W[oc];B[pf];W[fq];B[qq];W[pq];B[qp];W[qn];B[qo];W[po];B[rn];W[qm];B[rm];W[ql];B[kc];W[df];B[dp];W[dq];B[cq];W[do];B[ep];1;W[eq];B[co];W[bp];B[dn];W[eo];B[fp];W[cn];B[gq];W[cr];B[fo];W[en];B[fn];W[em];B[fm];W[el];B[gk];W[hq];B[gr];W[hp];B[gp];W[jp];B[jm];W[hn];B[hm];W[cf];B[de];W[fj];B[ef];W[eg];B[fg];W[eh];B[fh];W[fi];B[fk];W[ek];B[ei];W[ff];B[ee];W[di];B[dg];W[ej];B[dh];W[ei];B[bf];W[jk];B[in];W[ho];B[hj];W[il];B[im];W[ii];B[ll];W[hi];B[kj];W[kk];B[lk];W[lo];B[ln];W[kn];B[ko];W[kp];B[mn];W[jo];B[li];W[kh];B[jl];W[qc];B[rc];W[qb];B[on];W[qr];B[rr];W[pn];B[pd];W[mc];B[np];W[no];B[mo];W[mp];B[nq];W[nn];B[nm];W[oo];B[jr];W[mq];B[or];W[pr];B[mr];W[ir];B[is];W[hs];B[hr];W[js];B[iq];W[kr];B[is];W[ks];B[rl];W[qj];B[rb];W[gf];B[hg];W[gd];B[ke];W[me];B[nd];W[od];B[ne];W[oe];B[nf];W[pe];B[qe];W[of];B[nc];W[nb];B[ob];W[oa];B[pc];W[pb];B[og];W[ob];B[pg];W[lb];B[kb];W[md];B[mf];W[jd];B[id];W[hf];B[if];W[qa];B[ih];W[gg];B[ji];W[hh];B[ig];W[bh];B[cg];W[qh];B[rg];W[ij];B[rk];W[qk];B[ci];W[cj]) ";

class GameGo extends Component {
  state = {
    status: "wait",
    receiveProps : '',
  };
  componentDidMount() {
    // console.log("didmount");
    this.props.getUser();
    window.refreshIntervalId = setInterval(() => {
      window.GameStart(stepStart);
    }, 1050);

    this.props.dispatch(
      screenActions.addPopup({ name: "Timeout", data: { timeLimit: 15 } })
    );
  }

  handleReceiveProps = (mode) => {

    this.setState({receiveProps : mode})
  };

  componentDidUpdate() {

    if (this.state.status === "wait" && !this.props.screens["Timeout"]) {
      this.setState({
        status: "playGoR1"
      });
      var IntervalId = setInterval(() => {
        window.GoBoard.Progress();
        // console.log("window.GoBoard.NowSeqNo(): ", window.GoBoard.NowSeqNo());

        if (window.GoBoard.NowSeqNo() == 30) {
          clearInterval(IntervalId);
          this.setState({
            status: "betGoR1"
          });
        }
      }, 1000);
    }
    if (this.state.status === "betGoR1") {
      this.props.dispatch(
        screenActions.addPopup({ name: "Timeout", data: { timeLimit: 5 } })
      );
      this.setState({
        status: "playGoR2"
      });
   
      setTimeout(() => {
        if (this.state.status === "playGoR2") {
          var IntervalId = setInterval(() => {
            window.GoBoard.Progress();
            if (window.GoBoard.NowSeqNo() == 60) {
              clearInterval(IntervalId);
              this.setState({
                status: "betGoR2"
              });
            }
          }, 500);
          window.GameStart(stepAfterR1);
          this.runFromStep(31);
        }
      }, 5000);
    }
    if (this.state.status === "betGoR2") {
      this.props.dispatch(
        screenActions.addPopup({ name: "Timeout", data: { timeLimit: 5 } })
      );
      this.setState({
        status: "playGoR3"
      });
      setTimeout(() => {
        if (this.state.status === "playGoR3") {
          var IntervalId = setInterval(() => {
            window.GoBoard.Progress();
            if (window.GoBoard.NowSeqNo() == 90) {
              clearInterval(IntervalId);
              this.setState({
                status: "betGoR3"
              });
            }
          }, 250);
          window.GameStart(stepAfterR2);
          this.runFromStep(61);
        }
      }, 5000);
    }
    if (this.state.status === "betGoR3") {
      this.props.dispatch(
        screenActions.addPopup({ name: "Timeout", data: { timeLimit: 5 } })
      );
      this.setState({
        status: "playGoEnd"
      });
      setTimeout(() => {
        if (this.state.status === "playGoEnd") {
          var IntervalId = setInterval(() => {
            window.GoBoard.Progress();
         
          }, 100);
          window.GameStart(stepEnd);
          this.runFromStep(91);
        }
      }, 5000);
    }
  }

  statusShowTimer = statusShowTimer => {
    this.setState({
      showTimer: statusShowTimer
    });
  };
  runFromStep = SeqNum => {
    if (SeqNum < window.GoBoard.NowMaxSN()) {
      while (window.GoBoard.NowSeqNo() < SeqNum) {
        window.GoBoard.Progress();
      }
    }
    SeqNum = window.GoBoard.NowSeqNo();
  };
  mouse_event=()=>{
  }
  render() {
    // console.log('this.props.screens["Timeout"]', this.props.screens["Timeout"]);
    return (
      <div id="body-game">
        <div id="top">
          <img src="./image/title.png" align="title" />
        </div>
        <div id="board_div">
          <div id="board_div2">
            <div className="table-infor">
              <TableInfo receiveProps={this.state.receiveProps}/>
              <div className="board-game">
                <canvas id="board" />
                {this.props.screens["Timeout"] && (
                  <div className="notification">
                    <Timeout {...this.props.screens["Timeout"]} />
                  </div>
                )}
              </div>
                <TableCalculation  passProps = {this.handleReceiveProps}/>
            </div>
            <div className="table-function">
              <TableBetting />
              <TableNotification/>
              <TableChat  />
            </div>
          </div>
        </div>

        {/* <input
          type="hidden"
          name="gibo"
          id="gibo"
          defaultValue="http://open.cyberoro.com/gibo/201911/ns8-yangdingx_nor.sgf"
        /> */}
        <input
          type="hidden"
          name="gibo_txt"
          id="gibo_txt"
          value={`${this.state.step}`}
        />

        <input type="hidden" name="level" id="level" defaultValue />
        <input type="hidden" name="nation" id="nation" defaultValue={1} />
        <input
          type="hidden"
          name="isMobile"
          id="isMobile"
          defaultValue="false"
        />
        <input type="hidden" name="bimg" id="bimg" defaultValue />
        <input type="hidden" name="wimg" id="wimg" defaultValue />
        <input type="hidden" name="wh" id="wh" defaultValue />
        <div id="con1">
          <table width="100%" cellSpacing={0} cellPadding={0}>
            <tbody>
              <tr>
                <td align="center">
                  <div>
                    <img
                      id="control_start"
                      src="./image/control_start.png"
                      onMouseOver={()=>this.mouse_event(this,1)}
                      onMouseOut={()=>this.mouse_event(this,2)}
                      onMouseDown={()=>this.mouse_event(this,3)}
                      onMouseUp={()=>this.mouse_event(this,4)}
                      onClick={()=>this.mouse_event(this,5)}
                    />
                    <img
                      id="control_rewind"
                      src="./image/control_rewind.png"
                      onMouseOver={()=>this.mouse_event(this,1)}
                      onMouseOut={()=>this.mouse_event(this,2)}
                      onMouseDown={()=>this.mouse_event(this,3)}
                      onMouseUp={()=>this.mouse_event(this,4)}
                      onClick={()=>this.mouse_event(this,5)}
                    />
                    <img
                      id="control_back"
                      src="./image/control_back.png"
                      onMouseOver={()=>this.mouse_event(this,1)}
                      onMouseOut={()=>this.mouse_event(this,2)}
                      onMouseDown={()=>this.mouse_event(this,3)}
                      onMouseUp={()=>this.mouse_event(this,4)}
                      onClick={()=>this.mouse_event(this,5)}
                    />
                    <img
                      id="control_play"
                      src="./image/control_play.png"
                      onMouseOver={()=>this.mouse_event(this,1)}
                      onMouseOut={()=>this.mouse_event(this,2)}
                      onMouseDown={()=>this.mouse_event(this,3)}
                      onMouseUp={()=>this.mouse_event(this,4)}
                      onClick={()=>this.mouse_event(this,5)}
                    />
                    <img
                      id="control_ff"
                      src="./image/control_ff.png"
                      onMouseOver={()=>this.mouse_event(this,1)}
                      onMouseOut={()=>this.mouse_event(this,2)}
                      onMouseDown={()=>this.mouse_event(this,3)}
                      onMouseUp={()=>this.mouse_event(this,4)}
                      onClick={()=>this.mouse_event(this,5)}
                    />
                    <img
                      id="control_last"
                      src="./image/control_last.png"
                      onMouseOver={()=>this.mouse_event(this,1)}
                      onMouseOut={()=>this.mouse_event(this,2)}
                      onMouseDown={()=>this.mouse_event(this,3)}
                      onMouseUp={()=>this.mouse_event(this,4)}
                      onClick={()=>this.mouse_event(this,5)}
                    />
                  </div>
                </td>
                <td width={96} className="bg_1">
                  <img
                    id="btn_replay"
                    src="./image/btn_replay.png"
                    onMouseOver={()=>this.mouse_event(this,1)}
                    onMouseOut={()=>this.mouse_event(this,2)}
                    onMouseDown={()=>this.mouse_event(this,3)}
                    onMouseUp={()=>this.mouse_event(this,4)}
                    onClick={()=>this.mouse_event(this,5)}
                  />
                  <img
                    id="btn_return"
                    src="./image/btn_return.png"
                    style={{ height: 0, visibility: "hidden" }}
                    onMouseOver={()=>this.mouse_event(this,1)}
                    onMouseOut={()=>this.mouse_event(this,2)}
                    onMouseDown={()=>this.mouse_event(this,3)}
                    onMouseUp={()=>this.mouse_event(this,4)}
                    onClick={()=>this.mouse_event(this,5)}
                  />
                </td>
                <td width={96} className="bg_1">
                  <img
                    id="btn_order"
                    src="./image/btn_order.png"
                    onMouseOver={()=>this.mouse_event(this,1)}
                    onMouseOut={()=>this.mouse_event(this,2)}
                    onMouseDown={()=>this.mouse_event(this,3)}
                    onMouseUp={()=>this.mouse_event(this,4)}
                    onClick={()=>this.mouse_event(this,5)}
                  />
                  <img
                    id="btn_order_end"
                    src="./image/btn_order_end.png"
                    style={{ height: 0, visibility: "hidden" }}
                    onMouseOver={()=>this.mouse_event(this,1)}
                    onMouseOut={()=>this.mouse_event(this,2)}
                    onMouseDown={()=>this.mouse_event(this,3)}
                    onMouseUp={()=>this.mouse_event(this,4)}
                    onClick={()=>this.mouse_event(this,5)}
                  />
                </td>
                <td width={96} className="bg_1">
                  <img
                    id="btn_print"
                    src="./image/btn_print.png"
                    onMouseOver={()=>this.mouse_event(this,1)}
                    onMouseOut={()=>this.mouse_event(this,2)}
                    onMouseDown={()=>this.mouse_event(this,3)}
                    onMouseUp={()=>this.mouse_event(this,4)}
                    onClick={()=>this.mouse_event(this,5)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div id="con_p">
          <div
            style={{
              backgroundImage: 'url("./image/bgnew.png")',
              width: 244,
              height: 66
            }}
          >
            <table id="player">
              <tbody>
                <tr>
                  <td width={88} />
                  <td width={58} align="right" />
                  <td width={20} />
                  <td width={40} align="center" />
                </tr>
                <tr height={9}>
                  <td colSpan={4} />
                </tr>
                <tr>
                  <td width={88} />
                  <td width={58} align="right" />
                  <td width={20} />
                  <td width={40} align="center" />
                </tr>
              </tbody>
            </table>
          </div>
          <div id="info" className="top_border">
            <table
              id="MInfo"
              width="100%"
              style={{ marginTop: 7 }}
              cellSpacing={0}
              cellPadding={0}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      fontSize: 12,
                      color: "#333333",
                      fontWeight: "bold"
                    }}
                    align="center"
                  />
                </tr>
                <tr>
                  <td
                    style={{
                      lineHeight: 19,
                      overflow: "hidden",
                      height: 120,
                      width: 244
                    }}
                  ></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div
              style={{
                backgroundColor: "#949494",
                height: 1,
                width: "100%",
                marginTop: 0
              }}
            />
            <div id="nextmove" style={{ marginTop: 7 }}>
              <img
                src="./image/btn_gibo.png"
                style={{ position: "absolute", right: 5, visibility: "hidden" }}
                id="btn_gibo"
                onMouseOver={()=>this.mouse_event(this,1)}
                onMouseOut={()=>this.mouse_event(this,2)}
                onMouseDown={()=>this.mouse_event(this,3)}
                onMouseUp={()=>this.mouse_event(this,4)}
                onClick={()=>this.mouse_event(this,5)}
              />
            </div>
            <table style={{ marginTop: 8 }} width="100%">
              <tbody>
                <tr>
                  <td>
                    <img
                      id="btn_bs"
                      src="./image/btn_bs.png"
                      onClick={()=>this.ans_mouse_event(this)}
                    />
                  </td>
                  <td>
                    <img
                      id="btn_ws"
                      src="./image/btn_ws.png"
                      onClick={()=>this.ans_mouse_event(this)}
                    />
                  </td>
                  <td>
                    <img
                      id="btn_bws"
                      src="./image/btn_bws.png"
                      onClick={()=>this.ans_mouse_event(this)}
                    />
                  </td>
                  <td>
                    <img
                      id="btn_hinton"
                      src="./image/btn_hinton.png"
                      style={{ height: 0, visibility: "hidden" }}
                      onMouseOver={()=>this.mouse_event(this,1)}
                      onMouseOut={()=>this.mouse_event(this,2)}
                      onMouseDown={()=>this.mouse_event(this,3)}
                      onMouseUp={()=>this.mouse_event(this,4)}
                      onClick={()=>this.mouse_event(this,5)}
                    />
                    <img
                      id="btn_hintoff"
                      src="./image/btn_hintoff.png"
                      onMouseOver={()=>this.mouse_event(this,1)}
                      onMouseOut={()=>this.mouse_event(this,2)}
                      onMouseDown={()=>this.mouse_event(this,3)}
                      onMouseUp={()=>this.mouse_event(this,4)}
                      onClick={()=>this.mouse_event(this,5)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <table
              width="100%"
              style={{ marginTop: 7 }}
              cellSpacing={0}
              cellPadding={0}
            >
              <tbody>
                <tr>
                  <td>
                    <div
                      style={{
                        backgroundColor: "#949494",
                        height: 1,
                        width: "100%",
                        marginBottom: 7
                      }}
                    />
                    <div id="explain_title" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            id="ta1"
            className="board_div"
            style={{ paddingLeft: 5, paddingTop: 5, paddingBottom: 5 }}
          >
            <div
              id="explain"
              style={{
                width: "100%",
                height: "100%",
                border: 0,
                overflowY: "scroll",
                lineHeight: "150%",
                fontSize: 12,
                fontFamily: "gulimche"
              }}
            ></div>
          </div>
          <div id="con_p2" style={{ display: "none" }}>
            <div id="news" style={{ width: "100%" }}>
              <img
                src="./image/btn_01.png"
                style={{ position: "absolute", right: 0, top: 0 }}
                id="btn_01"
                onMouseOver={()=>this.mouse_event(this,1)}
                onMouseOut={()=>this.mouse_event(this,2)}
                onMouseDown={()=>this.mouse_event(this,3)}
                onMouseUp={()=>this.mouse_event(this,4)}
                onClick={()=>this.mouse_event(this,5)}
              />
              <img
                src="./image/btn_02.png"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  visibility: "hidden"
                }}
                id="btn_02"
                onMouseOver={()=>this.mouse_event(this,1)}
                onMouseOut={()=>this.mouse_event(this,2)}
                onMouseDown={()=>this.mouse_event(this,3)}
                onMouseUp={()=>this.mouse_event(this,4)}
                onClick={()=>this.mouse_event(this,5)}
              />
            </div>
            <div id="ta2" className="board_div">
              <style
                dangerouslySetInnerHTML={{
                  __html:
                    "\n            ul {\n              font-size: 12px;\n              color: #4c4c4c;\n              font-family: Dotum;\n              line-height: 130%;\n              word-break: break-all;\n            }\n\n            .box {\n              width: 232px;\n              height: 144px;\n              background-color: #FFF;\n              border: 1px solid #ccc;\n              padding: 5px 5px 5px 5px;\n            }\n\n            .dot ul {\n              margin: 0 0 0 0;\n              padding: 0 0 0 0;\n            }\n\n            .dot ul li {\n              margin: 3px 0 0 4px;\n              padding: 0 0 0 11px;\n              background: url(/images/common/dot.gif) 4px 6px no-repeat;\n              list-style-position: outside;\n              list-style-type: none;\n            }\n          "
                }}
              />
              <div className="box">
                <table width="100%" cellSpacing={0} cellPadding={0}>
                  <tbody>
                    <tr>
                      <td>
                        <table width="100%" cellSpacing={0} cellPadding={0}>
                          <tbody>
                            <tr>
                              <td valign="top" style={{ padding: "2px 0 0 0" }}>
                                <span className="dot">
                                  <ul>
                                    <li>
                                      <b>
                                        <a
                                          href="http://www.cyberoro.com/news/news_view.oro?div_no=11&num=526152"
                                          target="new"
                                        >
                                          박정환 'V30'
                                        </a>
                                      </b>
                                      <img
                                        src="http://www.cyberoro.com/images/icon_new.gif"
                                        align="absmiddle"
                                        hspace={2}
                                        vspace={3}
                                      />
                                    </li>
                                    <li>
                                      <a
                                        href="http://www.cyberoro.com/news/news_view.oro?div_no=11&num=526154"
                                        target="new"
                                      >
                                        지옥에서 천당으로
                                      </a>
                                      <img
                                        src="http://www.cyberoro.com/images/icon_new.gif"
                                        align="absmiddle"
                                        hspace={2}
                                        vspace={3}
                                      />
                                    </li>
                                    <li>
                                      <a
                                        href="http://www.cyberoro.com/news/news_view.oro?div_no=14&num=526153"
                                        target="new"
                                      >
                                        김다빈, '112대 1' 경쟁률을 뚫...
                                      </a>
                                      <img
                                        src="http://www.cyberoro.com/images/icon_new.gif"
                                        align="absmiddle"
                                        hspace={2}
                                        vspace={3}
                                      />
                                    </li>
                                    <li>
                                      <a
                                        href="http://www.cyberoro.com/news/news_view.oro?div_no=11&num=526150"
                                        target="new"
                                      >
                                        서능욱-김동엽, 원투펀치 빛났...
                                      </a>
                                      <img
                                        src="http://www.cyberoro.com/images/space.gif"
                                        align="absmiddle"
                                        hspace={2}
                                        vspace={3}
                                      />
                                    </li>
                                  </ul>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td height={8}></td>
                    </tr>
                    <tr>
                      <td>
                        <div id="today_AD" />
                        <div id="today_live_menu" />
                        <a
                          href="http://www.cyberoro.com/board/app_list.oro?bd_div=13"
                          target="_blank"
                        >
                          <img
                            src="http://www.cyberoro.com/images/banner/230_50/iphone_230_50.gif"
                            border={0}
                          />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div id="con_p3">
            <div style={{ marginTop: 11 }}>
              <div style={{ float: "left" }}>
                <img
                  id="btn_auto"
                  src="./image/btn_auto.png"
                  onMouseOver={()=>this.mouse_event(this,1)}
                  onMouseOut={()=>this.mouse_event(this,2)}
                  onMouseDown={()=>this.mouse_event(this,3)}
                  onMouseUp={()=>this.mouse_event(this,4)}
                  onClick={()=>this.mouse_event(this,5)}
                />
                <img
                  id="btn_stop"
                  src="./image/btn_stop.png"
                  style={{ height: 0, visibility: "hidden" }}
                  onMouseOver={()=>this.mouse_event(this,1)}
                  onMouseOut={()=>this.mouse_event(this,2)}
                  onMouseDown={()=>this.mouse_event(this,3)}
                  onMouseUp={()=>this.mouse_event(this,4)}
                  onClick={()=>this.mouse_event(this,5)}
                />
              </div>
              <select
                id="secondSE"
                style={{
                  float: "left",
                  width: 50,
                  margin: "0 5px",
                  height: 20
                }}
              ></select>
              <div style={{ float: "left", margin: "0 5px" }}>
                <img
                  src="./image/btn_move.png"
                  id="btn_move"
                  onMouseOver={()=>this.mouse_event(this,1)}
                  onMouseOut={()=>this.mouse_event(this,2)}
                  onMouseDown={()=>this.mouse_event(this,3)}
                  onMouseUp={()=>this.mouse_event(this,4)}
                  onClick={()=>this.mouse_event(this,5)}
                />
              </div>
              <form style={{ float: "left" }} onSubmit={()=>{return false}}>
                <input
                  id="moveEd"
                  type="text"
                  style={{ width: 30, height: 18 }}
                />
              </form>
              <div style={{ float: "left", marginLeft: 5 }}>
                <img id="gibo_sound" onClick={()=>this.sound_mouse_event(this) }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  {
    const {
      screens,
      user: { user }
    } = state;
    return {
      screens
    };
  }
};
const mapDispatchToProps = dispatch => ({
  userConnect: () => dispatch(socketActions.userConnect()),
  sendMessage: param => dispatch(socketActions.sendMessage(param)),
  getUser: () => dispatch(userActions.getUser()),
  dispatch
});
export default connect(mapStateToProps, mapDispatchToProps)(GameGo);
