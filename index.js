////////////
//  Stackoverflow stuff
////////////



//  initialize array of n-length
//createArray();     // [] or new Array()
//
//createArray(2);    // new Array(2)
//
//createArray(3, 2); // [new Array(2),
//                   //  new Array(2),
//                   //  new Array(2)]
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}



/////////////////////////////////////////////////////////
// Getting the data from a public accessible-editable spreadsheet

 // ID of the Google Spreadsheet
 var spreadsheetID = "1exQMDR1ERa_UAqMw3nQXnqSC2DHjWOy7-3MMtMHge18";
 
 // Make sure it is public or set to Anyone with link can view 
 var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
 
 $.getJSON(url, function(data) {
   
   
  var entry = data.feed.entry;
 
   var row=0,col=0;
 
    // todo - get array dimensions (generic)
    
    
    // todo - initialize array
    var dataFromSpreadSheet_TODO_MAKE_GENERIC = createArray(4, 4);
   
//      ['Months', 'Electricity', 'Water', 'Gas'],    // add header
   
    var headerRowArray = new Array(4);
    headerRowArray[0] = 'Month';
    headerRowArray[1] = 'Electricity';
    headerRowArray[2] = 'Water';
    headerRowArray[3] = 'Gas';
    dataFromSpreadSheet_TODO_MAKE_GENERIC[col++] = headerRowArray
    
    
  $(entry).each(function(){
    
    
    
    // todo - pull data from each row entry and insert it into multi-d array
        // Column names are Month, Electricity, Water, and Gas
    
    // todo - construct one row at a time
    var currentRowArray = new Array(4);
    currentRowArray[0] = this.gsx$month.$t;
    currentRowArray[1] = parseFloat(this.gsx$electricity.$t);
    currentRowArray[2] = parseFloat(this.gsx$water.$t);
    currentRowArray[3] = parseFloat(this.gsx$gas.$t);
    dataFromSpreadSheet_TODO_MAKE_GENERIC[col++] = currentRowArray;
//    
//    $('.results').append( '<h4>'+this.gsx$month.$t+'</h4>' +
//                          '<p>'+this.gsx$electricity.$t+'</p>' +
//                          '<p>'+this.gsx$water.$t+'</p>'+
//                          '<p>'+this.gsx$gas.$t+'</p>');
  });
 
   
//   $('.results').append('<h4>'+JSON.stringify(data)+'</h4>');
 
   console.log(dataFromSpreadSheet_TODO_MAKE_GENERIC);
   
   
   
//        var data = google.visualization.arrayToDataTable([
//          ['Months', 'Electricity', 'Water', 'Gas'],
//          ['January_TODO', 100, 50, 50],
//          ['February', 117.21, 72.58, 44.72],
//          ['March', 118.16, 58.31, 28.87],
//        ]);
   
   ////////////
// Google Visualization Example from online
////////////
  google.charts.load('current', {
    'packages': ['bar']
  });
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(dataFromSpreadSheet_TODO_MAKE_GENERIC);
//      var data = google.visualization.arrayToDataTable([
//      ['Months', 'Electricity', 'Water', 'Gas'],
//      ['January_TODO', 100, 50, 50],
//      ['February', 117.21, 72.58, 44.72],
//      ['March', 118.16, 58.31, 28.87],
//    ]);

    var options = {
      chart: {
        title: 'Utilities [8111 Mosaic Harbor Ave.]',
        subtitle: 'Electricity, Water, & Gas: 2016',
      },
      bars: 'vertical',
      vAxis: {
        format: 'decimal'
      },
      height: 400,
      colors: ['#1b9e77', '#d95f02', '#7570b3']
    };

    var chart = new google.charts.Bar(document.getElementById('chart_div'));

    chart.draw(data, google.charts.Bar.convertOptions(options));


  }

   
   
   
 });
