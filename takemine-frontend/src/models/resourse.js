export default function Resource(id, name, description , location, availability=true, cost, TU_ID, rating, type="Item") {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.availability=availability;
    this.cost=cost;
    this.TU_ID=TU_ID;
    this.rating= rating;

    this.type=type;
    this.categories=[]

    
    this.addCategories = (cat)=>{
        
        cat.forEach(c=>this.categories.push(c));

    }

    this.addCategory = (cat)=>{
        
        this.categories.push(cat);
    }
    

    this.toString = () => {
        
       return `Resourse: ${this.id}, ${this.name}, ${this.description}, ${this.cost}  `;
    }
    }
    
    
   
