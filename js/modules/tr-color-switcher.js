/**
 * Добавляет подсветку для строк таблицы. Зависимости: библиотека jQuery.
 *
 * @module tr-color-switcher.js
 */

 define('tr-color-switcher', ['jquery'], function () {
	$('div').on('mouseover', 'tr', function(){
	    $( this ).addClass( "yellow-row" );
	});

	$('div').on('mouseout', 'tr', function(){
	    $( this ).removeClass( "yellow-row" );
	});

	$('div').on('click', 'tr', function(){
	    $( this ).toggleClass( "red-row" );
	});
});