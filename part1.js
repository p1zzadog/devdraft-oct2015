var numberOfAttractions = parseInt(prompt('number of attractions: '));
var hoursOpen = parseInt(prompt('hours open: '));

var Attraction = function(queueTimes){
    this.queueTimes = queueTimes;
    return this;
};

var park = [];
park = (function(){
    var columns = [];
    for (var i = 0; i<numberOfAttractions; i++){
        var row = [];
        for (var j = 0; j<hoursOpen; j++){
            row.push(parseInt(prompt('Attraction ' + i + ' queue time for hour ' + j)));
        }
        columns.push(new Attraction(row));
    }
    return columns;
})();

var numberOfQueries = prompt('number of visitor queries: ');

var Query = function(enterTime, number, itinerary){
    this.enterTime = enterTime;
    this.number    = number;
    this.itinerary = itinerary;
    this.minTime   = 0;

    return this;
};

var allQueries = [];
allQueries = (function(){

//    decide first att



})();

//do i store queries in an array? do i calculate min time on the fly for each query that comes in without storing?