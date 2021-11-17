export type HtmlProperty = {
    property: string
    value?: string
}

export class HtmlRender{

    private htmlTag: string
    private properties: HtmlProperty[]
    private children: string[] | HtmlRender[]
    private autoClosed?: boolean

    constructor(htmlTag?: string){
        this.htmlTag = (htmlTag) ? htmlTag : ""
        this.properties = []
        this.children = []
        this.autoClosed = false
    }

    public render(): string{
        let htmlCode = '<' + (this.htmlTag)
        htmlCode += (this.properties.length > 0) ? this.renderProperties() : ''
        htmlCode += (!this.autoClosed) ? '>' : ''
        htmlCode += this.renderChildren()
        htmlCode += (!this.autoClosed) ? this.getHtmlFormattedTag(this.htmlTag, true) : ' />'
        return htmlCode
    }

    public addProperty(property: string, value?: string): HtmlRender{
        this.properties.push({property, value})
        return this
    }

    public addChild(newChild: string | HtmlRender): HtmlRender{
        //@ts-ignore
        this.children.push(newChild)
        return this
    }

    public addChildren(...newChildren: (string | HtmlRender | string[] | HtmlRender[])[]): HtmlRender{
        newChildren.forEach(newChild => {  
            if ( Array.isArray(newChild) ){
                newChild.forEach( subChild => this.addChild(subChild) )
            }
            else{
                this.addChild(newChild)
            }
        })
        return this
    }

    public setHtmlTag(htmlTag: string): HtmlRender{
        this.htmlTag = htmlTag
        return this
    }

    public setAutoClosed(autoClosed: boolean): HtmlRender{
        this.autoClosed = autoClosed
        return this
    }

    private renderProperties(): string{
        let tokens = this.properties.map( (cur) => ` ${cur.property}${(cur.value ? '="' + cur.value + '"' : '')}`)
        return tokens.reduce( (tot, cur) => tot + cur )
    }

    private renderChildren(): string{
        if ( this.children.length === 0 ){
            return ''
        }
        else if (this.children.length === 1 && typeof this.children[0] === 'string' && !this.children[0].includes('\n')){
            return this.children[0]
        }
        else{
            let res = this.children.map( (curr) => this.renderChild(curr) )
            let def = res.reduce( (tot, curr) => tot + '\n' + curr )
            return '\n' + def + '\n'
        } 
    }

    private renderChild(child: string | HtmlRender): string{
        let tokens = ( typeof child === 'string' ) ? child.split('\n') : child.render().split('\n')
        tokens = tokens.map( cur => '\t' + cur )
        let render = tokens.reduce( (tot, cur) => tot + '\n' + cur )
        return render
    }

    private getHtmlFormattedTag(tag: string, closing?: boolean){
        return ( (!closing) ? "<" : "</") + tag + ">"
    }
}