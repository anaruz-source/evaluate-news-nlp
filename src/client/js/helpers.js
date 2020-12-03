import Chart from "chart.js";

function extractHostPath(url) {

    const regex = /(https|sftp|http|ftp)(:\/\/)([\d\w.]+)(.*)/ // regex to valid protocol, hostanme and path if exists

    const match = regex.exec(url);

    if(!match) throw new TypeError(`url isn't valid at all, check and try again`)

    if (!match[1]) {

        throw new TypeError('protocol isn\'t present, use https|sftp|http|ftp')

    } else if (!match[2]) {

        throw new TypeError('think to add colons and 2 slashes to make a well formatted url')

    } else if (!match[3]) {

        throw new TypeError('hostname isn\'t correct, use a valid one')

    } 

    return {
        protocol: match[1],

        hostname: match[3],

        path: encodeURI(match[4])

    }

}


// this function will reformat data to be used for this application instead of tree of data received from meaningcloud.com
// to output = { polarity_datasets: {}, polarity_array: [], confidence: [], agreement: [], indices: [], patterns: { fill: [], stroke: [] } }

function flattenData(data) {

    let score_tags = { "N+": -100, "N": -50, "NEU": 0, "P": 50, "P+": 100 }


    if (!data || isEmptyObj(data)) throw new TypeError('Data is empty|null|undefined')

    let output = { polarity_datasets: {}, polarity_array: [], confidence: [], agreement: [], indices: [], patterns: { fill: [], stroke: [] } }

    data.sentence_list.forEach(e => {





        e.segment_list.forEach(s => {

            if (s.segment_list) {

                s.segment_list.forEach(s_level2 => {

                    s_level2.polarity_term_list.forEach(p => {

                        if (!output.polarity_datasets[p.score_tag]) {

                            output.polarity_datasets[p.score_tag] = { data: [], color: '' }
                        }

                        output.polarity_datasets[p.score_tag].data.push({
                            x: p.inip,
                            y: score_tags[p.score_tag]
                        })


                        output.polarity_datasets[p.score_tag].color = scoreTagPattern(score_tags[p.score_tag])
                        output.polarity_array.push(score_tags[p.score_tag])



                        output.confidence.push(p.confidence)

                        output.agreement.push(s.agreement)
                        output.patterns.fill.push(confColorsPattern(p.confidence)[1])
                        output.patterns.stroke.push(confColorsPattern(p.confidence)[0])
                        output.indices.push(p.inip)


                    })



                })
            } else {

                s.polarity_term_list.forEach(p => {

                    if (!output.polarity_datasets[p.score_tag]) {

                        output.polarity_datasets[p.score_tag] = { data: [], color: '' }
                    }

                    output.polarity_datasets[p.score_tag].data.push({
                        x: p.inip,
                        y: score_tags[p.score_tag]
                    })


                    output.polarity_datasets[p.score_tag].color = scoreTagPattern(score_tags[p.score_tag])
                    output.polarity_array.push(score_tags[p.score_tag])


                    output.confidence.push(p.confidence)
                    output.agreement.push(s.agreement)
                    output.patterns.fill.push(confColorsPattern(p.confidence)[1])
                    output.patterns.stroke.push(confColorsPattern(p.confidence)[0])
                    output.indices.push(p.inip)


                })


            }


        })
    });


    return output
}



// JQuery3.5.1 IsEmptyObject
// https://code.jquery.com/jquery-3.5.1.js

function isEmptyObj(obj) {


    for (let prop in obj) {


        return false;
    }

    return true
}

// count array elements

function count(element){

    let counter = 0;

   
this.forEach(function (e) {

    console.log(e)
    if (element == e) counter++
    
})

return counter

}

//

function scoreTagPattern(score) {

    switch (score) {
        case 0:
            return '#6c757d';
            break;
        case 50:
            return '#17a2b8';
            break;

        case 100:
            return '#28a745';
            break;

        case -50:
            return '#ffc107';
            break;

        case -100:
            return '#dc3545';
            break;



        default:
            break;
    }
}


function confColorsPattern(score) {


        if( score <= 50){

            return ['#dc3545', 'rgba(255, 0, 0, .2)'];

        } else if( score <= 70){

            return ['#ffc107', 'rgba(0, 255, 255, 0.2)'];
        } else if (score <= 80){
          
            return ['#28a745', 'rgba(0, 0, 255, 0.2)'];;

        } else {
            return ['#17a2b8', 'rgba(0, 255, 0, 0.2)'];

        }
     
    }


    function hide(elm){

        if (elm.className.indexOf('d-block') > -1) {

            elm.classList.replace('d-block', 'd-none')
        } else {

            elm.classList.add('d-none')
        }

    }

function show(elm) {

    
    if(elm.className.indexOf('d-none') > -1){

        elm.classList.replace('d-none', 'd-block')
    } else {

        elm.classList.add('d-block')
    }
   
}


function removeChildren(elm){

    if(!elm || elm.nodeType !== 1) return // undefined/null or not an element nodetype

    elm.innerHTML = ''  // delete all nodes

 
}

function destroyActiveChartInstances(){

if(Chart.instances){
   
    Chart.helpers.each(Chart.instances, function (i) {
        i.destroy()

    })

    console.log('Cleanup done!')
}



}
export {
    extractHostPath,
    flattenData,
    isEmptyObj,
    count,
    scoreTagPattern,
    confColorsPattern,
    hide,
    show,
    removeChildren,
    destroyActiveChartInstances
}