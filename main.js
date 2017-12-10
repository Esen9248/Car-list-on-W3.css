// Need vars
var marked;
var modeled;
var yeared;
var colored;
var edsel;
var OpenModalEdit;
var CloseModalEdit;
var OpenModalShow;
var CloseModalShow;
// Load My Info From Server
$(document).ready(function(){
	$.ajax({
		url: 'https://scalr.api.appbase.io/Cars/machines/_search?q=name:Esen',
		headers: {
        'Authorization':'Basic dlN1MDd5R3NwOjlmOGI4Y2E4LTkxM2UtNGQzMy1iZjFkLTZhMWE0OGM5MGQyYg==',
        'Content-Type':'application/json'
    },
		method: 'GET',
		dataType: 'json',
	}).done(function(data){
		$.each(data.hits.hits, function(){
			$('.tb').append('<tr>' + 
		'<td>' + this._source.mark + '</td>' 
		+ '<td>' + this._source.model + '</td>' + 
		'<td>' + this._source.year + '</td>' + 
		'<td>' + this._source.color + '</td>' + 
		'<td>' + $('.sel').val() + '</td>' + 
		'<td>' + `<button data-id=${this._id} class="minus w3-btn w3-red fa fa-trash"></button>` + '</td>' +
	 	'<td><button type="button" class="edit w3-btn w3-blue fa fa-pencil" onclick="OpenModalEdit()"></button></td>' + 
	 	'<td><button type="button" class="w3-btn w3-teal show" onclick="OpenModalShow()">Смотреть</button></td>' + '</tr>');
		})
	}).fail(function( jqXHR, textStatus, error){
  	alert('Error: ' + jqXHR);
  })
});
// Add Info To Server
$('#plus').click(function(){
	$('.LoadText').css('display','block');
	$.ajax({
    url: 'https://scalr.api.appbase.io/Cars/machines',
    headers: {
        'Authorization':'Basic dlN1MDd5R3NwOjlmOGI4Y2E4LTkxM2UtNGQzMy1iZjFkLTZhMWE0OGM5MGQyYg==',
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: "json",
    data: JSON.stringify({
    name: "Esen",
    mark: $('.marks').val(),
    model: $('.model').val(),
    year: $('.year').val(),
    color: $('.color').val(),
}),
}).done(function(data){
  	$('.LoadText').css('display','none');
  	$('.tb').append('<tr>' + 
		'<td>' + $('.marks').val() + '</td>' 
		+ '<td>' + $('.model').val() + '</td>' + 
		'<td>' + $('.year').val() + '</td>' + 
		'<td>' + $('.color').val() + '</td>' + 
		'<td>' + $('.sel').val() + '</td>' + 
		'<td>' + `<button data-id=${data._id} class="minus w3-btn w3-red fa fa-trash"></button>` + '</td>' +
	 	'<td><button type="button" class="edit w3-btn w3-blue fa fa-pencil" onclick="OpenModalEdit()"></button></td>' + 
	 	'<td><button type="button" class="w3-btn w3-teal show" onclick="OpenModalShow()">Смотреть</button></td>' + '</tr>');
  }).fail(function( jqXHR, textStatus){
  	alert('Error: ' + jqXHR);
  })
})
// Delete Info From Server
$('.tb').on('click', '.minus', (function(){
	$('.LoadText').css('display','block');
	$.ajax({
		url: `https://scalr.api.appbase.io/Cars/machines/${$(this).attr('data-id')}`,
		headers: {
        'Authorization':'Basic dlN1MDd5R3NwOjlmOGI4Y2E4LTkxM2UtNGQzMy1iZjFkLTZhMWE0OGM5MGQyYg==',
        'Content-Type':'application/json',
    },
		type: 'DELETE',
		dataType: 'json',
	}).done(function(response){
		location.reload();
	}).fail(function( jqXHR, textStatus, error){
		alert(error)
	})
})
)
// Edit Info In Local File
OpenModalEdit = function(){
	$('#myModal').css('display', 'block');
}
CloseModalEdit = function(){
	$('#myModal').css('display', 'none');
}
$('.tb').on('click', '.edit', function(){
	marked = $(this).parent().parent().find('td').first();
	modeled = $(marked).next();
	yeared = $(modeled).next();
	colored = $(yeared).next();
	edsel = $(colored).next();
	$('.markedited').val(marked.html());
	$('.modeledited').val(modeled.html());
	$('.yearedited').val(yeared.html());
	$('.coloredited').val(colored.html());
	$('.seledited').val(edsel.html());
	$('#myModal').on('click', '.savebtn', (function(){
	marked.html($('.markedited').val());
	modeled.html($('.modeledited').val());
	yeared.html($('.yearedited').val());
	colored.html($('.coloredited').val());
	edsel.html($('.seledited').val());
})
)
});
// Show Info In Local File
OpenModalShow = function(){
	$('#myModal2').css('display', 'block');
}
CloseModalShow = function(){
	$('#myModal2').css('display', 'none');
	$('.ShowUl').html('');
}
$('.tb').on('click', '.show', function(){
		$('#myModal2').css('display', 'block');
	var VariableShowMark =  $(this).parent().parent().find('td').first();
	var VariableShowModel = $(VariableShowMark).next();
	var VariableShowYear = $(VariableShowModel).next();
	var VariableShowColor = $(VariableShowYear).next();
	var VariableShowTranmission = $(VariableShowColor).next();
	$('.ShowUl').append('<li>' + VariableShowMark.html() + '</li>' + 
	'<li>' + VariableShowModel.html() + '</li>' +
	'<li>' + VariableShowYear.html() + '</li>' +
	'<li>' + VariableShowColor.html() + '</li>' +
	'<li>' + VariableShowTranmission.html() + '</li>');

})