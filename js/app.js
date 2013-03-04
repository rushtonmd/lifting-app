// Define the global namespace: Lifting
(function( Lifting, $, undefined ) {

    Lifting.settings = {
        setList: new Array(),
        muscleGroup: "",
        liftList: function(muscleGroup){
            var returnList = [];
            $.each(this.setList, function(key, val) {
              //$("#" + i).append(document.createTextNode(" - " + val));
              if(val.muscleGroup == muscleGroup) returnList.push(val.liftName);
              //alert(key + " " + val.liftName);
            });
            return $.unique(returnList);
        }
    }


    // function Set(){
    // 	this.workout = 0; 
    // 	this.muscleGroup = "";
    // 	this.liftName = "";
    // 	this.setNumber = 0;
    // 	this.reps = 0;
    // 	this.weight = 0;
    // 	this.date = new Date();[["A",40],["B",20],["C",40]]
    // };

    Lifting.CreateLiftListAccordion = function(muscleGroup){
        var counter = 0;
        var l = _.groupBy(_.filter(Lifting.settings.setList, function(set){ return set.muscleGroup === Lifting.settings.muscleGroup}) , function(set){ return set.liftName; });

        _.each(_.keys(l), function(key){
            var node = $('<div data-role="collapsible" ><h3>' + key + '</h3></div>');
            var uList = $('<ul data-role="listview" data-inset="false"></ul>');
            _.each(l[key],function(set){
                uList.append('<li><div> SET ' + set.setNumber + 
                    '<a href="#" data-role="button"  data-inline="true" data-mini="true" class="reps-button">' + set.weight + 'lbs</a>' + 
                    '<a href="#" data-role="button"  data-inline="true" data-mini="true" class="reps-button">' + set.reps + 'x</a>' +
                    '</div></li>')
            });
            node.append(uList);
            $("div.collapsible-lifts-list").append(node);
        });

        $("div.collapsible-lifts-list").trigger('create');


    };

    Lifting.SetMuscleGroup = function(muscleGroup){
    	Lifting.settings.muscleGroup = muscleGroup;
    };

    
	// $('#muscle-group-overview').live('pagebeforeshow', function(event, ui) {
	// 	$('#muscle-group-overview .main-page-heading').html(Lifting.settings.muscleGroup);
	// });

    $(document).on('pagebeforeshow', '#muscle-group-overview', function(event, ui) {
        $('#muscle-group-overview .main-page-heading').html(Lifting.settings.muscleGroup);
    });

    $(document).on('pagebeforeshow', '#add-workout-muscle-group-lifts', function(event, ui) {
        $('#add-workout-muscle-group-lifts .main-page-heading').html(Lifting.settings.muscleGroup);
        //$("#add-workout-muscle-group-lifts-list").html('');
        $("div.collapsible-lifts-list").html('');

        Lifting.CreateLiftListAccordion(Lifting.settings.muscleGroup);

    });

	// $('#add-workout-muscle-group-lifts').live('pagebeforeshow', function(event, ui) {
	// 	$('#add-workout-muscle-group-lifts .main-page-heading').html(Lifting.settings.muscleGroup);
	// 	//$("#add-workout-muscle-group-lifts-list").html('');
 //        $("div.collapsible-lifts-list").html('');

 //        Lifting.CreateLiftListAccordion(Lifting.settings.muscleGroup);

	// });


}( window.Lifting = window.Lifting || {}, jQuery ));
