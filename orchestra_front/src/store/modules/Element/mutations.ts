import {GET_ELEMENT_BY_ID, GET_ELEMENTS_BY_PAGE,
        CREATE_ELEMENT, UPDATE_ELEMENT, DELETE_ELEMENT,
        SET_STYLES, SET_CUSTOM_COMPONENTS, SET_CUSTOM_COMPONENT,
        SET_TIME_LINE, SET_PAGE, SET_TEMPLATE
} from './mutation-types'
import State from './state'

export default{
    [GET_ELEMENT_BY_ID] (state: State, element: any) {
        state.element = element;
    },

    [GET_ELEMENTS_BY_PAGE] (state: State, elements: any) {
        state.elements = elements;
    },

    [CREATE_ELEMENT] (state: State, element: any) {
        state.elements.push(element);
    },

    [UPDATE_ELEMENT] (state: State, elementData: any) {
        const index = state.elements.findIndex((element) => element._id === elementData._id);
        state.elements[index] = elementData;
    },

    [DELETE_ELEMENT] (state: State, idElement: any) {
        const index = state.elements.findIndex((element) => element._id === idElement._id);
        if(index !== -1) state.elements.splice(index, 1);
    },
    [SET_STYLES] (state: State, styles: any) {
        state.styles = styles.sort();
    },
    [SET_CUSTOM_COMPONENTS] (state: State, customComponents: any) {
        state.customComponents = customComponents;
    },
    [SET_CUSTOM_COMPONENT] (state: State, customComponent: any) {
        state.customComponent = customComponent;
    },
    [SET_TIME_LINE] (state: State, timeLine: any) {
        state.timeLine = timeLine;
    },
    [SET_PAGE] (state: State, page: any) {
        console.log("Info page", page)
        state.page = page;
    },
    [SET_TEMPLATE] (state: State, pageElements: any) {
        console.log("Info pageElements", pageElements)
        state.template = pageElements;
    }
}