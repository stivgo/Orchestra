import { DatabaseManager } from "../utils/DatabaseManager";

export class ResourceController{

    private static COLLECTION = "resources"
    private static STYLES = "STYLES"

    public static async getStyles(): Promise<any>{
        const query = {
            resourceName: this.STYLES
        }
        const response: any = await DatabaseManager.findDocumentsByQuery(this.COLLECTION, query)
        return {
            styles: response[0].resources
        }
    }

}