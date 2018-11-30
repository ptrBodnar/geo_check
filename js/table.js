
new Vue({
    el: '#app',
    data: { numbers: [] },

    mounted() {
        // this.randomize()
        // setInterval(this.randomize, 1000)
        // console.log(this.numbers);

        const vue = this;

        d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vQPsu0TBxNPtFHoXrTrPUBX05JeBWOnu_DQ6eOpSOdBc41oYwAbDSLW8dRk1vuvEtNstlNgG-J9CECL/pub?gid=0&single=true&output=csv')
            .then(function (data, error) {
                vue.numbers = data;
            });

    },


    methods: {
        focus(d) {
            d3.selectAll('.mapSelected').attr('class', 'clicked');

            var coords = [+d.target.parentElement.nextElementSibling.value, +d.target.parentElement.nextElementSibling.nextElementSibling.value];
            map.setView(coords, 18);
            marker.setLatLng(coords);

            d3.select(d.target.parentElement.parentElement).attr('class', 'mapSelected');

            console.log(Vue.plain((this.numbers)));

        },
        returnData(){
            downloadCSV(Vue.plain(this.numbers));
        }
    }
});



function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

function downloadCSV(args) {
    var data, filename, link;
    var csv = convertArrayOfObjectsToCSV({
        data: args
    });
    if (csv == null) return;

    filename =  'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.innerHTML= "Click Here to download";
    document.body.appendChild(link); // Required for FF
    link.style.visibility = 'hidden';
    link.click();
    console.log('fffff')
}