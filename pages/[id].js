import React from 'react'
import {MdKeyboardArrowUp} from "react-icons/md"
import {MdKeyboardArrowDown } from "react-icons/md";
import {MdDelete} from "react-icons/md";
import {AiFillEye} from "react-icons/ai";
import Modal from 'react-awesome-modal';
import { useState } from 'react';
import styles from '../styles/Home.module.css'
import {RiLockPasswordLine} from "react-icons/ri";
import {MdPermIdentity} from "react-icons/md";
import {TbPassword} from "react-icons/tb";
import { toast, ToastContainer } from 'react-toastify';
import {FaExchangeAlt} from "react-icons/fa";

// import {RiBarcodeLine} from "react-icons/ri";

function Index ({ test,User_id,BarCode }) {
  const [Selectuserid, setSelectuserid] = useState();
  const [showing, setShow] = useState(false);
  const handleClick = async () => {
    var setShow1 = await Test().then((result) => {
      return result;
    });
    setShow(setShow1)
    console.log(setShow1) 
}

const reset = async () => {
  setShow("")
}

const [editing, setEdit] = useState(false);
const openModal = () => {
  setEdit(true);
};
const closeModal = () => {
  setEdit(false);
};
const [Userid, setUserid] = useState();
const [Password, setPassword] = useState();
const [Newpass, setNewpass] = useState();
const [Renewpass, setRenewpass] = useState();

const  handleChange=(e)=>{
  // setUserid({[e.target.name]:e.target.value});
  //  setPassword({[e.target.name]:e.target.value});
  if(e.target.name == "Userid"){
    setUserid(e.target.value)
    // e.target.value == Userid
  }
  else if(e.target.name == "Password"){
     setPassword(e.target.value);
  }
  else if(e.target.name == "Currentpass"){
    setNewpass(e.target.value);
 }
 else if(e.target.name == "Newpass"){
  setRenewpass(e.target.value);
}
}


const handleSubmit=async(evt) =>{               
  // const{Userid, Password}=state;
  evt.preventDefault(); 
  if((Userid)&&(Password)){
          const res = await fetch("/api/apis", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({Userid:Userid,Password:Password})
            })
            .then((result) => result.json ())
            .then((result) => {return result })
            if (Newpass === Renewpass) {
              toast.success("Password Changed...")
              // Router.router.push('/'+Userid)
            }
            else{
              toast.warn("Not Matched")
            }
          }
          else{
                  toast.warn("Fill the credentials")
          }         

}

return(
<>
<div style={{ margin: 20 }}>
 <h1>Details About {User_id}:- </h1>
  <table border="1">
    <thead>
        <tr>
               <th>Userid</th>
               <th>Password</th>
               <th>BarCode</th>
               <th>Pin</th>
               <th>RequestToken</th>
               <th>SecretKey</th>
               <th>UserCode</th>
               </tr>
    </thead>
    <tbody>
      {test.map((x, i) => {
      return <tr key={i}>
                <td>{x.Userid}</td>
                <td>{x.Password}</td>
                <td>{x.BarCode}</td>
                <td>{x.Pin}</td>
                <td>{x.RequestToken}</td>
                <td>{x.SecretKey}</td>
                <td>{x.UserCode}</td>
      </tr>})}
    </tbody>
  </table>

<div>
  <button onClick={()=>{handleClick();}} className={styles.For_m}><MdKeyboardArrowDown/>Show All<span> <AiFillEye/></span></button>
  <button onClick={()=>{reset();}} className={styles.For_Clear} >< MdKeyboardArrowUp/>Clear<span> <MdDelete/></span></button>
</div>

  <div>
        {showing.length > 0 ? <table border="1" style={{ width: "auto" }}>
          <thead>
            <tr>
              <th>Userid</th>
              <th>Password</th>
              <th>BarCode</th>
              <th>Pin</th>
              <th>RequestToken</th>
              <th>SecretKey</th>
              <th>UserCode</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {showing.map((x, i) => {
            //  var a={x.Userid}
              return <tr key={i}>
                <td>{x.Userid}</td>
                <td>{x.Password}</td>
                <td>{x.BarCode}</td>
                <td>{x.Pin}</td>
                <td>{x.RequestToken}</td>
                <td>{x.SecretKey}</td>
                <td>{x.UserCode}</td>
                
            
      <input type="button" value="Edit" onClick={() => {openModal();setSelectuserid(x.Userid)}} />
    
      <Modal
        
       var test3
         visible={editing}
        width="500"
        height="300"
        effect="fadeInRight"
        onClickAway={() => closeModal()}>
          
        <div>
        <ToastContainer/> 
          <h1>Hi {Selectuserid}</h1>
          <input  type='Userid'
                                name="Userid"
                                placeholder="Userid"
                                onChange={(evt)=>handleChange(evt)}/>          
        <MdPermIdentity/>
      
        <div>
        <input  type='Password'
                                name="Password"
                                placeholder="Password"
                                onChange={(evt)=>handleChange(evt)}/>
                              < RiLockPasswordLine/> 
                              </div>
                              <div>
       <input  type='Password'
                                name="Currentpass"
                                placeholder="New Password"
                                onChange={(evt)=>handleChange(evt)}/>
                              < TbPassword/> 
                              </div>
                              <div>
       <input  type='Password'
                                name="Newpass"
                                placeholder="Re-enter Password"
                                onChange={(evt)=>handleChange(evt)}/>
                              < TbPassword/> 
                              </div>
                              
                              <div>
        <input className={styles.changing} type='button'  onClick={handleSubmit}
                              value="Change"/>
                              <FaExchangeAlt/>
                              </div>
       
        <div>
   
          <a onClick={() => closeModal()}>
              <input className={styles.closing} type="button" value="Close"/>
          </a>
          </div>
          </div>
      </Modal>
              </tr>
            })}
          </tbody>
        </table> : <></>}
      </div>
  </div>
  </>
  )
}

Index.getInitialProps = async ({query}) => {
  const res= await fetch("http://localhost:3000/api/Fetch?Userid="+query.id,
   {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  );
  const data=await res.json();
  console.log(res)
  var test=data["data"]
  var User_id=query.id
  var BarCode=data["data"][0]["BarCode"]
  console.log(BarCode)
  Test();
  return {test,User_id,BarCode}; 
}

async function Test(){
  const res= await fetch("http://localhost:3000/api/table",
   {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json',
    },
  }
  );
  const data=await res.json();
  console.log(res)
  console.log(data)
  var test1=data["data"]
  console.log(test1);
  return test1;
}
export default Index;
