import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-js-pagination";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function PartyList() {
  let history = useNavigate();
  const [id, setId] = useState("");
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [partyListmy, setPartyListmy] = useState([]);

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };
  // login 되어 있는지 검사
  useEffect(() => {
    let login = JSON.parse(localStorage.getItem("login"));
    if (login !== undefined) {
      // 빈칸이 아닐때

      setId(login.id);
    } else {
      // alert('로그인해 주십시오');
      history("/login");
    }
  }, [history]);

  function partyList(page) {
    axios
      .get("http://localhost:3000/partyListmy", { params: { pageNumber: page, id: id } })
      .then(function(resp) {
        //console.log(resp.data);
        setPartyListmy(resp.data.list); // map을 return하기 때문(map 안에 list있음)
        setTotalCnt(resp.data.cnt);

        //console.log(requestlist);
      })
      .catch(function(err) {
        alert(err);
      });
  }

  useEffect(
    function() {
      if (id) {
        partyList(0);
      }
    },
    [id]
  );

  function pageChange(page) {
    setPage(page);

    partyList(page - 1);
  }

  function go(seq) {
    //alert('찍히냐 : ' + seq)

    history(`partyRoom/${seq}`);
  }

  if (partyListmy.length > 0) {
    return (
      <>
        <div className="gamssagi3">
          <table border="1" style={{ margin: "0 auto" }}>
            <colgroup>
              <col width="70" />
              <col width="600" />
              <col width="200" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>파티제목</th>
                <th>파티정보 보기</th>
                <th>파티장</th>
              </tr>
            </thead>

            <tbody>
              {partyListmy.map(function(bbs, i) {
                return (
                  <tr key={i}>
                    <td align="center">{i + 1}</td>
                    <td align="center">{bbs.title}</td>
                    <td align="center">
                      <button onClick={() => history(`/myinfo/partyRoom/${bbs.partySeq}`)}>보기</button>
                    </td>
                    <td align="center">{bbs.masterId}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <br></br>
          <Pagination activePage={page} itemsCountPerPage={10} totalItemsCount={totalCnt} pageRangeDisplayed={5} prevPageText={"이전"} nextPageText={"다음"} onChange={pageChange} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <br></br>
        <br></br>
        <h3>작성된 내용이 없습니다.</h3>
        <br></br>
        <Pagination activePage={page} itemsCountPerPage={10} totalItemsCount={totalCnt} pageRangeDisplayed={5} prevPageText={"이전"} nextPageText={"다음"} onChange={pageChange} />
        <br></br>
      </>
    );
  }
}

export default PartyList;
