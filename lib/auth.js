// import axios from 'axios';

export const loginUser = async(email, password) => {
    const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email:email,password:password})
      })
      .then((result) => result.json ())
      .then((result) => {return result })
  
     
    }
  
