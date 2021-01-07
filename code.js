function getStudentNames(){

    // Get the student names - one per line
    var names = document.getElementById("students").value.split('\n');

    // Remove empty lines
    for(var i = 0; i < names.length; i++){

        // Check if name empty and remove
        if(names[i].replace(/\s/g, '').length == 0){
            names.splice(i, 1);
        }
    }

    return(names);
}

document.getElementById("makeGroups").addEventListener("click", function() {
    
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
    var groups = document.querySelectorAll('.group');
    for(var i = 0; i < groups.length; i++){

        // Randomly select each group member - up to the number of students per group
        for (j = 0; j < namespergroup; j++) {

            // Select random student index from those remaining
            var randname = Math.floor(Math.random() * allnames.length);
            
            // Check element selected exists - if so add student name into current group
			if(allnames[randname]){
                groups[i].innerHTML += '<p>' + allnames[randname] + '</p>';
            }
            
            // Remove chosen student from those remaining
			allnames.splice(randname, 1);
		}
    }
});

// Attach function to switch that toggles between methods to generate groups
document.getElementById("toggleSelection").addEventListener("click", function(){

    // Toggle the button
    var on = document.getElementsByClassName("wrap")[0].classList.toggle("alt");
        
    // Insert the default value
    if(on){
        document.getElementsByClassName("numgroups")[0].value = "4";
        document.getElementsByClassName("pergroup")[0].value = "";
    } else {
        document.getElementsByClassName("numgroups")[0].value = "";
        document.getElementsByClassName("pergroup")[0].value = "2";
    }
});