

var allInput = input.split('\n');



var toInt = function(string){return parseInt(string)};

var totalAttractions = parseInt(allInput[0].trim());
var walkingTimes = allInput[1]
    .trim()
    .split(' ')
    .map(toInt);

var Attraction = function (index, cwAdj, cwTime, ccAdj, ccTime) {
    this.index = index;
    this.cwAdj = cwAdj;
    this.cwTime = cwTime;
    this.ccAdj = ccAdj;
    this.ccTime = ccTime;
};

var park = (function(tA, wlkArr){
    var p = [];
    var isFirst = function(m){
        return m===0;
    };
    var isLast = function(m, n){
        return m===n-1;
    };
    for (var i=0; i<tA; i++) {
        if (isFirst(i)) {
            p.push(new Attraction(i, tA - 1, wlkArr[tA - 1], i + 1, wlkArr[i]));
        }
        else if (isLast(i, tA)) {
            p.push(new Attraction(i, i - 1, wlkArr[i - 1], 0, wlkArr[tA-1]));
        }
        else {
            p.push(new Attraction(i, i - 1, wlkArr[i - 1], i + 1, wlkArr[i]));
        }
    }
    return p;
})(totalAttractions, walkingTimes);

// strategy: create two(counterclockwise and clockwise) 2-dimensional arrays representing all possible paths
// outer array index represents origin of travel
// inner array index represents destination, value represents travel time
// i.e. ccTimeTable[3][2] --> 18 (minutes)


//    cc table
var ccTimeTable = (function(){

    var ccTemp = [];
    var fullCircle = function(){
        return park.reduce(function(ticktock, attraction){
            return ticktock + attraction.ccTime;
        },0);
    };

    var ccRouteNoWrap = function(start, stop){
        var ticktock=0;
        for (var i = start; i < stop; i++) {
            ticktock += park[i].ccTime;
        }
        return ticktock;
    };

    var ccRouteWrap = function(start, stop){
        var ticktock=0;
        for (var i = stop; i < start; i++) {
            ticktock += park[i].ccTime;
        }
        return ticktock;
    };

    for (var origin = 0; origin<park.length; origin++){

        var ccTempPrime = [];
        for (var destination = 0; destination<park.length; destination++){

            ccTempPrime.push((function() {

                if (origin === destination) return fullCircle();

                if (origin <= destination) return ccRouteNoWrap(origin, destination);

                if (origin > destination) return fullCircle() - ccRouteWrap(origin, destination);


            })());
        }
        ccTemp.push(ccTempPrime);
    }
    return ccTemp;
})();

// easiest to produce CW array by transposing CC array
var transpose = function(array){
    var arr = [];
    return arr = array[0].map(function(col, i){
        return array.map(function(row){
            return row[i];
        });
    });
};

var cwTimeTable = transpose(ccTimeTable);

var visitorTotal = parseInt(allInput[2].trim());

var Visitor = function (attrNumber, attrItinerary, timeItinerary) {
    this.attrNumber = attrNumber;
    this.attrItinerary = attrItinerary;
    this.timeItinerary = timeItinerary;
};

var allVisitors = (function(vT){
    var num;
    var attractions;
    var time;
    var arr = [];
    var bestRoute = function(prev, current, dex, ray){
        if (dex+1 === ray.length){
            return prev;
        }
        else if (ccTimeTable[ray[dex]][ray[dex+1]] <= cwTimeTable[ray[dex]][ray[dex+1]]){
            return prev + ccTimeTable[ray[dex]][ray[dex+1]];
        }
        else{
            return prev + cwTimeTable[ray[dex]][ray[dex+1]]
        }
    };
    var determineRouteTime = function(route){
      return route.reduce(bestRoute,0);
    };

    for (var i=0; i<vT; i++){
        num = parseInt(allInput[3 + i*2].trim());
        attractions = allInput[4 + i*2]
            .trim()
            .split(' ')
            .map(toInt);
        time = determineRouteTime(attractions);

        arr.push(new Visitor(num, attractions, time));
    }
    return arr;
})(visitorTotal);

allVisitors.forEach(function(visitor){
    //process.stdout.write(visitor.timeItinerary);
    console.log(visitor.timeItinerary);
});

