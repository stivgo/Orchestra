import {
    CHANGE_SECTION_SELECTED,
    ADD_ELEMENT_LIST_TEXT,
    DELETE_ELEMENT_LIST_TEXT,
    ADD_ELEMENT_LIST_IMAGES,
    DELETE_ELEMENT_LIST_IMAGES,
    ADD_ELEMENT_LIST_BUTTON,
    DELETE_ELEMENT_LIST_BUTTON,
    ADD_ELEMENT_LIST_QR,
    DELETE_ELEMENT_LIST_QR,
    ADD_ELEMENT_LIST_VIDEO,
    DELETE_ELEMENT_LIST_VIDEO
} from './mutation-types'
import State from './state'
export default{
    [CHANGE_SECTION_SELECTED] (state: State, payload: number):void {
        state.sectionSelected = payload
    },
    [ADD_ELEMENT_LIST_TEXT] (state: State, payload: string):void {
        state.listText.push(payload) 
    },
    [DELETE_ELEMENT_LIST_TEXT] (state: State, payload: number):void {
        console.log("Payload", payload)
        
    },
    [ADD_ELEMENT_LIST_IMAGES] (state: State, payload: string):void {
        console.log("Payload", payload)
        state.listImages.push(payload)
    },
    [DELETE_ELEMENT_LIST_IMAGES] (state: State, payload: number):void {
        console.log("Payload", payload)
        //state.sectionSelected = payload
    },
    [ADD_ELEMENT_LIST_BUTTON] (state: State, payload: string):void {
        console.log("Payload", payload)
        state.listButtons.push(payload)
    },
    [DELETE_ELEMENT_LIST_BUTTON] (state: State, payload: number):void {
        console.log("Payload", payload)
        //state.sectionSelected = payload
    },
    [ADD_ELEMENT_LIST_QR] (state: State, payload: string):void {
        console.log("Payload", payload)
        state.listQR.push(payload) 
    },
    [DELETE_ELEMENT_LIST_QR] (state: State, payload: number):void {
        console.log("Payload", payload)
        //state.sectionSelected = payload
    },
    [ADD_ELEMENT_LIST_VIDEO] (state: State, payload: number):void {
        console.log("Payload", payload)
        //state.sectionSelected = payload
    },
    [DELETE_ELEMENT_LIST_VIDEO] (state: State, payload: number):void {
        console.log("Payload", payload)
        //state.sectionSelected = payload
    }
}
