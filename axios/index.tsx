"use client"
import { defaultKey } from "@/default";
import axios from "axios";

const token=typeof window!="undefined" && window.localStorage.getItem("token")?.startsWith("Bearer")?window.localStorage.getItem("token"):"";

const instance = axios.create({
  baseURL: defaultKey.api_url,
  headers: {
    "Content-Type": "application/json",
    "Authorization":token
  },
  timeout: 10000,
})


function hasToken(){
  if(typeof window !=="undefined"){
    const token = window.localStorage.getItem('token')
    if (token) {
      if (!token.startsWith('Bearer')) {
        window.localStorage.removeItem('token');
        return false;
      }else{
        return true
      }
    
    }
  }
}


export {
  instance,
  hasToken
  
}
