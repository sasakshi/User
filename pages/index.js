
import React from "react";
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Image from "next/image";
import bgpp from '../public/bgpp.jpg'



function LoginForm () {
 const [Userid, setUserid] = useState();
 const [Password, setPassword ] = useState();

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
        }
      const Routing=async()=>{
        Router.router.push('/SignUp')
      }

             const handleSubmit=async(evt) =>{
                evt.preventDefault(); 
                if((Userid)&&(Password)){
                  console.log(Userid)
                        const res = await fetch("/api/apis", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json"
                            },
                            body: JSON.stringify({Userid:Userid,Password:Password})
                          })
                          .then((result) => result.json ())
                          .then((result) => {return result })
                          if (res.Remark === 1) {
                            toast.success("Login Successfully...")
                            Router.router.push('/'+ Userid)
                          }
                          else if (res.Remark === 2) {
                            // alert(res.data)
                            toast.warn(res.data)
                          }
                          else if (res.Remark === 3) {
                            toast.warn(res.data)
                          }
                        }
                        else{
                                toast.warn("Fill the credentials")
                        }         
        };
                return(  
               <div>
                <div style={{
                  zIndex: -1,
                  position:"fixed",
                  width:"100vw",
                  height:"100vh",
                  top:0,
                  left:0,
           
                }}>
                  <Image src={bgpp}
                  // width={500}
                  // height={250}
                  alt="Stocks"
                  placeholder="blur"
               layout="fill"
               objectFit="cover"
               backdrop-filter= "blur(5px)"
              //  -webkit-filter="blur(8px)"
            
                  />
                  </div>
                  <ToastContainer />
                  <div className={styles.box_in}>
                     <form  onSubmit={handleSubmit}> 
                                <div> 
                                 <h1 className={styles.heading} >Login
                                </h1>
                                  </div>  
                                  <div>
                                <input className={styles.User} type='Userid'
                                name="Userid"
                                placeholder="Userid"
                                onChange={(evt)=>handleChange(evt)}/>
                                </div>

                                <div >
                                <input  className={styles.Pass} type='Password'
                                name="Password"
                                placeholder="Password"
                                onChange={(evt)=>handleChange(evt)}/>
                                </div>

                                <div>       
                                <button className={styles.Sub} onClick={handleSubmit}> Submit 
                                </button>
                                </div>

                                  <div> 
                                    <ToastContainer/>
                                <button className={styles.Up} onClick={Routing}>New User?
                                </button>
                                </div> 
                        </form>
                       </div>
                       </div>
                      //  </div>
                      
                     
                       
                );
              
        }


export default LoginForm;