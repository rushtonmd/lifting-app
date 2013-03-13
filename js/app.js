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

    Lifting.AddSetToMuscleGroup = function(muscleGroup, liftName){

        var maxSet = _.max(_.filter(Lifting.settings.setList, function(set){ return (set.muscleGroup === muscleGroup && set.liftName === liftName)}) , function(set){ return set.setNumber; });

        Lifting.settings.setList.push({workout: 1, muscleGroup: muscleGroup, liftName: liftName, setNumber: maxSet.setNumber + 1 , reps: 5, weight: 100});
        
        return _.last(Lifting.settings.setList);

    };

    Lifting.AddSetRowToList = function(uList, set){

        var newRow = $('<tr></tr>');

        var repInput = $('<input name="rep" name="number" pattern="[0-9]*" value="' + set.reps + '"/>"');

        repInput.on( "change", function(event, ui) { set.reps = this.value; });

        var weightInput = $('<input name="weight" name="number" pattern="[0-9]*" value="' + set.weight + '"/>"');
        
        weightInput.on( "change", function(event, ui) { set.weight = this.value; });

        var checkInput = $('<input type="checkbox" class="large-checkbox" name="checkbox-0" />');
        
        checkInput.on( "change", function(event, ui) { }); 

        newRow.append('<th>SET ' + set.setNumber + '</th>');
        newRow.append($('<td></td>').append(repInput));
        newRow.append($('<td></td>').append(weightInput));
        newRow.append($('<td></td>').append(checkInput));

        uList.append(newRow);

        uList.trigger('create');
    };

    Lifting.CreateLiftListAccordion = function(muscleGroup){
        var counter = 0;
        var l = _.groupBy(_.filter(Lifting.settings.setList, function(set){ return set.muscleGroup === Lifting.settings.muscleGroup}) , function(set){ return set.liftName; });

        _.each(_.keys(l), function(key){
            var node = $('<div data-role="collapsible" ><h3>' + key + '</h3></div>');

            var uList = $('<table class="lifts-accordion-expanded"></table>');

            _.each(l[key],function(set){

                var newRow = $('<tr></tr>');

                var repInput = $('<input name="rep" name="number" pattern="[0-9]*" value="' + set.reps + '"/>"');

                repInput.on( "change", function(event, ui) { set.reps = this.value; });

                var weightInput = $('<input name="weight" name="number" pattern="[0-9]*" value="' + set.weight + '"/>"');
                
                weightInput.on( "change", function(event, ui) { set.weight = this.value; });

                var checkInput = $('<input type="checkbox" class="large-checkbox" name="checkbox-0" />');
                
                checkInput.on( "change", function(event, ui) { }); 

                
                newRow.append('<th>SET ' + set.setNumber + '</th>');
                newRow.append($('<td></td>').append(repInput));
                newRow.append($('<td></td>').append(weightInput));
                newRow.append($('<td></td>').append(checkInput));

                uList.append(newRow);

            });
            
            



            // var uList = $('<ul data-role="listview" data-inset="false"></ul>');
            // _.each(l[key],function(set){
            //     uList.append('<li><div> SET ' + set.setNumber + 
            //         '<a href="#" data-role="button"  data-inline="true" data-mini="true" class="reps-button">' + set.weight + 'lbs</a>' + 
            //         '<a href="#" data-role="button"  data-inline="true" data-mini="true" class="reps-button">' + set.reps + 'x</a>' +
            //         '</div></li>')
            // });
            node.append(uList);

            var addButton = $('<button>ADD NEW SET</button>');

            addButton.on( "click", function(event, ui) { 
                //alert('Add to : ' + key);
                var newSet = Lifting.AddSetToMuscleGroup(muscleGroup, key);
                Lifting.AddSetRowToList(uList, newSet)
            });

            $("div.collapsible-lifts-list").append(node.append(addButton));
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
        console.log('test');
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

