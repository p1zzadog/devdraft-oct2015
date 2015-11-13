var totalAttractions = prompt("Number of attractions?");
var walkingTimes = prompt("Enter the time between each attraction in whole minute integers separated with spaces")
    .split(' ').map(function(element){return parseInt(element)});

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

console.log('park: ', park);


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

console.log('ccTimeTable: ', ccTimeTable);
console.log('cwTimeTable: ', cwTimeTable);


var visitorTotal = prompt('Enter the number of visitors');

var Visitor = function (attrNumber, attrItinerary) {
    this.attrNumber = attrNumber;
    this.attrItinerary = attrItinerary;
};

var allVisitors = (function(vT, pk){
    var num;
    var attractions;
    var arr = [];
    var toInt = function(string){return parseInt(string)};
    var parkItemIndex = function(attractionIndex){
        return pk.findIndex(function(attraction){
            return attraction.index===attractionIndex;
        });
    };
    var getAttraction = function(parkItemIndex){return p[parkItemIndex]};
    for (var i=0; i<tot; i++){
        num = parseInt(prompt("how many attractions does this guest visit?"));
        attractions = prompt("which attractions?")
            .split(' ')
            .map(toInt)
            .map(parkItemIndex)
            .map(getAttraction);
        arr.push(new Visitor(num, attractions));
    }
    return arr;
})(visitorTotal, park);

console.log('park: ', park);
console.log('allVisitors: ', allVisitors);
//
//var computeOutput = function(aV, pk, tA){
//
//    var out = [];
//
//    var ccTime = function(attrA, attrB) {
//        for (var i=attrA.index; i<)
//    };
//
//    var cwTime = function(attrA, attrB) {
//
//    };
//
//    out = aV.map(function(visitor){
//       for (var i=0; i<visitor.numAtr; i++){
//       //    need to write a utility function to compute times between attractions
//       //    2 inputs, A-->B
//       //    1 output, fastest time
//       }
//    });
//
//
//
//    return o;
//};
