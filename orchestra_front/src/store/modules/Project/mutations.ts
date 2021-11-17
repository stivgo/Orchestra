import {GET_PROJECT_BY_ID, GET_USER_PROJECTS, CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT,
        GET_SECTION, CREATE_SECTION, UPDATE_SECTION, DELETE_SECTION,
        GET_PAGE, CREATE_PAGE, UPDATE_PAGE, DELETE_PAGE, GET_TEMPLATES,
        GET_USER, GET_ORGANIZATIONS, GET_TEMPLATE_BY_ID    
} from './mutation-types'
import State from './state'

export default {
    [GET_PROJECT_BY_ID] (state: State, project: any) {
        state.project = project;
    },

    [GET_USER_PROJECTS] (state: State, projects: any):void {
        state.projects = projects
    },

    [CREATE_PROJECT] (state: State, project: any):void {
        state.projects.push(project)
    },

    [UPDATE_PROJECT] (state: State, project: any):void {
       const data = state.projects.find(projectValue => projectValue._id === project._id);
       data!.name = project.name;
       data!.description = project.description;
       data!.version = project.version;
    },

    [DELETE_PROJECT] (state: State, idProject: string):void {
        //waiting confirmation
    },

    //Commits for Sections

    [GET_SECTION] (state: State, payload: any):void {
        const project = state.projects.find(projectValue => projectValue._id === payload.idProject);
        let sectionObject = project!.sections.find(sectionValue => sectionValue._id === payload.section._id);
        sectionObject = payload.section;
    },

    [CREATE_SECTION] (state: State, payload: any):void {
        const data = state.projects.find(projectValue => projectValue._id === payload.idProject);
        data!.sections.push(payload.section);
    },

    [UPDATE_SECTION] (state: State, section: any):void {
        const project = state.projects.find(projectValue => projectValue._id === section.idProject);
        const sectionObject = project!.sections.find(sectionValue => sectionValue._id === section.sectionData._id);
        sectionObject!.name = section.sectionData.name;
        sectionObject!.number = section.sectionData.number;
        sectionObject!.startTime = section.sectionData.startTime;
        sectionObject!.endTime = section.sectionData.endTime;
    },

    [DELETE_SECTION] (state: State, payload: any):void {
        const project = state.projects.find(projectValue => projectValue._id === payload.idProject);
        const sectionIndex = project!.sections.findIndex(function(value){
            return value._id === payload.idSection;
        });
        if(sectionIndex !== -1) project!.sections.splice(sectionIndex, 1);
    },


     //Commits for Pages

     [GET_PAGE] (state:State, data:any):void {
        const idProject = data.idProject,
                idSection = data.idSection,
                idPage = data.idPage,
                page = data.pageData;

        const project = state.projects.find(projectValue => projectValue._id === idProject);
        const sectionObject = project!.sections.find(sectionValue => sectionValue._id === idSection);
        let pageObject = sectionObject!.pages.find(pageValue => pageValue._id === idPage);
        pageObject = page;
     },

     [CREATE_PAGE] (state:State, data:any):void {
        const idProject = data.idProject,
                idSection = data.idSection,
                page = data.pageData;
        const project = state.projects.find(projectValue => projectValue._id === idProject);
        const sectionObject = project!.sections.find(sectionValue => sectionValue._id === idSection);
        sectionObject!.pages.push(page);
     },

     [UPDATE_PAGE] (state:State, data:any):void {
        const idProject = data.idProject,
                idSection = data.idSection,
                page = data.page,
                idPage = page._id;
        const project = state.projects.find(projectValue => projectValue._id === idProject);
        const sectionObject = project!.sections.find(sectionValue => sectionValue._id === idSection);
        const pageObject = sectionObject!.pages.find(pageValue => pageValue._id === idPage);

        pageObject!.name = page.name;
        pageObject!.number = page.number;
        pageObject!.startTime = page.startTime;
        pageObject!.endTime = page.endTime;
     },

     [DELETE_PAGE] (state:State, data:any):void {
        const idProject = data.idProject,
                idSection = data.idSection,
                idPage = data.idPage;
        const project = state.projects.find(projectValue => projectValue._id === idProject);
        const sectionObject = project!.sections.find(sectionValue => sectionValue._id === idSection);

        const pageIndex = sectionObject!.pages.findIndex(function(value){
            return value._id === idPage;
        });
        if(pageIndex !== -1) sectionObject!.pages.splice(pageIndex, 1);
     },

    //Commits for Templates
    [GET_TEMPLATES] (state:State, data:any):void {
        state.templates = data;
    },

    //Commits for User
    [GET_USER] (state:State, data:any):void {
        state.user = data;
    },

    //Commits for Organizations
    [GET_ORGANIZATIONS] (state:State, data:any):void {
        state.organizations = data;
    },

    //Commits for Template
    [GET_TEMPLATE_BY_ID] (state:State, data:any):void {
        state.template = data;
    }
}