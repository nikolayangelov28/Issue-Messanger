/** handling the submit event from the form */
document.getElementById('issueInputForm').addEventListener('submit', saveTheIssue);


/** defining and assigning variables from user input */ 
function saveTheIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issuePriority = document.getElementById('issuePriority').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  /** Using Chanse.js library - This funktion return the global unique identifier and assigned it to issueID*/
  var issueId = chance.guid(); 
  var issueStatus = 'Open';

  /** creating a issue object */
  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issuePriority,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  /** inserting the object in local storage */
  if (localStorage.getItem('issues') == null) {
    var issues = [];
    /** pushing the issue object into the array */
    issues.push(issue);
    /** generating JSON object from our object */
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    /** converting the data from the local storage into a JavaScript object */
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  /** reseting the input elements  */
  document.getElementById('issueInputForm').reset();

  /** calling the function fetchIssue(), because a new element is included in the list */
  fetchIssues();

  /** preventing from from submitting */
  e.preventDefault();
}


/** implementing the method to close a issue */
function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

/** iterating over all issues and finding the id of the issue, which will be closed */
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = 'Closed';
    }
  }
 
  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}


/** implementing the method to delete a issue*/
function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  /** iterating over all issues and finding the id of the issue, which will be deleted */
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      /** splicing out the issue from the list*/
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

/** fetching the list of issues */
function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  // iterating over the issue items
  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    // output
    issuesList.innerHTML +=  '<div class="container">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p>' + status + '</></p>'+
                              '<h3>' + desc + '</h3>'+
                              '<p>' + severity + '</p>'+
                              '<p>' + assignedTo + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}

