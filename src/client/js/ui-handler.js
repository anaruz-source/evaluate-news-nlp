import {
    drawLineChart,
    drawScatterChart,
    drawPieDoughnutChart
} from './charts-ploting.js'

import {
    flattenData,
    hide,
    show,
    removeChildren,
    destroyActiveChartInstances
} from './helpers'

import {
    animate,
    getElmRect
} from './animation.js'

function updateUI(data) {

    const outputToCssClass = { //mapping polarities to bootstrap background colors, success, primary, warning, danger
        score_tags: {
            "P+": ["Strong positive", 'bg-success'],
            "P": ["Positive", "bg-info"],
            "NEU": ["Neutral", "bg-primary"],
            "N": ["Negative", "bg-warning"],
            "N+": ["Strong Negative", "bg-danger"],
            "NONE": ["without Sentiment", "bg-primary"]

        },

        agreement: {
            "AGREEMENT": "bg-success",
            "DISAGREEMENT": "bg-danger"

        },

        irony: {
            "NONIRONIC": "bg-success",
            "IRONIC": "bg-danger"
        }
    }

    let summary = document.getElementById('summary'),

        dataSection = document.getElementsByClassName('data')[0],


        errElm = document.getElementById('error')


    hide(errElm)

    show(loader)

    destroyActiveChartInstances() // destroy chart instances if any

    let clonedNode = summary.firstElementChild.cloneNode(true) //make a copy of the 1st child before deleting everything

    removeChildren(summary) // we make sure that there're no elements from previous execution


    for (let e in data) {


        let className,
            textContent

        if (typeof data[e] != 'object') {

            if (e == 'score_tag') {

                className = outputToCssClass.score_tags[data[e]][1],
                    textContent = outputToCssClass.score_tags[data[e]][0] + `(${data[e]})`

            } else if (e == 'confidence') {

                textContent = data[e]

                if (parseInt(data[e]) > 70) {

                    className = "bg-success"
                } else if (parseInt(data[e]) > 50) {
                    className = "bg-warning"

                } else {

                    className = "bg-danger"
                }


            } else if (!outputToCssClass[e]) {

                className = "bg-primary"
                textContent = data[e]

            } else {

                className = outputToCssClass[e][data[e]]
                textContent = data[e]
            }


            let cloned = clonedNode.cloneNode(true)

            show(cloned)


            cloned.firstElementChild.classList.add(className)


            cloned.firstElementChild.textContent = e

            cloned.lastElementChild.textContent = textContent

            summary.appendChild(cloned)


        }


    }

    show(dataSection)

    show(charts)

    let flattend = flattenData(data),

        anims = document.getElementsByClassName('anim-me'),

        dataSectionTop = getElmRect(dataSection)

    window.scroll(0, dataSectionTop.top)


    hide(loader)


    drawScatterChart({
        datasets: flattend.polarity_datasets,
        polarity_array: flattend.polarity_array,
        patterns: flattend.patterns
    }, 'ct-chart-scatter', outputToCssClass)

    drawLineChart({
        data: flattend.confidence,
        indices: flattend.indices,
        fill: flattend.patterns.fill,
        stroke: flattend.patterns.stroke
    }, 'ct-chart-line-conf', 'Confidence evolution along the text (top to bottom)', {
        fill: 'rgba(255, 0, 0, .2)',
        stroke: 'rgba(255, 0, 0, 1)'
    })

    drawPieDoughnutChart({
        data: flattend.agreement
    }, 'ct-chart-line-agr', 'Agreement evolution along the text (top to bottom)')


}


export {
    updateUI
}