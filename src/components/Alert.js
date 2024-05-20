import React from 'react'

export default function (props) {
  // This function is for Capitalize the first word of message type i.e. Success
  const Capitalize= (word)=>{
if(!word){
  return "";
}
if(word === "danger"){
  word = "Error";
}
  }
  return (
    // In this code it works like --  If props.alert is null then it gives props.alert otherwise 
    // the code written after &&
    <div style={{height: '50px'}}>
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    <strong>{Capitalize(props.alert.type)}</strong>:{props.alert.msg}
  </div>}
  </div>
  )
}
