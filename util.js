function addRow() {
	var object = document.getElementById("option_object");
	var operation = document.getElementById("option_operation");
	var table = document.getElementById("added_options");

	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);

	row.insertCell(0).innerHTML= '<FONT FACE="Geneva, Arial" SIZE=2>' + object.value + '-' + operation.value + "</FONT>";
	row.insertCell(1).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
}

function deleteRow(obj) {
	var index = obj.parentNode.parentNode.rowIndex;
	var table = document.getElementById("added_options");
	table.deleteRow(index);
}

function removeTable() {
	var tbl = document.getElementById("added_options");
	if(tbl) tbl.parentNode.removeChild(tbl);
}