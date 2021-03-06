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
        },
        currentWorkoutNumber: function(){
            return _.max(Lifting.settings.setList, function(set){return set.workout;}).workout;
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

    Lifting.FinishCurrentWorkout = function(muscleGroup){
        // Needs to take all the sets for the current muscle group where workout = -1, add a date, and increment the workout number
        // but...
        // we also need to keep the current workout=-1 sets for the next workout (pre-filled)
        // So we don't really need to convert anything, we just need to add new workouts to the incremented counter... ahhhhh yes.

        

        var currentSets = _.filter(Lifting.settings.setList, function(set){ return (set.workout === -1 && set.muscleGroup === muscleGroup)});
        var workout = Lifting.settings.currentWorkoutNumber() + 1;
        
        $.each(currentSets, function(key, val) {
          //$("#" + i).append(document.createTextNode(" - " + val));
          //if(val.muscleGroup == muscleGroup) returnList.push(val.liftName);

          var newSet = _.clone(val);
          newSet.workout = workout;

          // Is this going to work?!?!
          Lifting.settings.setList.push(newSet);

          // alert(key + " " + val.liftName);
        });

        return currentSets.length + " sets added! GET SWOLE!";

    };


    Lifting.AddSetToMuscleGroup = function(muscleGroup, liftName){

        var maxSet = _.max(_.filter(Lifting.settings.setList, function(set){ return (set.muscleGroup === muscleGroup && set.liftName === liftName)}) , function(set){ return set.setNumber; });
        var newSetNumber = 0;

        if ($.isNumeric(maxSet.setNumber)) newSetNumber = maxSet.setNumber + 1;

        Lifting.settings.setList.push({workout: -1, muscleGroup: muscleGroup, liftName: liftName, setNumber: newSetNumber , reps: 5, weight: 100});
        
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

        var deleteButton = $('<a href="#" data-role="button" data-theme="r" data-inline="true">DELETE</a>');
        deleteButton.on( "click", function(event, ui) { Lifting.RemoveSetFromList(set, newRow)});

        newRow.append('<th>SET ' + set.setNumber + '</th>');
        newRow.append($('<td></td>').append(repInput));
        newRow.append('<td>x</td>'); // Temporary
        newRow.append($('<td></td>').append(weightInput));
        newRow.append('<td>lbs</td>'); // Temporary
        newRow.append($('<td></td>').append(checkInput));
        newRow.append($('<td></td>').append(deleteButton));

        uList.append(newRow);

        uList.trigger('create');
    };

    Lifting.RemoveSetFromList = function(set, newRow){
        Lifting.settings.setList.splice(_.indexOf(Lifting.settings.setList, set), 1);
        alert('removed!');
        newRow.remove();
    };

    Lifting.CreateLiftListAccordion = function(muscleGroup){
        var counter = 0;
        var l = _.groupBy(_.filter(Lifting.settings.setList, function(set){ return set.workout === -1 && set.muscleGroup === muscleGroup}) , function(set){ return set.liftName; });

        _.each(_.keys(l), function(key){
            var node = $('<div data-role="collapsible" ><h3>' + key + '</h3></div>');

            var uList = $('<table class="lifts-accordion-expanded"></table>');

            _.each(l[key],function(set){

                Lifting.AddSetRowToList(uList, set);

            });

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

    Lifting.CreateLiftTypeDropDown = function(dropList, muscleGroup){

        var l = _.groupBy(_.filter(Lifting.settings.setList, function(set){ return set.muscleGroup === muscleGroup}) , function(set){ return set.liftName; });

        dropList.html('');

        _.each(_.keys(l), function(key){
           
                var newNode = $('<option value="' + key + '">' + key + '</option>');
                dropList.append(newNode);

        });

        dropList.selectmenu('refresh');

    };

    Lifting.CreateNewLiftType = function(muscleGroup, liftName, numberOfSets){
        for(var i = 0; i < numberOfSets; i++){
            Lifting.AddSetToMuscleGroup(muscleGroup, liftName.toUpperCase());
        };
    };

    Lifting.SetMuscleGroup = function(muscleGroup){
    	Lifting.settings.muscleGroup = muscleGroup;
    };


    $(document).on('pagebeforeshow', '#muscle-group-overview', function(event, ui) {
        //console.log('test');
        $('#muscle-group-overview .main-page-heading').html(Lifting.settings.muscleGroup);
    });

    $(document).on('pagecreate', '#add-workout-muscle-group-lifts', function(event, ui) {

        $('a.finish-button').off('click').on( "click", function(event, ui) { 
            alert(Lifting.FinishCurrentWorkout(Lifting.settings.muscleGroup));
            //console.log('WTF');
        });



        // Swipe to delete
        $('table.lifts-accordion-expanded tr').off('click').on( "click", function(event, ui) { 
            // Show delete button
            //alert('TEST');
            $('table.lifts-accordion-expanded tr').append('<button class="delete-button">DELETE</button>');
            //alert(Lifting.FinishCurrentWorkout(Lifting.settings.muscleGroup));
            //console.log('WTF');
        });

        // Swipe to delete
        $('table.lifts-accordion-expanded tr').off('click').on( "click", function(event, ui) { 
            // Remove delete button
            $('table.lifts-accordion-expanded tr').find('.delete-button').remove();
            //alert(Lifting.FinishCurrentWorkout(Lifting.settings.muscleGroup));
            //console.log('WTF');
        });



    });

    $(document).on('pagebeforeshow', '#add-workout-muscle-group-lifts', function(event, ui) {
        $('#add-workout-muscle-group-lifts .main-page-heading').html(Lifting.settings.muscleGroup);
        //$("#add-workout-muscle-group-lifts-list").html('');
        $("div.collapsible-lifts-list").html('');

        Lifting.CreateLiftListAccordion(Lifting.settings.muscleGroup);

    });

    // Setup all events on add-single-lift page
    $(document).on('pagecreate', '#add-single-lift', function(event, ui){
        $('.createNewLiftButton', this).click(function(){
            // Call CreateNewLiftType by passing the muscleGroup, liftName, and numberOfSets
            var newLiftName = $('input[name="newLiftName"]').val();
            var numberOfSets = $('input[name="numberOfSets"]').val();

            if(newLiftName.length === 0)
            newLiftName = $('select[name="lift-types-drop-list"] option:selected').val();

            Lifting.CreateNewLiftType(Lifting.settings.muscleGroup, newLiftName, numberOfSets);

            $.mobile.changePage("#add-workout-muscle-group-lifts");

        });
    });

    $(document).on('pagebeforeshow', '#add-single-lift', function(event, ui) {
        $('#add-single-lift .main-page-heading').html(Lifting.settings.muscleGroup);

        newLiftName = $('input[name="newLiftName"]').val();
        numberOfSets = $('input[name="numberOfSets"]').val('4');

        Lifting.CreateLiftTypeDropDown($('select[name="lift-types-drop-list"]'), Lifting.settings.muscleGroup);

    });


}( window.Lifting = window.Lifting || {}, jQuery ));

