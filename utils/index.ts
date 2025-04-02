import { CustomError } from "@/error/customError";
import { signup } from "@/types";

const isValidName = (name = '') => {
  const regex = /^[a-zA-Z][a-zA-Z .'-]{1,48}[a-zA-Z]$/;
  return regex.test(name);
};
const isValidEmail = (email = '') => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};
const isValidNumberbd = (number:string) => {
  const regex = /^(01[3-9]\d{8})$/;
  return regex.test(number.toString());
};

const isValidshopName=(shopname:string)=>{
  const regex = /^[A-Za-z0-9\s\-\_&]{2,}$/;
  return regex.test(shopname)
}

const isValidLoginfields=({email}:{email:string})=>{
   if(! isValidEmail(email)) throw new CustomError("Invalid email",400)
    if(email.length>100)  throw new CustomError("Email max 100 character ",400)
    return true;
}
const isValidSignupfields=({name,email,address,number,password,shopname}:signup)=>{
   if(! isValidEmail(email)) throw new CustomError("Invalid email",400);
   if(!isValidNumberbd(number))throw new CustomError("Invalid bd 11 digit number",400)
    if(!isValidName(name)) throw new CustomError("Invalid name",400)
      if(!isValidshopName(shopname)) throw new CustomError("Invalid shop name min 2 character ",400);
    if(shopname.length>30) throw new CustomError("shop name max 30 character",400)
        if(password.length<5 || password.length>50) throw new CustomError("Password min 5 and max 50 character" ,400);
   if(address.length>150 || address.length<2) throw new CustomError("invalid address min 2 and max 150 character",400)
   return true;
}

const isValidrsetForm=(email:string)=>{
    if(!isValidEmail(email)) throw new CustomError("Invalid email address",400);
    if(email.length>100)  throw new CustomError("Email max 100 character ",400)
    return true
} 
const isValidStafForm=(number:string)=>{
  if(!isValidNumberbd(number)) throw new CustomError("Invalid bd number",400);
   return true
} 



export { 
  isValidLoginfields,
  isValidSignupfields,
  isValidrsetForm,
  isValidStafForm,
  isValidName,
  isValidNumberbd,
  isValidEmail
 };
