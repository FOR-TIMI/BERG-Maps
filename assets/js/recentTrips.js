var tripHistory = document.querySelector(".trip-history");
var trips;
var getIcon=function(mode){
    switch(mode){
        case "Traffic":
            return "berg berg-driving  text-3xl";
            break;
        
        case "Driving":
            return "berg berg-driving  text-3xl";
            break;
        case "Walking":
            return "berg berg-walking text-3xl";
            break;
        case "Cycling":
            return "berg berg-cycling text-3xl";
            break;
            
        }
}

if(localStorage.getItem('tripInfos')==null){
    tripHistory.innerHTML="<h2>There are no searches</h2>";
    tripHistory.style="text-align:center";
}else{
    trips =JSON.parse(localStorage.getItem('tripInfos'))
   
    for(var i = 0;i<trips.length;i++){
    var tableRow = $("<tr>").addClass("column"); 
     var dateTime=trips[i].dateTime;
     dateTime=dateTime.split(" ");
     var date =dateTime[0];
     var time =dateTime[1];
    tableRow.append(
        $("<td>").html("<i class='"+getIcon(trips[i].mode)+"'></li>"),
        $("<td>").text(time),
        $("<td>").text(trips[i].origin),
        $("<td>").text(trips[i].destination),
        $("<td>").text(date)
        )
    
        $(".tableBody").append(tableRow);
    }
}