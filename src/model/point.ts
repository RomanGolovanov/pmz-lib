
export class PmzPoint{
    x:number;
    y:number;
    
    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
    }
    
    isEmpty():boolean {
        return this.x === 0 && this.y === 0;    
    }
}
