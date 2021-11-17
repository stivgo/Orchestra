import Collaborator from './model/Collaborator';
import Section from './model/section'

export default interface State {

    projects: [{
        "collaborators": Collaborator[],
        "sections": Section[],
        "_id": string,
        "organizationId": string,
        "name": string,
        "description": string,
        "creationDate": Date,
        "lastModificationDate": Date,
        "version": number,
    }],
    project: any,
    templates: any,
    template: any,
    user: any,
    organizations: any,
}
