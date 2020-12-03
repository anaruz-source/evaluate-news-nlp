//https://www.valentinog.com/blog/jes

import { extractHostPath } from '../src/client/js/helpers.js'


import flattenData  from '../src/client/js/helpers.js'

const fetch = require('node-fetch')


describe('testing Fomatting function functionality', () => {

    test('This function receives data from meaningcloud.com, reformat them in a suited way via flattenData function for later on use', async () => {

        await fetch('http://localhost:3030/sentiment-analysis', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: { hostname: 'www.healthline.com', path: '/nutrition/ketogenic-diet-101' }, lang: 'auto', model: 'general', isVerbose: true })
        }).then(res => res.json()
        ).then(function (res) {

            let data = flattenData((JSON.parse(res)))

            expect(data.agreement).toBeDefined()
            expect(data.agreement).not.toBeNull()
            expect(data.confidence).tobeDefined()
            expect(data.confidence).not.toBeNull()
            expect(data.indices).toBeDefined()
            expect(data.indices).not.toBeNull()
            expect(data.patterns.fill).tobeDefined()
            expect(data.patterns.fill).not.toBeNull()
            expect(data.patterns.stroke).tobeDefined()
            expect(data.patterns.stroke).not.toBeNull()
            expect(data.polarity_array).toBeDefined()
            expect(data.polarity_array).not.toBeNull()
            expect(data.polarity_datasets).tobeDefined()
            expect(data.polarity_datasets).not.toBeNull()



        }).catch(function (error) {

           
        })




    })

})

//https://www.valentinog.com/blog/jes



describe('Filter function', () => {

    test('This function receive an URL and check its wellformedness', () => {

        expect(extractHostPath('https://hostname.com/path/file')).toEqual({ 'protocol': 'https', 'hostname': 'hostname.com', 'path': '/path/file' })

    })

})


