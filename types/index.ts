
export interface signup{
  name:string,
  email:string,
  number:string,
  password:string,
  shopname:string,
  address:string
}

export interface login{
  email:string
  password:string
}
export interface stafLogin{
  number:number
  password:string
}

export interface newCustomer{
  number:number
  password:string
}

export interface aiResponce{
  data:{
    image_urls:string[]
  }
  metadata:{
    success_count:string
  }
  base_resp:{
    status_msg:string
  }

}

export interface productResponce{
  data:{
    filteredBy:string,
    items:string[]
  }
  message:string
  status:number
}


export interface tritem{
  updatedAt: string
  name:string,
  amount:number,
  userNumber:string,
  type:string
  addedBy:string
}


export interface ProductInfo {
 message:string
 status:number
 data:{
  addedByInfo:{
    addedBy:string
  }
  items:productItems
 }
}

export interface productItems{
adminId:string
isUpdate:string
amount:number
name:string
type:string
updatedAt:string
userNumber:string
_id:string
}


export interface jsonKeys{
  name:string
  role:string
}