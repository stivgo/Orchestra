import mongoose, { ObjectId } from 'mongoose';
import ObjectUtils from './ObjectUtils';

export class DatabaseManager{

    //-----------------------------------------------------------------------
    // Statics
    //-----------------------------------------------------------------------

    private static defaultSchema: mongoose.Schema = new mongoose.Schema({},{strict: false, versionKey: false})
    
    //-----------------------------------------------------------------------
    // Connection methods
    //-----------------------------------------------------------------------

    public static async connect(connectionString: string): Promise<void>{
        let extraConfig = {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false
        }
        await mongoose.connect(connectionString, extraConfig)
        console.log( "Database connection established to " + connectionString);
    }

    public static async disconnect(): Promise<void>{
        await mongoose.disconnect()
        console.log( "Database disconnected");
    }

    //-----------------------------------------------------------------------
    // Creation methods
    //-----------------------------------------------------------------------

    public static async createDocument(collection: string, data: any): Promise<any>{
        const Model = mongoose.model(collection, this.defaultSchema)
        const newDocument = new Model( data )
        return (await newDocument.save())._doc     
    }

    //-----------------------------------------------------------------------
    // Search methods
    //-----------------------------------------------------------------------

    public static async findAllDocuments<T>(collection: string, Class?: new(d: any) => T ): Promise<T[]>{
        const Model = mongoose.model(collection, this.defaultSchema)
        let basicData: any[] = await Model.find()
        return this.formatArrayResponse(basicData, Class)
    }    

    public static async findDocumentById<T>(collection: string, documentId: IdType, Class?: new(d: any) => T): Promise<T>{
        const Model = mongoose.model(collection, this.defaultSchema)
        let basicDocument = await Model.findById(documentId)
        return this.formatResponse(basicDocument, Class)
    }

    public static async findDocumentsByQuery<T>(collection: string, query: any, Class?: new(d: any) => T){
        const Model = mongoose.model(collection, this.defaultSchema)
        let basicData: any[] = await Model.find(query)
        return this.formatArrayResponse(basicData, Class)
    }

    public static async findProjectedDocumentById<T>(collection: string, documentId: IdType, projection: any, Class?: new(d: any) => T){
        const Model = mongoose.model(collection, this.defaultSchema)
        let basicData: any[] = await Model.findById(documentId, projection)
        return this.formatResponse(basicData, Class)
    }

    public static async findProjectedDocumentsByQuery<T>(collection: string, query: any, projection: any, Class?: new(d: any) => T){
        const Model = mongoose.model(collection, this.defaultSchema)
        let basicData: any[] = await Model.find(query, projection)
        return this.formatArrayResponse(basicData, Class)
    }

    //-----------------------------------------------------------------------
    // Update methods
    //-----------------------------------------------------------------------
    
    public static async updateDocumentById(collection: string, documentId: IdType, data: any): Promise<void>{
        const Model = mongoose.model(collection, this.defaultSchema)
        const res = await Model.findOneAndUpdate({_id: documentId}, data)
        if ( !res ){
            throw new Error('The document ' + documentId + ' was not found')
        }
    }

    public static async updateDocumentsByQuery(collection: string, query: any, data: any): Promise<void>{
        const Model = mongoose.model(collection, this.defaultSchema)
        const res = await Model.updateMany(query, data)
        if ( !res ){
            throw new Error('Document not found')
        }
    }

    public static async updateArrayFieldOfDocumentById(collection: string, documentId: IdType, updateClause: any, arrayFilters?: any): Promise<void>{
        const Model = mongoose.model(collection, this.defaultSchema)
        const res = await Model.findOneAndUpdate({_id: documentId}, updateClause, arrayFilters)
        if ( !res ){
            throw new Error('The document ' + documentId + ' was not found')
        }
    }

    public static async updateArrayFieldOfDocumentByQuery(collection: string, query: any, updateClause: any, arrayFilters?: any): Promise<void>{
        const Model = mongoose.model(collection, this.defaultSchema)
        const res = await Model.findOneAndUpdate(query, updateClause, arrayFilters)
        if ( !res ){
            throw new Error('Document not found')
        }
    }

    //-----------------------------------------------------------------------
    // Delete methods
    //-----------------------------------------------------------------------

    public static async deleteDocument(collection: string, documentId: IdType): Promise<void>{
        const Model = mongoose.model(collection, this.defaultSchema)
        const res = await Model.findOneAndDelete({_id: documentId})
        if ( !res ){
            throw new Error('The document ' + documentId + ' was not found')
        }
    }

    public static async deleteDocumentsByQuery(collection: string, query: any): Promise<void>{
        const Model = mongoose.model(collection, this.defaultSchema)
        const res = await Model.deleteMany(query)
        if ( !res ){
            throw new Error('Document not found')
        }
    }

    //-----------------------------------------------------------------------
    // Support methods
    //-----------------------------------------------------------------------

    private static formatArrayResponse<T>(data: any[], Class?: new(d: any) => T): T[]{
        if ( !data ){
            return data
        }
        data = data.map( it => it._doc )
        if ( Class ){
            return ObjectUtils.parseClassObjectArray(data, Class)
        }
        return data
    }

    private static formatResponse<T>(data: any, Class?: new(d: any) => T): T{
        if ( !data ){
            return data
        }
        if ( Class ){
            return new Class(data._doc)
        }
        return data._doc
    }

    //-----------------------------------------------------------------------
    // Extra methods
    //-----------------------------------------------------------------------

    public static generateObjectId(id?: IdType): any{
        if ( id && typeof id === 'string' ){
            return mongoose.Types.ObjectId(id);
        }
        if ( id ){
            return id
        }
        return mongoose.Types.ObjectId();
    }

}

export type IdType = ObjectId | string