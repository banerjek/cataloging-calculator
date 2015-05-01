var fileContent='';
var theLocation='';

function readFileViaApplet(n) {
 document.f1.t1.value='Reading in progress...';
 document.ReadURL.readFile(theLocation);
 setTimeout("showFileContent()",100);
}

function showFileContent() {
 if (document.ReadURL.finished==0) {
  setTimeout("showFileContent()",100);
  return;
 }
 fileContent=document.ReadURL.fileContent;
 document.form1.textarea1.value=fileContent;
}
