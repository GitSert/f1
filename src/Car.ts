class Car {
    private image:HTMLImageElement;
    private name:string;
    distance:number;
    xPosition:number;
    yPosition:number;
    
    constructor(imagePath: string, xPosition: number, yPosition: number) {
        this.image = this.loadNewImage(imagePath);
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    }

    /**
     * 
     * @param source 
     */
    public setDistance = (distanceRaced:number) => {
        this.distance = distanceRaced;
    }

    /**
     * 
     * @param source 
     */
    public getDistance = () => {
        
    }

    /**
     * 
     * @param source 
     */
    private getXPosition = () => {

    }

    /**
     * 
     * @param source 
     */
    private getYPosition = () => {
        
    }

    /**
     * 
     * @param source 
     */
    private getName = () => {
        return this.name
    }

    /**
     * 
     * @param source 
     */
    public draw = (ctx:CanvasRenderingContext2D) => {   
        ctx.drawImage(this.image, this.xPosition, this.yPosition)
    }

    /**
    * Method to load an image
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    private loadNewImage = (source: string): HTMLImageElement => {
        const img = new Image();
        img.src = source;
        return img;
    }
}