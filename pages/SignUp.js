import React from 'react'
import styles from '../styles/Signup.module.css'
import NextAuth from 'next-auth'

function SignUp() {
    return(  
        <div>
            <div className={styles.backcolo}>
           <div className={styles.box_sign}>
              <form> 
                         <div> 
                          <h1 className={styles.headingsign} >Sign Up Here...
                         </h1>
                           </div>  
                           <div>
                         <input className={styles.Usersign} type='New Userid'
                         name="Userid"
                         placeholder="New Userid"
                       />
                         </div>

                         <div >
                         <input  className={styles.Passsign} type='Password'
                         name="Password"
                         placeholder="Password"/>
                         </div>

                         <div >
                         <input  className={styles.Emailsign} type='Email'
                         name="Email"
                         placeholder="Email"/>
                         </div>

                         <div >
                         <input  className={styles.Phnsign} type='Phone Number'
                         name="Phone Number"
                         placeholder="Phone Number"/>
                         </div>

                         <div>       
                         <button className={styles.Subsign} > Submit 
                         </button>
                         </div>
                 </form>
                </div>
                </div>
                </div>       
         );   
}
export default SignUp