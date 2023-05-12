import * as React from "react";
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

function PartyRequest() {
  let history = useNavigate();
  const [id, setId] = useState("");

  const [requestlist, setRequestlist] = useState([]);
  const [totalPeople, setTotalPeople] = useState("");
  //paging hook
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
  function myRequestList(page) {
    axios
      .get("http://localhost:3000/myRequestList", { params: { pageNumber: page, id: id } })
      .then(function(resp) {
        //console.log(resp.data);
        setRequestlist(resp.data.list); // map을 return하기 때문(map 안에 list있음)
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
        myRequestList(0);
      }
    },
    [id]
  );

  function pageChange(page) {
    setPage(page);

    myRequestList(page - 1);
  }

  const gomy = () => {
    history("/mybbsList");
  };
  const goinfo = () => {
    history("/mypage");
  };
  const goparty = () => {
    history("/partyAccept");
  };
  const gomyparty = () => {
    history("/partyList");
  };

  const gobbs = () => {
    history("/partyAccept");
  };
  const gofree = () => {
    history("/partyRequest");
  };
  if (requestlist.length > 0) {
    return (
      <>
     
        <div className="gamssagi3">
          <table className="ttable" border="1" style={{ margin: "0 auto" }}>
            <colgroup>
              <col width="70" />
              <col width="600" />
              <col width="100" />
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>파티제목</th>
                <th>수락여부</th>
                <th>모집여부</th>
              </tr>
            </thead>

            <tbody>
              {requestlist.map(function(bbs, i) {
                return (
                  <tr key={i}>
                    <td align="center">{i + 1}</td>
                    <td align="left">
                      <Link to={`/partybbsdetail/${bbs.partySeq}`}> {bbs.title}</Link>
                    </td>
                    {bbs.check === 0 ? <td align="center" className="partyWhat">수락중...</td> : <td align="center" className="partyWhat3">수락완료!</td>}
                    {bbs.full === 0 ? <td align="center" className="partyWhat">모집중</td> : <td align="center" className="partyWhat2">모집끝</td>}
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

export default PartyRequest;