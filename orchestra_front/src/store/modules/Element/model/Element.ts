import EventDataType from "./Events";
import CssStyle from "./CssStyle";

export default interface Element {
    _id?: string,
    pageId: string,
    parentId?: string,
    type: string,
    title: string,
    description: string,
    xPosition: number,
    yPosition: number,
    zPosition: number,
    width: number,
    height: number,
    startTime: number,
    endTime: number,
    isSelected: boolean,
    isActive: boolean,
    isVisible: boolean,
    events: EventDataType[],
    styles: CssStyle[]
}
