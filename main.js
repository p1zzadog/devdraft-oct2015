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

park.forEach(function(attraction){
//    cc table
    var ccTable = [];

});

//var visitorTotal = prompt('Enter the number of visitors');
//
//var Visitor = function (numberOfAttractions, attractionsItinerary) {
//    this.numberOfAttractions = numberOfAttractions;
//    this.attractionsItinerary = attractionsItinerary;
//};
//
//var allVisitors = (function(vT, pk){
//    var num;
//    var attractions;
//    var arr = [];
//    var toInt = function(string){return parseInt(string)};
//    var parkItemIndex = function(attractionIndex){
//        return pk.findIndex(function(attraction){
//            return attraction.index===attractionIndex;
//        });
//    };
//    var getAttraction = function(parkItemIndex){return p[parkItemIndex]};
//    for (var i=0; i<tot; i++){
//        num = parseInt(prompt("how many attractions does this guest visit?"));
//        attractions = prompt("which attractions?")
//            .split(' ')
//            .map(toInt)
//            .map(parkItemIndex)
//            .map(getAttraction);
//        arr.push(new Visitor(num, attractions));
//    }
//    return arr;
//})(visitorTotal, park);
//
//console.log('park: ', park);
//console.log('allVisitors: ', allVisitors);
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
