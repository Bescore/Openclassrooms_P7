import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner,faThumbsDown,faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



library.add( faSpinner, faThumbsDown, faThumbsUp)

createApp( App ).component( "font-awesome-icon", FontAwesomeIcon ).use( router ).use( router ).mount( '#app' )

