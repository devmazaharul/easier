class CustomError extends Error {
  status: number
  constructor(message:string,status:number){
    super(message)
    this.status=status || 400
    this.name="customerr"
  }
}

export {
  CustomError
}