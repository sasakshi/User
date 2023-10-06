
import React from "react";
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class LoginForm extends React.Component  {
    
        state = {
        Userid:'',
        Password:''       
        };
    
        handleChange=(evt)=>{
                this.setState({[evt.target.name]:evt.target.value});
        }
        // handleClick=()=>{
        //         console.log("Submit")
        //         Router.router.push('/'+this.state.Userid)
        //        }
        
        handleSubmit=async(evt) =>{
                
                const{Userid, Password}=this.state;
                evt.preventDefault(); 
                if((this.state.Userid)&&(this.state.Password)){
                        const res = await fetch("/api/auth", {
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
                            Router.router.push('/' + this.state.Userid)
                    
                          }
                          else if (res.Remark === 2) {
                            // alert(res.data)
                            toast.warn(res.data)
                          }
                          else if (res.Remark === 3) {
                            toast.warn(res.data)
                          }
                          
                          // if(res.Remark===1){
                          //       const res = await fetch("/api/Fetch?Userid="+this.state.Userid, {
                          //               method: "GET",
                          //               headers: {
                          //                 "Content-Type": "application/json"
                          //               },
                                       
                          //             })
                          //             .then((result) => result.json ())
                          //             .then((result) => {return result })
                          //              console.log(res,this.state)
                               
                          // }

                      
                        }
                        else{
                                toast.warn("Fill the credentials")
                        }         
        };
     
        render(){
                
                return(
                      
               <div>
                 <ToastContainer />
                <div className={styles.shadow_in}>
                <div className={styles.box_in}>
                        <form  onSubmit={this.handleSubmit}> 
                                <div> 
                                 <h1 className={styles.heading} >Login
                                </h1>
                                  </div>  
                                  <div>
                                <input className={styles.User} type='Userid'
                                name="Userid"
                                placeholder="Userid"
                                onChange={(evt)=>this.handleChange(evt)}/>
                                </div>

                                <div >
                                <input  className={styles.Pass} type='Password'
                                name="Password"
                                placeholder="Password"
                                onChange={(evt)=>this.handleChange(evt)}/>
                                </div>

                                <div>       
                                <button className={styles.Sub} onClick={this.handleSubmit}>Submit
                                </button>
                                </div>
                               
                              
                        </form>
                       </div>
                       </div>
                        </div>
                       
                );
              
        }
}

export default LoginForm;