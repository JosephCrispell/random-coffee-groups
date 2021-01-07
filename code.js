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
    if(document.getElementsByClassName("pergroup")[0].value){

        // Get the number of names per group
        namespergroup = parseInt(document.getElementsByClassName("pergroup")[0].value);

        // Calculate the number of groups
        numgroups = Math.ceil(allnameslen / namespergroup);

    // Otherwise check if size of each group was provided
    } else if(document.getElementsByClassName("numgroups")[0].value){

        // Get the number of groups
        numgroups = parseInt(document.getElementsByClassName("numgroups")[0].value);
        
        // Calculate the number of individuals per group
        namespergroup = allnameslen / numgroups;
        
    // Otherwise prompt user to provide value
	} else {
        console.log("Please provide either a number of groups or the size of each group.");
        return;
    }

    // Get the groups element
    var groupsElement = document.getElementsByClassName("groups")[0];

    // Empty the groups element    
	groupsElement.innerHTML = "";

    // Create table header - a column for each group
	for (i = 0; i < numgroups; i++) {

        // Create an append content to the groups element
        groupsElement.innerHTML += '<div class="group" id="group' + (i+1) + '"><h2>Group ' + (i+1) + '</h2></div>';
	}

    // Randomly select students for each group
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
    
    // Prevent the default action
    e.preventDefault();

    // Toggle the button
    var on = document.getElementsByClassName("wrap")[0].classList.toggle("alt")
        
    // Insert the default value
    if(on){
        document.getElementsByClassName("numgroups")[0].value = "4";
        document.getElementsByClassName("pergroup")[0].value = "";
    } else {
        document.getElementsByClassName("numgroups")[0].value = "";
        document.getElementsByClassName("pergroup")[0].value = "2";
    }
});