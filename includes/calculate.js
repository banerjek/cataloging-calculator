/******************************************
contents of data files are stored in variables
named after the search value in js files. For
example gac codes are stored in gac.js and
are known as a gac search in this form
********************************************/

var charstrokes;
var userinput;
var search;
var fixarray = [];
var lastuserinput = '';
var lastsearch = '';
var lastarray = [];
var pastinput = [];
var pastresults = {};
var pastarrays = {};
var checksearch = 0;
var checkinput = 0;


function getPage(sURL) {

	document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<p /><b>'

  var wind= window.open(sURL, 'NewWindow', 'width=600,height=600,scrollbars=yes,resizable=yes');
   wind.focus();
   if (wind.opener == null){
         wind.opener = self;
   }
}
function clearvalues() {
	lastuserinput = '';
	lastarray = [];
	lastsearch = '';
	pastinput = [];
	pastresults = {};
	pastarrays = {};
	checksearch = 0;
	checkinput = 0;
	}	

function searchEntry(userinput, entry) {
	userinput = userinput.toLowerCase();
	entry = entry.toLowerCase();
	terms = userinput.split(" ");
	returnfound = 0;

	if (terms[0].length > 2) {
		if (entry.indexOf(terms[0]) > -1) {
			returnfound = 1;

			for (foundit = 1; foundit < terms.length; foundit++) {
				if (entry.indexOf(terms[foundit]) > -1) {
					returnfound = 1;
					} else {
						returnfound = 0;	
						break;
						}
					}

			} else {
			returnfound = 0;	
			}
		}

return returnfound;
}

function getFixed(obj_f) {
	var results;
	fixedval = obj_f.fixfield.value;
	document.getElementById('results').innerHTML = '<div id="fixed">' + fixarray[fixedval] + '</div>';
	return;
}

function makeList(resultarray, header) {
	var found = 0;
	founditems = '<table><tr><th>' + header + '</th></tr>\n';

	for (x=0; x<=resultarray.length-1; x++) {
		found += 1;
		heading = resultarray[x];	

		if (found % 2 == 0) {
			founditems += '<tr><td style="background: #c6d6ee;">' + heading;
			}
			else
			{
			founditems += '<tr><td>'
			+ heading;
			}
		founditems += '</td></tr>';
	}
	founditems += '</table><p />'
	document.getElementById('results').innerHTML = founditems;
}

function getStandard(obj_f, header) {
	var results;
	subdiv = obj_f.standard.value;
	subdiv_var = eval(subdiv); 
	resultarray = subdiv_var.split("\@");
	makeList(resultarray, "Standard");
}
function getRDA() {
	var found = 0;
	var headingarray = [];
	resultarray = rdacontent.split("\@");
	founditems = '<table><tr><th class="left">Abbreviation</th><th class="right">Content Type</th></tr>\n';

	for (x=0; x<=resultarray.length-1; x++) {
		found += 1;
		heading = resultarray[x];	
		headingarray = heading.split("\t");

		if (found % 2 == 0) {
			founditems += '<tr><td style="background: #c6d6ee;"><center>' + headingarray[1] + '</center></td><td style="background: #c6d6ee;">' + headingarray[0];
			}
			else
			{
			founditems += '<tr><td><center>' + headingarray[1] + '</center></td><td>' + headingarray[0];
			}
		founditems += '</td></tr>';
	}
	founditems += '</table><p />'
	document.getElementById('results').innerHTML = founditems;
}

function LCTableRender(table) {
		var found = 1;
		resultarray = lctables.split("\@");
		founditems = '<table><tr><th colspan="3">Table ' + table.replace(/-$/, "") + ' (Next search is LC Class number by default)</th></tr>\n';

		for (x=0; x<=resultarray.length-1; x++) {
			if (searchEntry(table, resultarray[x]) == 1) {
				lastarray[found] = resultarray[x];
				found += 1;
				cellarray = resultarray[x].split("\t");	

				if (found % 2 == 1) {

					founditems += '<tr>'
					+ '<td style="background: #c6d6ee;">' + cellarray[0] + '</td>\n'
					+ '<td style="background: #c6d6ee;">' + cellarray[1] + '</td>\n'
					+ '<td style="background: #c6d6ee;">' + cellarray[2] + '</td>\n'
					+ '</td></tr>\n';
					}
					else
					{
					founditems += '<tr>'
					+ '<td>' + cellarray[0] + '</td>\n'
					+ '<td>' + cellarray[1] + '</td>\n'
					+ '<td>' + cellarray[2] + '</td>\n'
					+ '</td></tr>\n';
					}
				}
			}
		founditems += '</table><p />';

    if (found == 0) {
			founditems = notfound();
			}
		document.getElementById('results').innerHTML = founditems;
		}

function process(obj_f) {

  for (x=0; x<=10; x++) {
	search = obj_f.searchtype[x].value;

	if (obj_f.searchtype[x].checked) {
	  search = obj_f.searchtype[x].value;
	  x = 10;
		if (lastsearch == search) {
			checksearch = 1;
			} else {
			clearvalues();	
			}
		lastsearch = search;
	  }
	}

  userinput = obj_f.userinput.value;
	userinput.trim();
	userinput = userinput.toUpperCase();

	if (search == "lcsh" || search == "aat" || search == "lctables" || search == "lcschedules") {
		if (userinput.length > 2) {
			if (lastuserinput.length > 2) {
				if (checksearch == 1) {
					// return results from previously executed search if possible 
					if (checksearch == 1) {
						if (pastresults[userinput]) {
							document.getElementById('results').innerHTML = pastresults[userinput];
							lastarray = pastarrays[userinput];
							return;
							} 
						}
					// Compare with previous search
					if (pastinput[userinput.length - 1] == userinput.substring(0, userinput.length - 1)) {
						checkinput = 1;
						} else {
						checkinput = 0;
						}
					}
				if (checksearch == 0 || checkinput == 0){
					clearvalues();
				}
			}
		} else {
		document.getElementById('results').innerHTML = '<table><tr><th>Search Results</th></tr><tr><td>Please enter at least three characters</td></tr></table>';
		return;
		}
	}
	lastuserinput = userinput;
	pastinput[userinput.length] = userinput;

/************************
allow forced subject search
**************************/
   
	switch (search) {
	  	case "lc":
			if (userinput.length > 0) {
				body=cutter();
				body = '<p />&nbsp;<p /><table width="200"><tr><th>Cutter Results</th></tr><td><center>&nbsp;<p />' + body + '<p /></center></td></tr></table>';
				document.getElementById('results').innerHTML = body;
				break;	
				}			
	  	default:
			if (userinput.length > 2) {
				body=extract();
				pastresults[userinput] = body;
				document.getElementById('results').innerHTML = body;
				break;
				}
	  	}
return;

}

/**************************
***************************

Calculates LC Cutter values

***************************
**************************/

function cutter()  {

	var skip = 1;
	var tbl2arr = new Array();
	var tbl3arr = new Array();



	firstchar = userinput.substr(0, 1);
	secondchar = userinput.substr(1, 1);
	totallength = userinput.length;
	
	cutterval = firstchar;
				
	/* ****************************************
	Set up arrays determing which tables to use
	****************************************** */

	valuelocator ="ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890";
	tablefinder = "1444144414444414342414444455555555555";
	validnumbers = "23456789Q";

	tbl2arr[1] = "22233333333445566788999999XXXXXXXXXX";
	tbl2arr[2] = "22334445555566666667899999XXXXXXXXXX";
	tbl2arr[3] = "QQQQQQQQQQQQQQQQQQQQUUUUUUXXXXXXXXXX";
	tbl2arr[4] = "33334444555555666777888899XXXXXXXXXX";
	tbl2arr[5] = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
	tbl3arr = "33334444555566677778889999";

	/* ******************************
	Locate correct table
  	 ****************************** */		
	
	for (itable = 0; itable < 36; itable++) {
	
		if (valuelocator.substr(itable, 1) == userinput.substr(0, 1)) {
			whichtable = tablefinder.substr(itable, 1);
			}
		}

	/* **************************************
	Look up second character on correct table
	***************************************** */

	for (iChar = 0; iChar < 36; iChar++) {
		if (valuelocator.substr(iChar, 1) == userinput.substr(1, 1)) {

		/* *****************************************************
		Get Cutter Value -- Accepts only values from 2-9
		***************************************************** */	
			nextdigit = tbl2arr[whichtable].substr(iChar, 1);

			for (x = 0; x < 9; x++) {
				if (nextdigit == validnumbers.substr(x, 1)) {						
					cutterval = cutterval + nextdigit;
					}
				}
					
			}
		}

	/* *****************
	Handle SCH exception
	****************** */

	if (userinput.substr(0, 3) == "SCH") {
		cutterval = "S3";
		}


	/* *****************************
	Process third character onwards
	****************************** */

	startCounter = 2;

	if (userinput.substr(0, 3) == "SCH") {
		startCounter++;
		}

	for (counter = startCounter; counter < totallength; counter++) {
		for (itable = 0; itable < 36; itable++) {
	
			if (valuelocator.substr(itable, 1) == userinput.substr(counter, 1)) {

				/* ******************************
				Get Cutter Value
				****************************** */	
				nextdigit = tbl3arr.substr(itable, 1);
				cutterval = cutterval + nextdigit;
				}
			}
					
		}
					
	
	/* **********************************************************
	Detect special cases. Otherwise, just return calculated value
	************************************************************ */
	if (whichtable == 5) {
		cutterval = "Use A12 - A19 for numerals";
		}

	if (userinput.length > 2) {
		if (cutterval.substr(1, 1) == "U") {
			cutterval = "Q" + cutterval.substr(2);
			}
		}	

	for (x = 1; x < cutterval.length; x++)	{
		if (cutterval.substr(x, 1) == "Q") {
			cutterval = "Use 2 - 29 for Qa - Qt";
			}
		}
	cutterval ='<h1>' + cutterval + '</h1>';
	return cutterval;
}

/***********************************
************************************

Looks for data input by user in
tables and outputs data to result
screen

************************************
***********************************/

function extract() {
var resultarray = new Array();
var cellarray = new Array();
var founditems = '';
var found = 0;
var weblink = '';
var webbase = '';
var holdingsfields = '337 338 842 843 844 845 852 853 854 855 863 864 865 866 867 868 876 877 878';
var regmatch = '\\b' + userinput;
var regmarc = '\\d\\d\\d';

var regexsearch = new RegExp(regmatch, "i");
var regmarcsearch = new RegExp(regmarc, "i");

switch (search) {
	case "gac":
		{
		gac = gac.replace("\n", "<br />");
		gac = gac.replace("  ", "&nbsp;&nbsp;");
		resultarray = gac.split("\@");
		break;
		}
	case "geogcutter":
		{
		resultarray = geogcutter.split("\@");
		break;
		}
	case "lctables":
		{
		if (lastarray.length > 0) {
			resultarray = lastarray;
			lastarray = [];
			} else {
			resultarray = lctables.split("\@");
			}
		founditems += '<table><tr><th colspan="3">Results</th></tr>\n';

		for (x=0; x<=resultarray.length-1; x++) {
			if (searchEntry(userinput, resultarray[x]) == 1) {
				lastarray[found] = resultarray[x];
				found += 1;
				cellarray = resultarray[x].split("\t");	

				if (found < 500) {
					if (found % 2 == 0) {

						founditems += '<tr>'
						+ '<td style="background: #c6d6ee;">' + cellarray[0] + '</td>\n'
						+ '<td style="background: #c6d6ee;">' + cellarray[1] + '</td>\n'
						+ '<td style="background: #c6d6ee;">' + cellarray[2] + '</td>\n'
						+ '</td></tr>\n';

						}
						else
						{
						founditems += '<tr>'
						+ '<td>' + cellarray[0] + '</td>\n'
						+ '<td>' + cellarray[1] + '</td>\n'
						+ '<td>' + cellarray[2] + '</td>\n'
						+ '</td></tr>\n';
						}
					}
				}
			}
		if (found >= 500) {
			founditems += '<tr><td colspan="3"></center><h2>' + found + ' retrievals. Displaying first 500</h2></center></td></tr>';
		}
		founditems += '</table><p />';

    if (found == 0) {
			founditems = notfound();
			}
		pastarrays[userinput] = lastarray;
		return founditems;
		break;
		}
	case "lcschedules":
		{
		if (lastarray.length > 0) {
			resultarray = lastarray;
			lastarray = [];
			} else {
			resultarray = schedules.split("\@");
			}
		founditems += '<table><tr><th colspan="3">Results</th></tr>\n';

		for (x=0; x<=resultarray.length-1; x++) {
			if (searchEntry(userinput, resultarray[x]) == 1) {
				lastarray[found] = resultarray[x];
				found += 1;
				cellarray = resultarray[x].split("\t");	
				if (cellarray[2] == undefined) {
					cellarray[2] = '';
					} else {
					cellarray[2] = '<a class="blue" onclick="LCTableRender(\'\t' + cellarray[2] + '-\')">Table ' + cellarray[2] + '</a>';
					}

				if (found < 500) {
					if (found % 2 == 0) {

						founditems += '<tr>'
						+ '<td style="background: #c6d6ee;">' + cellarray[0] + '</td>\n'
						+ '<td style="background: #c6d6ee;">' + cellarray[1] + '</td>\n'
						+ '<td style="background: #c6d6ee;">' + cellarray[2] + '</td>\n'
						+ '</td></tr>\n';

						}
						else
						{
						founditems += '<tr>'
						+ '<td>' + cellarray[0] + '</td>\n'
						+ '<td>' + cellarray[1] + '</td>\n'
						+ '<td>' + cellarray[2] + '</td>\n'
						+ '</td></tr>\n';
						}
					}
				}
			}
		if (found >= 500) {
			founditems += '<tr><td colspan="3"></center><h2>' + found + ' retrievals. Displaying first 500</h2></center></td></tr>';
		}
		founditems += '</table><p />';

    if (found == 0) {
			founditems = notfound();
			}
		pastarrays[userinput] = lastarray;
		return founditems;
		break;
		}
	case "aacr":
		{
		resultarray = aacr.split("\@");
		break;
		}
	case "aat":
		{
		if (lastarray.length > 0) {
			resultarray = lastarray;
			lastarray = [];
			} else {
			resultarray = aat.split("\@");
			}
		founditems += '<table><tr><th>Results</th></tr>\n';

		for (x=0; x<=resultarray.length-1; x++) {
			if (searchEntry(userinput, resultarray[x]) == 1) {
				lastarray[found] = resultarray[x];
				found += 1;
				cellarray = resultarray[x].split("\t");	
				webbase = 'http://www.getty.edu/vow/AATFullDisplay?find=&logic=AND&note=&subjectid=';

				if (found < 500) {
					if (found % 2 == 0) {

						founditems += '<tr><td style="background: #c6d6ee;">'
						+'<a href="javascript:getPage(\'' + webbase
						+ cellarray[0]
						+ '\');">'
						+ cellarray[1]
						+ '</a></td></tr>'
						+ '\n';

						}
						else
						{
						founditems += '<tr><td>'
						+'<a href="javascript:getPage(\'' + webbase
						+ cellarray[0]
						+ '\');">'
						+ cellarray[1]
						+ '</td></tr>'
						+ '\n';
						}
					}
				}
			}
		if (found >= 500) {
			founditems += '<tr><td></center><h2>' + found + ' retrievals. Displaying first 500</h2></center></td></tr>';
		}
		founditems += '</table><p />'
		+'<center class="red"><b>Click on any entry above for '
		+'detailed information and proper usage from the Getty Art & Architecture Thesaurus®</b>';

    if (found == 0) {
			founditems = notfound();
			}
		pastarrays[userinput] = lastarray;
		return founditems;
		break;
		}
	case "lang":
		{
		resultarray = lang.split("\@");
		break;
		}
	case "country":
		{
		resultarray = country.split("\@");
		break;
		}
	case "lcsh":
		{
		if (userinput.length == 3) {
						if (regmarcsearch.exec(userinput)) {
										found = 0;
										break;
						}
		}
		if (lastarray.length > 0) {
			resultarray = lastarray;
			lastarray = [];
			} else {
			resultarray = lcsh.split("\@");
			}
		founditems += '<table><tr><th>Results</th></tr>\n';

		for (x=0; x<=resultarray.length-1; x++) {
			if (searchEntry(userinput, resultarray[x]) == 1) {
				lastarray[found] = resultarray[x];
				found += 1;
				cellarray = resultarray[x].split("\t");	
				webbase = 'http://id.loc.gov/authorities/subjects/';

				if (found < 500) {
					if (found % 2 == 0) {

						founditems += '<tr><td style="background: #c6d6ee;">'
						+'<a href="javascript:getPage(\'' + webbase
						+ cellarray[1]
						+ '.html\');">'
						+ cellarray[0]
						+ '</a></td></tr>'
						+ '\n';

						}
					else
						{
						founditems += '<tr><td>'
						+'<a href="javascript:getPage(\'' + webbase
						+ cellarray[1]
						+ '.html\');">'
						+ cellarray[0]
						+ '</td></tr>'
						+ '\n';
						}
					}
				}
			}
		if (found >= 500) {
			founditems += '<tr><td></center><h2>' + found + ' retrievals. Displaying first 500</h2></center></td></tr>';
		}
		founditems += '</table><p />'
		+'<center class="red"><b>Click on any field above for '
		+'detailed information from Library of Congress</b>';

    if (found == 0) {
			founditems = notfound();
			}
		pastarrays[userinput] = lastarray;
		return founditems;
		break;
		}
	case "mesh":
		{
		resultarray = mesh.split("\@");
		founditems += '<table><tr><th>Results</th></tr>\n';

		for (x=0; x<=resultarray.length-1; x++) {
			if (searchEntry(userinput, resultarray[x]) == 1) {
				found += 1;
				heading = resultarray[x];	

				webbase = 'http://www.nlm.nih.gov/cgi/mesh/2015/MB_cgi?term=';

				id_url = '<a href="javascript:getPage(\'' + webbase
					+ heading
					+ '\');">'
					+ heading
					+ '</a></td></tr>'
					+ '\n';

				if (found < 500) {
					if (found % 2 == 0) {
						founditems += '<tr><td style="background: #c6d6ee;">' + id_url;
						}
						else
						{
						founditems += '<tr><td>'
						+ id_url;
						}
					}
				}
			}
		if (found >= 500) {
			founditems += '<tr><td></center><h2>' + found + ' retrievals. Displaying first 500</h2></center></td></tr>';
		}
		founditems += '</table><p />'
		+'<center class="red"><b>Click on any field above for '
		+'detailed information from NLM</b>';

    if (found == 0) {
			founditems = notfound();
			}
			
		return founditems;
		break;
		}
	case "marc":
		{
		resultarray = marc.split("\@");
		founditems += '<table><tr><th>Results</th></tr>\n';

		for (x=0; x<=resultarray.length-1; x++) {
			if (searchEntry(userinput, resultarray[x]) == 1) {
				found += 1;
				cellarray = resultarray[x].split("\t");	


				if (found % 2 == 0) {
					if (holdingsfields.search(cellarray[0].substr(0, 3)) > -1) {
						webbase = 'http://www.oclc.org/holdingsformat/en/';
						} else {
						webbase = 'http://www.oclc.org/bibformats/en/';
						}
					founditems += '<tr><td style="background: #c6d6ee;">'
					+'<a href="javascript:getPage(\'' + webbase
					+ cellarray[0].substr(0, 1)
					+ 'xx/'
					+ cellarray[0]
					+ '.html\');">'
					+ cellarray[0]
					+ '&nbsp;&nbsp;'
					+ cellarray[1]
					+ '</a></td></tr>'
					+ '\n';

					}
					else
					{
					founditems += '<tr><td>'
					+'<a href="javascript:getPage(\'' + webbase
					+ cellarray[0].substr(0, 1)
					+ 'xx/'
					+ cellarray[0]
					+ '.html\');">'
					+ cellarray[0]
					+ '&nbsp;&nbsp;'
					+ cellarray[1]
					+ '</td></tr>'
					+ '\n';
					}
				}
			}
		founditems += '</table><p />'
		+'<center class="red"><b>Click on any field above for '
		+'detailed information from OCLC</b>'
		+'<br />OCLC provided data &copy OCLC</center>';

		if (regmarcsearch.exec(userinput)) {
			if (holdingsfields.search(userinput) > -1) {
				webbase = 'http://www.oclc.org/holdingsformat/en/';
				} else {
				webbase = 'http://www.oclc.org/bibformats/en/';
				}
			weblink=webbase + userinput.substr(0, 1) + 'xx/' + userinput
			+'.html';

		/***********************************
		 Deal with 880
		/***********************************/
		if (userinput == '880') {
					weblink='http://www.loc.gov/marc/bibliographic/bd880.html'	
					} 

		/************************************
		Looks for numeric OCLC search
		************************************/
			if (userinput == '007') {
				weblink='http://www.oclc.org/bibformats/en/0xx/';
				}

			getPage(weblink);
			founditems='<b>Retrieving information from OCLC...... <p />All OCLC data is provided by and &copy OCLC.  All OCLC information appears in the same window, so this program will not open multiple windows.  <p /> The Cataloging Calculator also supports keyword searches of MARC fields.</b>';
			return founditems;
			}

        	if (found == 0) {
			founditems = notfound();
			}

		/*************************************
		Performs search in OCLC if only one hit
		**************************************/

		if (found==1) {
			found = 0;
			weblink='http://www.oclc.org/bibformats/en/'
			+ cellarray[0].substr(0, 1)
			+ 'xx/'
			+ cellarray[0]
			+ '.html';
			getPage(weblink);
			founditems+='<p /><b>Only one match detected, automatically opening window.....<p />Retrieving information from OCLC...... <p />All OCLC data is provided by and &copy OCLC.  All OCLC information appears in the same window, so this program will not open multiple windows.  </b>';
			return founditems;
			}
			
		return founditems;
		}
	}

  	founditems +='<table><tr><th colspan="2">Results</th></tr>\n';

	for (x=0; x<=resultarray.length-1; x++) {
		if (searchEntry(userinput, resultarray[x]) == 1) {
			found += 1;
			cellarray = resultarray[x].split("\t");	

				if (!cellarray[1]) {
					cellarray[1] = '';
					}

			if (found % 2 == 0) {
				founditems += '<tr><td style="background: #c6d6ee;">'
				+ cellarray[0]
				+ '</td><td style="background: #c6d6ee;">'
				+ cellarray[1]
				+ '</td></tr>'
				+ "\n";
				}
				else
				{
				founditems += '<tr><td>'
				+ cellarray[0]
				+ '</td><td>'
				+ cellarray[1]
				+ '</td></tr>'
				+ "\n";
				}
			}
		}
	founditems += '</table>';

	if (found == 0) {
		founditems = notfound();			
		}
	return founditems;
}


/***********************************
************************************
 
Default no items found message

************************************
************************************/

function notfound() {
	return "<center><h1>No matches were found. Please try again</h1></center>";
}

