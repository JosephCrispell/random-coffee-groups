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

function randomlyAssignStudentsToGroups(students, nStudentsPerGroup){

    // Get each of the group divisions
    var groups = document.querySelectorAll('.group');

    // Get each group within the groups array
    for(var i = 0; i < groups.length; i++){

        // Randomly select each group member - up to the number of students per group
        for (j = 0; j < nStudentsPerGroup; j++) {

            // Select random student index from those remaining
            var randomIndex = Math.floor(Math.random() * students.length);
            
            // Check element selected exists - if so add student name into current group
			if(students[randomIndex]){
                groups[i].innerHTML += '<p>' + students[randomIndex] + '</p>';
            }
            
            // Remove chosen student from those remaining
			students.splice(randomIndex, 1);
		}
    }
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
    randomlyAssignStudentsToGroups(allnames, namespergroup);

    // Check if emails were provided
    if(document.getElementById("usingEmails").checked){
        
        // Get the student names - they were wiped when the groups were created
        allnames = getStudentNames();

        // Get the contents of the group element
        var groupsHTML = groupsElement.innerHTML

        // Create a draft email to all students
        window.open("mailto:?bcc=" + allnames.join(";") + "&subject=New random group assignments&body=" + groupsElement.outerHTML);
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