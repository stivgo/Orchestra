
import { ObjectId } from "mongoose";
import { RequiredAttributes } from "../../utils/RequiredAttributes";
import { Validator } from "../../utils/Validator";
import { Project, ProjectDataType } from "./Project";

export type TemplateDataType = {
    _id?: ObjectId
    name: string
    creator: string
    description: string
    creationDate: Date
    baseProject: ProjectDataType
    
}

export class Template{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static COLLECTION: string = 'templates'
    public static REQUIRED_ATTRIBUTES: RequiredAttributes = {
        strings: ['name', 'creator', 'description'],
        dates: ['creationDate'],
        optionals: ['_id'],
        otherTypes: ['baseProject']
    }
    
    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    public _id?: ObjectId
    public name!: string
    public creator!: string
    public description!: string
    public creationDate!: Date
    public baseProject!: Project
    
    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(data: TemplateDataType){
        Object.assign(this, data)
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    validate(){
        Validator.validateInstanceOfClass(this, Template, false)
    }

}