class Food{
    constructor(){
        this.milk=loadImage("Milk.png");
        this.foodStock=0
    }
  
    getFoodStock(){
      return this.foodStock;
    }
  
    updateFoodStock(foodStock){
       this.foodStock = foodStock;
    }
  
    deductFood(){
      if(this.foodStock>0){
        this.foodStock = this.foodStock-1;
      }
    }

    bedRoom(){
     image(bedRoomImg, 550, 500);
    }

    washRoom(){
     image(washRoomImg, 550, 500);
    }

    garden(){
     image(gardenImg, 550, 500);
    }
  
    display(){
      var x=80;
      var y=100;
      imageMode(CENTER);
      image(this.milk, 620, 300, 70, 70);
  
      if(foodStock!==0){
         for(var a=0; a<this.foodStock; a++){
           if(a%10==0){
             x=80;
             y+=50;
           }
           image(this.milk, x, y, 50, 50);
           x=x+30;
         }
      }
    }
  }