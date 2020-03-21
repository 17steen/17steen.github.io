
var zoom;

function setup(){
    createCanvas(800, 800);
    zoom = 1;
    //let C = new Complex(x,y);
    pixelDensity(1);
    loadPixels();
    reCalc();
}



var pos = {
    x: 0,
    y: 0
}

function reCalc(){
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            let pix = (x + y * width) * 4;
            let grayscale = CalcMandelbrot(x / (width/getScope()) + getMin().x, y /(height/getScope()) + getMin().y);
            pixels[pix + 0] = grayscale * 2.55;
            pixels[pix + 1] = grayscale * 2.55;
            pixels[pix + 2] = grayscale * 2.55;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
    console.log(getMin().x);
}

function draw(){

}

function getScope(){
    return 4 / zoom;
}

function getMin(){
    this.x = (mouseX / (width/getScope())) - getScope()/2;
    this.y = (mouseY / (height/getScope())) - getScope()/2;

    if(zoom === 1){   
        this.x = -2;
        this.y = -2;
    }

    return this;
}

function CalcMandelbrot(x, y){
    C = new Complex(x, y);
    Z = new Complex(0, 0);
    let i = 0;
    for(; i < 100; i++){
        Z = ComplexAdd(ComplexSquare(Z), C);
        if(Z.r >= 2 || Z.im >= 2){
            break;
        }
    }
    return i;
}

function mouseWheel(event) {
    //print(event.delta); // - 100 scroll up, + 100 scroll down !
    
    if(event.delta < 0){
        zoom += 0.5;
    }
    else if(event.delta > 0){
        zoom -= 0.5;
        if(zoom < 1){
            zoom = 1; //(can't go under one !!);
        }
    }
    console.log(`current zoom :  ${zoom}`);

    reCalc();

    //return false; //returning false disables scrolling
  }

function ComplexAdd(c, c1){
    newc = new Complex(c.r + c1.r, c.im + c1.im);
    return newc;
}

function ComplexSquare(c){
    newc = new Complex(Math.pow(c.r, 2) - Math.pow(c.im, 2) , 2 * c.im * c.r);
    return newc;
}

function Complex(x, y){ //constructor function
    this.r = x;
    this.im = y;
}
