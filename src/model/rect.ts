
export class PmzRect{
    x:number;
    y:number;
    width:number;
    height:number;
    
    constructor(x:number, y:number, width:number, height:number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    isEmpty():boolean {
        return this.x === 0 && this.y === 0 && this.width === 0 && this.height === 0;    
    }
}
