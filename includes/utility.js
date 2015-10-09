function getOCLC(sURL) {

document.getElementById('results').innerHTML = document.getElementById('results').innerHTML + '<p /><b>'

  var wind= window.open(sURL, 'NewWindow', 'width=600,height=600,scrollbars=yes,resizable=yes');
   wind.focus();
   if (wind.opener == null){
         wind.opener = self;
   }
}
