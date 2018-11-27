/**
 * Created by ptrbdr on 27.11.18.
 */


d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQPsu0TBxNPtFHoXrTrPUBX05JeBWOnu_DQ6eOpSOdBc41oYwAbDSLW8dRk1vuvEtNstlNgG-J9CECL/pub?gid=0&single=true&output=csv')
    .then(function (data, error) {

        data.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));


        var marker = L.circleMarker([0, 0], {
            color: 'red',
            fill: 'green',
            fillOpacity: 1,
            fillColor: 'red',
            radius: 20
        })
            .addTo(map);

        var table = d3.select('div#table').append('table');
        var thead = table.append('thead');
        var	tbody = table.append('tbody');


    function tabulate(data, columns) {

        // append the header row
        thead.append('tr')
            .selectAll('th')
            .data(columns).enter()
            .append('th')
            .text(function (column) { return column; });

        // create a row for each object in the data
        var rows = tbody.selectAll('tr')
            .data(data)
            .enter()
            .append('tr')
            .attr('class', 'unclicked');

        // create a cell in each row for each column
        var cells = rows.selectAll('td')
            .data(function (row) {
                return columns.map(function (column) {
                    return {column: column, value: row[column]};
                });
            })
            .enter()
            .append('td')
            .text(function (d) { return d.value.replace('Україна, Тернопіль, вулиця', '') });

        return table;
    }

    // render the table(s)
    tabulate(data, ['street_name_geocode', 'id']); // 2 column table

        d3.selectAll('tr').on('click', function (d) {

            // map.setZoom(16);

            map.setView([d.Latitude, d.Longitude], 18);

            // map.panTo([d.Latitude, d.Longitude]);
            marker.setLatLng([d.Latitude, d.Longitude]);

            d3.select(this).attr('class', 'clicked');


        })


});