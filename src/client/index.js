import { extractHostPath, hide, show, removeChildren} from './js/helpers'
import {updateUI}  from './js/ui-handler.js'
import { handleSubmit } from './js/form-handler'
import {animate, addClass} from './js/animation.js'

import './styles/normalize.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'


import logo from './images/nlp.svg'
import img from './images/gui-charts.jpg'
import spinner from './images/loading-spinner.gif'



let anims = document.getElementsByClassName('anim-me'),

idx = 0

hide(document.getElementById('error'))

for(; idx < anims.length; ) {

   
    if( idx % 2 == 0){ //alternating between odd and even number for index, used to alternate anim classNames usage

        animate(anims[idx],'fadein-direction-left')

    }else {

        animate(anims[idx], 'fadein-direction-right')
    }
   
    idx++
    
}

document.addEventListener('scroll', function(e){

   let idx = 0,

   anims = document.getElementsByClassName('anim-me')

  
  
   for (; idx < anims.length;) {


        if (anims[idx].className.indexOf('fadein') > -1) { //not already animated onloading(not having animation className)

            idx++

        } else {

            if (idx % 2 == 0) {

                addClass.call(anims[idx], 'fadein-direction-right')

            } else {

                addClass.call(anims[idx], 'fadein-direction-left')

            }
        }

        idx++
    }

})

export {
    extractHostPath,
    handleSubmit,
    updateUI,
    hide,
    show,
    removeChildren
}
