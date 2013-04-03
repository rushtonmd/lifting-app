// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(drawChart);

// function drawChart() { 
// 	var data = google.visualization.arrayToDataTable([
// 	  ['Week', 'Weight'],
// 	  ['Week 1',  160],
// 	  ['Week 2',  170],
// 	  ['Week 3',  175],
// 	  ['Week 4',  205]
// 	]);

// 	var options = {
// 		legend: {position: 'none'},
// 	  title: '',
// 	  animation:{
// 	    duration: 1000,
// 	    easing: 'in',
// 	  },
// 	  hAxis: {title: 'Year', titleTextStyle: {color: 'red'}},
// 	  colors:['#80FF09'],
// 	  backgroundColor: 'none'
// 	};

// 	var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
// 	chart.draw(data, options);
// }

// Define the global namespace: Lifting
(function( Lifting, $, undefined ) {

	// Load Defaults
	Lifting.SetDefaults = function() {


		Lifting.settings.setList.push({workout: -1, muscleGroup :"CHEST", liftName : "BENCH (FLAT)", setNumber: 1, reps: 6, weight: 200});
		Lifting.settings.setList.push({workout: -1, muscleGroup :"CHEST", liftName : "BENCH (FLAT)", setNumber: 2, reps: 4, weight: 210});
		Lifting.settings.setList.push({workout: -1, muscleGroup :"CHEST", liftName : "BENCH (FLAT)", setNumber: 3, reps: 5, weight: 220});
		Lifting.settings.setList.push({workout: -1, muscleGroup :"CHEST", liftName : "BENCH (FLAT)", setNumber: 4, reps: 2, weight: 240});



		Lifting.settings.setList.push({workout: -1, muscleGroup :"CHEST", liftName : "BENCH (INCLINE)", setNumber: 1, reps: 6, weight: 200});
		Lifting.settings.setList.push({workout: -1, muscleGroup :"CHEST", liftName : "BENCH (INCLINE)", setNumber: 2, reps: 6, weight: 220});
		Lifting.settings.setList.push({workout: -1, muscleGroup :"CHEST", liftName : "BENCH (INCLINE)", setNumber: 3, reps: 3, weight: 230});
		Lifting.settings.setList.push({workout: -1, muscleGroup :"CHEST", liftName : "DUMBBELL FLYS"});
		Lifting.settings.setList.push({workout: -1, muscleGroup :"CHEST", liftName : "DIPS"});
		Lifting.settings.setList.push({muscleGroup :"LEGS", liftName : "SQUATS"});
		Lifting.settings.setList.push({muscleGroup :"LEGS", liftName : "LUNGES"});
		Lifting.settings.setList.push({muscleGroup :"LEGS", liftName : "LEG PRESS"});
		Lifting.settings.setList.push({muscleGroup :"LEGS", liftName : "CALF RAISES"});

		// set = new Set();
		// set.muscleGroup = "CHEST";
		// set.liftName = "BENCH (INCLINE)";

		// Lifting.settings.setList.push(set);

		// set = new Set();
		// set.muscleGroup = "CHEST";
		// set.liftName = "BENCH (INCLINE)";

		// Lifting.settings.setList.push(set);



		// var set = new Set();
		// set.muscleGroup = "LEGS";
		// set.liftName = "SQUATS";

		// Lifting.settings.setList.push(set);

		// set = new Set();
		// set.muscleGroup = "LEGS";
		// set.liftName = "CALF RAISES";

		// Lifting.settings.setList.push(set);

		// set = new Set();
		// set.muscleGroup = "LEGS";
		// set.liftName = "LEG PRESS";

		// Lifting.settings.setList.push(set);


	}

}( window.Lifting = window.Lifting || {}, jQuery ));


$(function() {
	Lifting.SetDefaults();
});