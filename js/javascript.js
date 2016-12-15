class TttLogic{

    static prependImage(square, turn) {
        //switch between naughts and crosses
        if(turn % 2 == 0){
            $("#" + square).prepend('<img style="display: block; margin: auto; pointer-events: none;" src="img/naught.png" height="150px" width="150px" />');
            return 0;
        }
        else{
            $("#" + square).prepend('<img style="display: block; margin: auto;" src="img/cross.png" height="150px" width="150px" />');
            return 1;
        }
    }
    static location(locationArray, square){

        if(square == "topLeft"){
            locationArray[0] = 0;
            locationArray[1] = 0;
        }
        else if(square == "topMiddle"){
            locationArray[0] = 0;
            locationArray[1] = 1;
        }
        else if(square == "topRight"){
            locationArray[0] = 0;
            locationArray[1] = 2;
        }
        if(square == "middleLeft"){
            locationArray[0] = 1;
            locationArray[1] = 0;
        }
        else if(square == "middleMiddle"){
            locationArray[0] = 1;
            locationArray[1] = 1;
        }
        else if(square == "middleRight"){
            locationArray[0] = 1;
            locationArray[1] = 2;
        }
        if(square == "bottomLeft"){
            locationArray[0] = 2;
            locationArray[1] = 0;
        }
        else if(square == "bottomMiddle"){
            locationArray[0] = 2;
            locationArray[1] = 1;
        }
        else if(square == "bottomRight"){
            locationArray[0] = 2;
            locationArray[1] = 2;
        }
        return locationArray;
    }

    static imgInArray(record, locationArray, move){
        //push 0 for naught or 1 for cross
        if(move == 0){
            record[locationArray[0]][locationArray[1]] = -1;
            return record;
        }
        else{
            record[locationArray[0]][locationArray[1]] = 1;
            return record;
        }
    }
    static sumOfArray(sumArray, record){

        sumArray[0] = record[0].reduce((a, b) => a + b, 0);
        sumArray[1] = record[1].reduce((a, b) => a + b, 0);  
        sumArray[2] = record[2].reduce((a, b) => a + b, 0);  

        sumArray[3] = record[0][0] + record[1][0] + record[2][0];
        sumArray[4] = record[0][1] + record[1][1] + record[2][1];
        sumArray[5] = record[0][2] + record[1][2] + record[2][2];  

        sumArray[6] = record[0][0] + record[1][1] + record[2][2];
        sumArray[7] = record[0][2] + record[1][1] + record[2][0]; 

        return sumArray;
    }

    static winnerCheck(sumArray, turn){
        for(let i in sumArray)
        {
            if(sumArray[i] == 3){
                $(".winner").html("Crosses Wins!");
                $('.square').off('click');
            } else if (sumArray[i] == -3){
                $(".winner").html("Naughts Wins!");
                $(".square").off('click');             
            } else if (turn == 9){
                //if 9 moves have been made and there is no winner
                $(".winner").html("Draw!");               
            }
        }
    }
}

$(document).ready(function(){
    //array for tracking which cell has been filled 
    let sumArray = [];
    //array for the co-ordinates of the location
    let locationArray = [];
    //array for what is in each cell
    let record = [
        [0, 0, 0], 
        [0, 0, 0], 
        [0, 0, 0]
    ];
    //track whos turn
    let turn = 0;

    $(".square").one("click", function(){
        //get id of the div
        let square = $(this).attr("id");
        //call prepend image function
        move = TttLogic.prependImage(square, turn);        
        //find location of click and enter into array
        locationArray = TttLogic.location(locationArray, square);
        //put the image into the correct location in the array
        record = TttLogic.imgInArray(record, locationArray, move)
        //get the sum of the arrays
        sumArray = TttLogic.sumOfArray(sumArray, record);
       //Check if there is a winner
        TttLogic.winnerCheck(sumArray, turn);
        
        turn++;
    });
});