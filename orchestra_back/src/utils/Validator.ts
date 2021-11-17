import { RequiredAttributes } from "./RequiredAttributes"
import { Types } from 'mongoose'

export class Validator{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static BOOLEAN: string = 'boolean'
    public static NUMBER: string = 'number'
    public static STRING: string = 'string'
    public static OBJECT: string = 'object'
    public static ID: string = 'ObjectId'
    public static FUNCTION: string = 'function'

    //-----------------------------------------------------------------------
    // Auxiliar methods
    //-----------------------------------------------------------------------

    private static getFieldNameMessage(fieldName?: string, defaultName?: string){
        return (fieldName) ? "field " + fieldName : ((defaultName) ? defaultName : "field")
    }

    private static mergeAttributesArray(array1?: string[], array2?: string[]){
        let defArray1: string[] = []
        let defArray2: string[] = []
        if ( array1 ){
            defArray1 = array1
        }
        if ( array2 ){
            defArray2 = array2
        }
        return [ ...defArray1, ...defArray2 ]
    }

    //-----------------------------------------------------------------------
    // Base methods
    //-----------------------------------------------------------------------

    public static validateUndefinedType(value: any, fieldName?: string): void{
        if ( value === undefined ){
            throw Error("The " + this.getFieldNameMessage(fieldName) + " is undefined")
        }
    }

    public static validateType(value: any, type: string, fieldName?: string): void{
        this.validateUndefinedType(value, fieldName)
        if ( type === this.ID ){
            if ( !(value instanceof Types.ObjectId) ){
                throw Error("The " + this.getFieldNameMessage(fieldName) + " is not a " + type)
            }
        }
        else if ( typeof value !== type ){
            throw Error("The " + this.getFieldNameMessage(fieldName) + " is not a " + type)
        }
    }

    public static validateArrayType(value: any[], type?: string, fieldName?: string): void{
        this.validateUndefinedType(value, fieldName)
        if ( !Array.isArray(value) ){
            throw Error("The " + this.getFieldNameMessage(fieldName, "array") + " is not an array")
        }
        if ( type ){
            try{
                value.map( val => this.validateType(val, type, fieldName) )
            }
            catch(error){
                throw Error("The content of the " + this.getFieldNameMessage(fieldName, "array") + " is not an array of type: " + type )
            }
        }
    }

    public static validateDateType(value: any, fieldName?: string){
        this.validateUndefinedType(value, fieldName)
        if ( !(value instanceof Date) ){
            throw Error("The " + this.getFieldNameMessage(fieldName, "Date") + " is not a date")
        }
    }

    public static validateDateTypeOrCast(value: any, fieldName?: string): Date{
        try{
            this.validateDateType(value, fieldName)
            return value
        }
        catch(error){
            value = new Date( value )
            if ( isNaN(value.getTime()) ){
                throw Error("The " + this.getFieldNameMessage(fieldName, "Date") + " is not a date")
            }
            return value
        }
    }

    //-----------------------------------------------------------------------
    // Short access methods
    //-----------------------------------------------------------------------

    public static validateStringType(value: any, fieldName?: string): void{
        this.validateType(value, this.STRING, fieldName)
    }

    public static validateNumberType(value: any, fieldName?: string): void{
        this.validateType(value, this.NUMBER, fieldName)
    }

    public static validateBooleanType(value: any, fieldName?: string): void{
        this.validateType(value, this.BOOLEAN, fieldName)
    }

    public static validateIdType(value: any, fieldName?: string): void{
        this.validateType(value, this.ID, fieldName)
    }

    public static validateInstanceOfClass(instance: any, Class: any, acceptMoreProperties: boolean){
        this.validateClassAttributes(instance, Class.REQUIRED_ATTRIBUTES, acceptMoreProperties, Class.name)
    }

    //-----------------------------------------------------------------------
    // Deep validation methods
    //-----------------------------------------------------------------------
    
    public static validateNumberInRange(value: number, minVal: number, maxVal: number, fieldName?: string): void{
        this.validateNumberType(value, fieldName)
        if ( (maxVal && value > maxVal) || (minVal && value < minVal) ){
            throw Error("The " + this.getFieldNameMessage(fieldName) + " is not in the allowed range [" + 
                minVal + " - " + maxVal + "]")
        }
    }

    //-----------------------------------------------------------------------
    // Properties count validation methods
    //-----------------------------------------------------------------------
    
    public static validateMinimumRequiredProperties(object: any, properties: string[], fieldName?: string){
        const objectProperties: string[] = Object.keys(object)
        properties.forEach( itProp =>{
            if ( !objectProperties.includes( itProp ) ){
                throw new Error("The " + this.getFieldNameMessage(fieldName, "object") + " does not have " + 
                    "the [" + itProp + "] property")
            }
        })
    }

    public static validateStrictRequiredProperties(object: any, properties: string[], fieldName?: string){
        this.validateMinimumRequiredProperties(object, properties, fieldName)
        if ( Object.keys(object).length !== properties.length ){
            throw Error("The " + this.getFieldNameMessage(fieldName, "object") + " has more properties than " +
                "allowed")
        }
    }

    public static validateRequiredAndOptionalProperties(object: any, properties: string[], optionals: string[], fieldName?: string){
        this.validateMinimumRequiredProperties(object, properties, fieldName)
        const objectProperties: string[] = Object.keys(object)
        objectProperties.forEach( itProp => {
            if ( !properties.includes(itProp) && !optionals.includes(itProp) ){
                throw new Error( "The [" + itProp + "] property is not allowed in the " 
                    + this.getFieldNameMessage(fieldName, "object") )
            }
        })
    }

    //-----------------------------------------------------------------------
    // validation methods of the model classes
    //-----------------------------------------------------------------------

    public static validateCustomArray(array: any[], fieldName?: string){
        this.validateUndefinedType(array, fieldName)
        array.map( e => e.validate() )
    }

    public static validateCustomType(value: any, fieldName?: string){
        this.validateUndefinedType(value, fieldName)
        value.validate()
    }

    public static validateClassAttributes(instance: any, attributes: RequiredAttributes, acceptMoreProperties: boolean, className?: string){
        if (attributes.booleans ){
            attributes.booleans.forEach( e => this.validateBooleanType(instance[e], e) )
        }
        if (attributes.numbers ){
            attributes.numbers.forEach( e => this.validateNumberType(instance[e], e) )
        }
        if (attributes.strings ){
            attributes.strings.forEach( e => this.validateStringType(instance[e], e) )
        }
        if (attributes.ids ){
            attributes.ids.forEach( e => this.validateIdType(instance[e], e) )
        }
        if (attributes.customTypes ){
            attributes.customTypes.forEach( e => instance[e].validate() )
        }
        if (attributes.customArrays ){
            attributes.customArrays.forEach( e => this.validateCustomArray(instance[e], e) )
        }    
        if (attributes.otherTypes ){
            attributes.otherTypes.forEach( e => this.validateUndefinedType(instance[e], e) )
        }
        if (attributes.dates ){
            attributes.dates.forEach( e => instance[e] = this.validateDateTypeOrCast(instance[e], e) )
        }
        if (attributes.numberArrays ){
            attributes.numberArrays.forEach( e => this.validateArrayType(instance[e], this.NUMBER, e) )
        }
        if (attributes.stringArrays ){
            attributes.stringArrays.forEach( e => this.validateArrayType(instance[e], this.STRING, e) )
        }
        if (attributes.idArrays ){
            attributes.idArrays.forEach( e => this.validateArrayType(instance[e], this.ID, e) )
        }
        //@ts-ignore
        let requiredAttributes = [...Object.keys( attributes ).map( (it: string) => (it !== 'optionals' ? attributes[it] : []))]
        requiredAttributes = requiredAttributes.reduce( (tot, curr) => tot.concat(curr) )
        if ( !acceptMoreProperties && attributes.optionals && attributes.optionals.length > 0 ){
            this.validateRequiredAndOptionalProperties(instance, requiredAttributes, attributes.optionals, className)
        }
        else if ( !acceptMoreProperties ){
            this.validateStrictRequiredProperties(instance, requiredAttributes, className)
        }
    }

    public static mergeRequiredAttributes(base: RequiredAttributes, other: RequiredAttributes): RequiredAttributes{
        return {
            booleans: this.mergeAttributesArray(base.booleans, other.booleans),
            customArrays: this.mergeAttributesArray(base.customArrays, other.customArrays),
            customTypes: this.mergeAttributesArray(base.customTypes, other.customTypes),
            dates: this.mergeAttributesArray(base.dates, other.dates),
            numbers: this.mergeAttributesArray(base.numbers, other.numbers),
            otherTypes: this.mergeAttributesArray(base.otherTypes, other.otherTypes),
            strings: this.mergeAttributesArray(base.strings, other.strings),
            stringArrays: this.mergeAttributesArray(base.stringArrays, other.stringArrays),
            numberArrays: this.mergeAttributesArray(base.numberArrays, other.numberArrays),
            optionals: this.mergeAttributesArray(base.optionals, other.optionals),
            ids: this.mergeAttributesArray(base.ids, other.ids),
            idArrays: this.mergeAttributesArray(base.idArrays, other.idArrays),
        }
    }

}