
import {useEffect, useState} from "react";
import {Link, useParams ,useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import axios from 'axios';
import MapContainer from "./mapcontainer/MapContainer";
import DetailMap from "./mapcontainer/detailMap";

function Partybbsdetail(){
    let params = useParams("");
    let history = useNavigate();
    const [id, setId] = useState('');
    const [partybbslist, setPartybbslist] = useState([]);
    //const { partybbsSeq } = useParams();
    const [partybbsSeq, setPartybbsseq] = useState(params.seq);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        let login = JSON.parse(localStorage.getItem("login"));
        if(login !== undefined){ // 빈칸이 아닐때
            
            setId(login.id);
            console.log(partybbsSeq);
        }else{
           // alert('로그인해 주십시오');
           history('/login');
        }
              
    }, [history]); 

    useEffect(() => {
      axios
        .get(`http://localhost:3000/partyBbsdetail`, { params:{ "partySeq":partybbsSeq }})
        .then((response) => {
          console.log(response.data);
          setPartybbslist(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [partybbsSeq]);
    //partybbslist.title
    //partybbslist.mdate
    //partybbslist.place

    const apply  = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("partySeq", partybbsSeq);
        formData.append("id", id);
        formData.append("title", partybbslist.title);
        formData.append("masterid", partybbslist.id);
        formData.append("totalmem", partybbslist.people);

        await axios.post('http://localhost:3000/ ', formData)
        .then(function(res){
            console.log(res.data);
          })
          .catch(function(err){
            console.log(err);
          })
    }

    const pbdelete = async (e) =>{
        e.preventDefault();

        await axios.post('http://localhost:3000/deletePartybbs ',null, { params:{"partySeq": partybbsSeq}})
        .then(function(res){
            console.log(res.data);
          })
          .catch(function(err){
            console.log(err);
          })

    }

    return(
        <div>
            <input type="text" value={partybbslist.title} readOnly/><br/>
            일시: <input type= "text"  value={partybbslist.mdate} readOnly/><br/>
            모임장소 : <input type="text" value={partybbslist.place} readOnly/>
            <button onClick={()=> setModalIsOpen(true)} >지도</button><br/>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} > 
            <DetailMap searchPlace={partybbslist.place} />
            <button onClick={()=> setModalIsOpen(false)}>완료</button>
            </Modal>
            {/* <input type="text" value={partybbslist.a} readOnly>//</input> */}
            <input type="text" value={partybbslist.id} readOnly/>
            {partybbslist.applymem}/{partybbslist.people}
            <input type="text" value={partybbslist.applymem} readOnly/>
            <button onClick={apply}>신청</button><br/>
            <textarea value={partybbslist.content} readOnly></textarea><br/>
            <button>댓글</button>
            <Link to={/partybbsupdate/+partybbsSeq}>
            <button>수정</button>
            </Link>
            <button onClick={pbdelete}>삭제</button>
        </div>
    );
}

export default  Partybbsdetail