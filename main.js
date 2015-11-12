var totalAttractions = prompt("Number of attractions?");
var walkingTimeString = prompt("Enter the time between each attraction in whole minute integers separated with spaces");
var walkingTimes = walkingTimeString.split(' ').map(function(element){return parseInt(element)});

var Attraction = function (index, cwAdj, cwTime, ccAdj, ccTime) {
    this.index = index;
    this.cwAdj = cwAdj;
    this.cwTime = cwTime;
    this.ccAdj = ccAdj;
    this.ccTime = ccTime;
};

var park = (function(tot, wlkArr){

    var p = [];

    var isFirst = function(m, n){
        return m===0;
    };

    var isLast = function(m, n){
        return m===n;
    };

    for (var i=0; i<tot; i++) {
        if (isFirst(i, tot)) {
            p.push(new Attraction(i, tot - 1, wlkArr[tot - 1], i + 1, wlkArr[i]));
        }
        else if (isLast(i, tot)) {
            p.push(new Attraction(i, i - 1, wlkArr[i - 1], 0, wlkArr[i]));
        }
        else {
            p.push(new Attraction(i, i - 1, wlkArr[i - 1], i + 1, wlkArr[i]));
        }
    }

    return p;
})(totalAttractions, walkingTimes);



//var numberOfVisitors = prompt('Enter the number of visitors');
//
//var Visitor = function (numAtr, atrArr) {
//    this.numAtr = numAtr;
//    this.atrArr = atrArr;
//};

console.log('park', park);
