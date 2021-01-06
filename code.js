function getStudentNames(){

    // Get the student names - one per line
    var names = document.getElementById("students").value.split('\n');

    console.log(names.length);

    // Remove empty lines
    for(var i = 0; i < names.length; i++){

        // Check if name empty and remove
        if(names[i].replace(/\s/g, '').length == 0){
            names.splice(i, 1);
        }
    }

    return(names);
}

$('button').on('click', function(e) {
    
    // Prevent the default event action
    e.preventDefault();
    
    // Get the student names
    var allnames = getStudentNames();
    var allnameslen = allnames.length;

    // Initialise variables to store group dimensions
    var namespergroup = -1;
    var numgroups = -1;

    // Check if a number of groups was provided
    if($('.pergroup').val()){

        // Get the number of names per group
        namespergroup = parseInt($('.pergroup').val());

        // Calculate the number of groups
        numgroups = Math.ceil(allnameslen / namespergroup);

    // Otherwise check if size of each group was provided
    } else if($('.numgroups').val()){

        // Get the number of groups
        numgroups = parseInt($('.numgroups').val());
        
        // Calculate the number of individuals per group
        namespergroup = allnameslen / numgroups;
        
    // Otherwise prompt user to provide value
	} else {
        console.log("Please provide either a number of groups or the size of each group.");
        return;
    }

    console.log("Number of people per group: " + namespergroup);
    console.log("Number of groups: " + numgroups);

    // Empty the groups element    
	$('.groups').empty();

    // Create table header - a column for each group
	for (i = 0; i < numgroups; i++) {
		$('.groups').append('<div class="group" id="group' + (i+1) + '"><h2>Group ' + (i+1) + '</h2></div>');
	}

	$('.group').each(function() {
		for (j = 0; j < namespergroup; j++) {
			var randname = Math.floor(Math.random() * allnames.length);
			if(allnames[randname]){
				$(this).append('<p>' + allnames[randname] + '</p>');
			}
			allnames.splice(randname, 1);
		}
	});
});

// Attach function to switch that toggles between methods to generate groups
$('.toggle-wrap a').on('click', function(e){
	e.preventDefault();
	$('.wrap').toggleClass('alt');
	$('.pergroup-wrap, .numgroups-wrap').find('input').val('');
});