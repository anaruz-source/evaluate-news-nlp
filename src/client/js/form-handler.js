import {
    hide,
    show,
    updateUI
} from "./helpers"

export function handleSubmit(event) {
    event.preventDefault()
    let url,
        urlInput = document.getElementById('url'),
        loader = document.getElementById('loader'),

        charts = document.getElementById('charts'),

        errElm = document.getElementById('error')


    // check what text was put into the form fields
    try {


        url = Client.extractHostPath(urlInput.value)

        urlInput.style.backgroundColor = ''

        urlInput.style.border = '';

        let lang = document.getElementById('lang').value
        let model = document.getElementById('mod').value
        let isVerbose = document.getElementById('verb').value


        show(loader)


        fetch('/sentiment-analysis', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url,
                lang,
                model,
                isVerbose
            })
        }).then(res => res.json()).then(function (res) {


            let result = JSON.parse(res)


            if (result.status.code != 0) {

                throw TypeError(`Err Code: ${result.status.code}|Message: ${result.status.message}`)
            }

            Client.updateUI(result)

        }).catch(function (err) {


            console.log(err)

            errElm.innerHTML = err

            hide(loader)
            show(errElm)


        })


    } catch (error) {

        urlInput.style.backgroundColor = 'rgba(255, 0, 0, 0.8)'
        urlInput.style.border = '1px solid red';
        errElm.innerHTML = error
        show(errElm)


    }


}