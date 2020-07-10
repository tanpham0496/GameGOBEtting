const db = require('../../db/db');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    createData,
    getDataOnRound
};
async function createData() {
    try {
      const createMatch = await db.Match.create( {
              data : [
                  {
                      roundNumber: 1,
                      roundItem :
                          ';B[qd];W[pp];B[dc];W[cp];B[ce];W[oc];B[pf];W[fq];B[qq];W[pq];B[qp];W[qn];B[qo];W[po];B[rn];W[qm];B[rm];W[ql];B[kc];W[df];B[dp];W[dq];B[cq];W[do];B[ep];W[eq];B[co];W[bp];B[dn];W[eo]'
                  },
                  {
                      roundNumber: 2,
                      roundItem :
                          ';B[qd];W[pp];B[dc];W[cp];B[ce];W[oc];B[pf];W[fq];B[qq];W[pq];B[qp];W[qn];B[qo];W[po];B[rn];W[qm];B[rm];W[ql];B[kc];W[df];B[dp];W[dq];B[cq];W[do];B[ep];1;W[eq];B[co];W[bp];B[dn];W[eo];B[fp];W[cn];B[gq];W[cr];B[fo];W[en];B[fn];W[em];B[fm];W[el];B[gk];W[hq];B[gr];W[hp];B[gp];W[jp];B[jm];W[hn];B[hm];W[cf];B[de];W[fj];B[ef];W[eg];B[fg];W[eh];B[fh];W[fi];B[fk];W[ek]'
                  },
                  {
                      roundNumber: 3,
                      roundItem :
                          ';B[qd];W[pp];B[dc];W[cp];B[ce];W[oc];B[pf];W[fq];B[qq];W[pq];B[qp];W[qn];B[qo];W[po];B[rn];W[qm];B[rm];W[ql];B[kc];W[df];B[dp];W[dq];B[cq];W[do];B[ep];W[eq];B[co];W[bp];B[dn];W[eo];B[fp];W[cn];B[gq];W[cr];B[fo];W[en];B[fn];W[em];B[fm];W[el];B[gk];W[hq];B[gr];W[hp];B[gp];W[jp];B[jm];W[hn];B[hm];W[cf];B[de];W[fj];B[ef];W[eg];B[fg];W[eh];B[fh];W[fi];B[fk];W[ek];B[ei];W[ff];B[ee];W[di];B[dg];W[ej];B[dh];W[ei];B[bf];W[jk];B[in];W[ho];B[hj];W[il];B[im];W[ii];B[ll];W[hi];B[kj];W[kk];B[lk];W[lo];B[ln];W[kn];B[ko];W[kp];B[mn];W[jo];B[li];W[kh]'
                  },
                  {
                      roundNumber: 4,
                      roundItem :
                          'TE[제21회 농심신라면배 8국]' +
                          'RD[2019-11-25 ]' +
                          'PC[부산 농심호텔]' +
                          'TM[1시간]' +
                          'LT[60]' +
                          'LC[1]' +
                          'KO[6.5]' +
                          'RE[170수 백불계승]' +
                          'PB[신진서 ]' +
                          'BR[9단]' +
                          'PW[양딩신]' +
                          'HD[0]' +
                          'WR[9단]' +
                          'GK[1]' +
                          'TC[]' +
                          ';B[qd];W[pp];B[dc];W[cp];B[ce];W[oc];B[pf];W[fq];B[qq];W[pq];B[qp];W[qn];B[qo];W[po];B[rn];W[qm];B[rm];W[ql];B[kc];W[df];B[dp];W[dq];B[cq];W[do];B[ep];1;W[eq];B[co];W[bp];B[dn];W[eo];B[fp];W[cn];B[gq];W[cr];B[fo];W[en];B[fn];W[em];B[fm];W[el];B[gk];W[hq];B[gr];W[hp];B[gp];W[jp];B[jm];W[hn];B[hm];W[cf];B[de];W[fj];B[ef];W[eg];B[fg];W[eh];B[fh];W[fi];B[fk];W[ek];B[ei];W[ff];B[ee];W[di];B[dg];W[ej];B[dh];W[ei];B[bf];W[jk];B[in];W[ho];B[hj];W[il];B[im];W[ii];B[ll];W[hi];B[kj];W[kk];B[lk];W[lo];B[ln];W[kn];B[ko];W[kp];B[mn];W[jo];B[li];W[kh];B[jl];W[qc];B[rc];W[qb];B[on];W[qr];B[rr];W[pn];B[pd];W[mc];B[np];W[no];B[mo];W[mp];B[nq];W[nn];B[nm];W[oo];B[jr];W[mq];B[or];W[pr];B[mr];W[ir];B[is];W[hs];B[hr];W[js];B[iq];W[kr];B[is];W[ks];B[rl];W[qj];B[rb];W[gf];B[hg];W[gd];B[ke];W[me];B[nd];W[od];B[ne];W[oe];B[nf];W[pe];B[qe];W[of];B[nc];W[nb];B[ob];W[oa];B[pc];W[pb];B[og];W[ob];B[pg];W[lb];B[kb];W[md];B[mf];W[jd];B[id];W[hf];B[if];W[qa];B[ih];W[gg];B[ji];W[hh];B[ig];W[bh];B[cg];W[qh];B[rg];W[ij];B[rk];W[qk];B[ci];W[cj]'
                  },
              ]}
       );
      if(!createMatch) return {status : false, message : 'Create Data not success !'};

      return { status : true, match : createMatch}
    }
    catch (e) {
        console.log('error', e);
        return {status : false, message : e }
    }
}

async function getDataOnRound({_id, round}) {
    try{
        // if(!_idBetting) return { status : false, message : "Not found _idBetting"};
        //
        // // const Betting = await db.Betting.find({_id : ObjectId(_idBetting)}).lean();
        // //
        // // const dataOnRound = Betting.listRound.map(async (round) => {
        // //     return await db.Round.find({_id : ObjectId(round.roundId)})
        // // });
        //
        // const dataOnRound = await db.Round.find({_idBetting : ObjectId(_idBetting)}).lean( );
        // if(!dataOnRound) return { status : false, message : 'Get data not success' };

        // return { status : true, dataOnRound : dataOnRound}
    }
    catch (e) {
        console.log('Error', e);
        return { status : false, message : e};
    }
}
