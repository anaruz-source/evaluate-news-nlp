import Chart from 'chart.js'

import {count} from './helpers'


// Draw chart functions
// Stacked line charts with JS => codepen/chartjs
// https://codepen.io/natenorberg/pen/WwqRar
//https://www.chartjs.org/docs/latest/



function drawScatterChart(options, selector, oToCSS) {


    const canvas = document.getElementById(selector)
    const ctx = canvas.getContext("2d")

    let datasets = []

    for (let d in options.datasets) {

        datasets.push({
            label: oToCSS.score_tags[d][0],
            fill: true,
            backgroundColor: options.datasets[d].color,
            pointBackgroundColor: options.datasets[d].color,
            borderColor: options.datasets[d].color,
            pointHighlightStroke: options.datasets[d].color,
            borderCapStyle: 'butt',
            data: options.datasets[d].data
        })
    }

    console.log('ds', datasets)

    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: options.indices,
            datasets: datasets,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                // Can't just `stacked: true` like the docs say
                scales: {
                    yAxes: [{
                        stacked: true,

                        ticks: {
                            beginAtZero: true,
                            steps: 4,
                            stepValue: 50,
                            suggestedMax: Math.max(...options.polarity_array) * 1.5
                        },


                    }],

                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',

                            scaleLabel: {
                                display: true,
                                labelString: 'Pos in txt'
                            }
                    
                    }]
                },
                animation: {
                    duration: 750,
                },

                layout: {
                    padding: {
                        left: '10%',
                        right: '10%',
                        top: 5,
                        bottom: 5
                    }
                }
            }
        }

    });
    // added because height and width of chart increase strangely!

    canvas.setAttribute('style', 'height:100%;width:100%');

};


function drawLineChart(options, selector, label) {


    const canvas = document.getElementById(selector)
    const ctx = canvas.getContext("2d")

   

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: options.indices,
            datasets: [{
                label: label,
                fill: true,
                backgroundColor: options.fill,
                pointBackgroundColor: options.stroke,
                borderColor: options.stroke,
                pointHighlightStroke: options.stroke,
                borderCapStyle: 'butt',
                data: options.data
            }],
            options: {
                legend:{
                    display:false
                },
                responsive: true,
                maintainAspectRatio: false,
                // Can't just `stacked: true` like the docs say
                scales: {
                    yAxes: [{
                        stacked: true,  
                        ticks: {
                            beginAtZero: false,
                            max: 100,
                            min: 50,
                            stepSize: 10
                        },

                        scaleLabel: {
                            display: true,
                            labelString: ''
                        }
                    }],

                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Pos in txt'
                        }}]
                },
                animation: {
                    duration: 750,
                },

                layout: {
                    padding: {
                        left: '10%',
                        right: '10%',
                        top: 5,
                        bottom: 5
                    }
                }
            }
        }

    });
    // added because height and width of chart increase strangely!

    
    canvas.setAttribute('style', 'height:100%;width:100%');
    

};


function drawPieDoughnutChart(options, selector, label, colors) {


    const canvas = document.getElementById(selector)
    const ctx = canvas.getContext("2d")



    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["AGREEMENT", "DISAGREEMENT"],
            datasets: [{
                label: ["AGREEMENT", "DISAGREEMENT"],
                fill: true,
                backgroundColor: ['#28a745', '#dc3545'],
                borderColor: ['#28a745', '#dc3545'],
                borderCapStyle: 'butt',
                hoverBorderColor: ['rgba(0, 255, 0, 0.2)', 'rgba(255, 0, 0, 0.2)'],
                data: [count.call(options.data, 'AGREEMENT'), count.call(options.data, 'DISAGREEMENT')]
            }],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 750,
                },

                layout: {
                    padding: {
                        left: '10%',
                        right: '10%',
                        top: 5,
                        bottom: 5
                    }
                }
            }
        }

    });
   
    // added because height and width of chart increase strangely!

   
    canvas.setAttribute('style', 'height:100%;width:100%');

};


export {drawLineChart, drawScatterChart, drawPieDoughnutChart}