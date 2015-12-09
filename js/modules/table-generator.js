/**
 * Генерирует таблицу из файла JSON. Не имеет зависимостей.
 *
 * @module table-generator.js
 */

 define('table-generator', function () {
    var xmlhttp = new XMLHttpRequest();
    // возможен импорт данных из внешнего ресурса
    var url = "js/json/staff.json";
    
    // делаем запрос, с функцией, которую запрос вызовет сам после получения ответа от сервера:
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    // парсим JSON
    function myFunction(response) {
        var arr = JSON.parse(response);
        var i;
        var out = "<table><tr><th>Position</th><th>Name</th><th>Age</th><th>Sex</th><th>Project</th></tr>";
        for(i = 0; i < arr.length; i++) {
            out += "<tr><td>" + 
            arr[i].Position + 
            "</td><td>" + 
            arr[i].Name + 
            "</td><td>" + 
            arr[i].Age + 
            "</td><td>" + 
            arr[i].Sex + 
            "</td><td>" + 
            arr[i].Project + 
            "</td></tr>";
        }

        out += "</table>";
        document.getElementById("id01").innerHTML = out;
    }
});