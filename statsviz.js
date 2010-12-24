/*
    statsviz.js — plotting of data gathered through logformat API
    Copyright (C) 2010  erlehmann

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

document.addEventListener('DOMContentLoaded', function (){
    var statUrls = [
        'http://2pktfkt.de/irc/nodrama.de/stats.json'//,
        /*'http://2pktfkt.de/irc/twitter.de/stats.json'*/
    ];

    i = statUrls.length;
    while (i--) {
        var req = new XMLHttpRequest();
        req.open('GET', statUrls[i], true);
        req.onreadystatechange = function(e) {
            if (req.readyState == 4) {  
                if(req.status == 200) {
                    var data = JSON.parse(req.responseText);

                    var dates = new Array();
                    var dialog = new Array();
                    var nonDialog = new Array();

                    for (j in data) {
                        dates.push(data[j]['date']);
                        dialog.push(data[j]['dialog']);
                        nonDialog.push(data[j]['non-dialog']);
                        
                    }

                    var linegraph = new Grafico.LineGraph($('graph'), {
                            a: dialog.slice(0, 60),
                            b: nonDialog.slice(0, 60)
                        }, {
                            datalabels: dates
                        }
                    );
                } else {
                    console.log('Could not reach logformat API.');
                }
            }
        };
        req.send(null);

    }

}, false);
