require.config({
    baseUrl: "js",
    paths: {
    	// libraries
        'jquery': 'libs/jquery', 
        'd3' : 'libs/d3',
        // modules
		'table-generator': 'modules/table-generator',
		'tr-color-switcher' : 'modules/tr-color-switcher',		
		'pie-chart' : 'modules/pie-chart'
	}
});

require([
	'jquery', 
	'table-generator',
	'tr-color-switcher',
	'd3',
	'pie-chart'
	], function ($, tablegenerator, trcolorswitcher, d3, piechart) {
		$('#output').html(tablegenerator + d3 + piechart);
});
