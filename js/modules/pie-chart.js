/**
 * Добавляет на страницу круговую диаграмму (pie-chart). Зависимости: библиотека d3.js.
 *
 * @module pie-chart.js
 */

define('pie-chart', [d3], function () {

// задаем размеры чата:
var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;
    // задаем размеры цветовых ярлыков:
    var legendRectSize = 18; 
    var legendSpacing = 4; 

    // определяем цветовой диапазон сегментов диаграммы:
    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    // формат в процентах:
    var percentageFormat = d3.format("%");

    // параметры чарта:
    var arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) {
            return d.values;
    });
    
    // задаются параметры чарта при помощи следующих методов::
    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    // импорт данных в чарт:
    d3.json("js/json/staff.json", function(error, json_data) {
    
    // соотношение секторов будет определяться по ключу Position
    var data = d3.nest()
        .key(function(d) {
          return d.Position;
    })
        .rollup(function(d) {
          return d.length;
    }).entries(json_data);

    data.forEach(function(d) {
    d.percentage = d.values / json_data.length;
    });

    console.log(data)
    console.log("data variable", data);
    console.log("pie(data)", pie(data));

    // чарт и эффекты при наведении курсора:
    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .on('mouseover', function() {
            var current = this;  
            var others = svg.selectAll(".arc").filter(function(el) {
                return this != current
      });
      others.selectAll("path").style('opacity', 0.8);
    })
        .on('mouseout', function() {
            var current = this;
            d3.select(this)
        .style('opacity', 1);
        var others = svg.selectAll(".arc").filter(function(el) {
        return this != current
      });
      others.selectAll("path").style('opacity', 1);
    });


    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i) {
            return color(d.data.key);
    });
    // вывод процентов на сегментах чарта:
    g.append("text")
        .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
    })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) {
            console.log("d is", d);
            return percentageFormat(d.data.percentage);
    });
    
    // цветные ярлыки:
    var legend = d3.select("body").append("svg")
        .attr("class", "legend")
        
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) {
    return color(d.key);
    });

    legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .text(function(d) { return d.key; });                   
    });
});