
export default function User(id, name, email , nickname, dob, address, phone, password=null, userStatus = "active", roars) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.nickname = nickname;
    this.dob=dob;
    this.address=address;
    this.password=password;
    this.userStatus=userStatus;
    this.roars=roars;
    this.phone=phone;
    this.resources=[]
    

    this.addResources=(resourse)=>{
        this.resources.push(resourse)
    }

    
   
    this.toString = () => {
        
       return `Id: ${this.id}, ${this.nome}, ${this.email}, ${this.nickname}  `;
    }
}

   