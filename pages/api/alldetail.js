
import React from 'react'

function Index ({ test,User_id,BarCode }) { 
    return(
    <>
<div style={{ margin: 20 }}>
 <h1>Details About {User_id} & {BarCode} </h1>
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
       {/* {JSON.stringify(test)} */}
      
      {test.map((x, i) => {
      
      return <tr key={i}>
        {/* <td>{JSON.stringify(test)}</td> */}
        
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
  return {test,User_id,BarCode}; 

}
  
export default Index;
