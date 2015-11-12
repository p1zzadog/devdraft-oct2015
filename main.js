    var Attraction = function(index, cwAdj, cwTime, ccAdj, ccTime){
        this.index  = index;
        this.cwAdj  = cwAdj;
        this.cwTime = cwTime;
        this.ccAdj  = ccAdj;
        this.ccTime = ccTime;
    };

    var park = [];

    park.push((new Attraction(0,5,8,1,4)),
        (new Attraction(1,0,4,2,2)),
        (new Attraction(2,1,2,3,5)),
        (new Attraction(3,2,5,4,1)),
        (new Attraction(4,3,1,5,3)),
        (new Attraction(5,4,3,0,8)));

    console.log('park', park);
