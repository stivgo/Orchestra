export type CssProperty = {
    property: string
    value: string
}

export class CssRender{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    public static CLASS: number = 1
    public static ID: number = 2
    public static HTML_TAG: number = 3

    //-----------------------------------------------------------------------
    // Attributes
    //-----------------------------------------------------------------------

    private styleType: number
    private styleName: string
    private properties: CssProperty[]

    //-----------------------------------------------------------------------
    // Constructor
    //-----------------------------------------------------------------------

    constructor(styleName: string, styleType: number){
        this.styleName = styleName
        this.styleType = styleType
        this.properties = []
    }

    //-----------------------------------------------------------------------
    // Methods
    //-----------------------------------------------------------------------

    public render(): string{
        let cssCode = this.getStylizedName() + '{\n'
        cssCode += this.renderProperties() 
        cssCode += '}'
        return cssCode
    }

    public addProperty(property: string, value: string): CssRender{
        this.properties.push({property, value})
        return this
    }

    public addProperties(...cssProperties: CssProperty[]){
        cssProperties.forEach( prop => this.addProperty(prop.property, prop.value) )
        return this
    }

    private renderProperties(): string{
        let props = this.properties.map( prop => prop.property + ": " + prop.value)
        return '\t' + props.reduce( (tot, curr) => tot + '\n\t' + curr ) + '\n'
    }

    private getStylizedName(){
        switch(this.styleType){
            case CssRender.CLASS: return '#' + this.styleName
            case CssRender.HTML_TAG: return this.styleName
            case CssRender.ID: return '.' + this.styleName
            default: throw new Error('Unknown CssStyle type')
        }
    }

}