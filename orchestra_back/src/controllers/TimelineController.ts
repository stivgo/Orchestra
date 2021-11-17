import { Element } from "../models/elements/abstractElements/Element";
import { Page } from "../models/projects/Page";
import { Timeline, TimelineDataType } from "../models/projects/Timeline";
import { TimelineElement, TimelineElementDataType } from "../models/projects/TimelineElement";
import { DatabaseManager, IdType } from "../utils/DatabaseManager";
import ObjectUtils from "../utils/ObjectUtils";
import { ProjectController } from "./ProjectController";

export class TimelineController{

    //-----------------------------------------------------------------------
    // CRUD Methods
    //-----------------------------------------------------------------------

    static async create(projectId: IdType, pageId: IdType): Promise<Page>{
        const defaultData: TimelineDataType = {
            _id: ObjectUtils.getIdAsObjectId(pageId),
            elements: [],
            projectId: ObjectUtils.getIdAsObjectId(projectId)
        }
        const newTimeline = new Timeline(defaultData)
        return await DatabaseManager.createDocument(Timeline.COLLECTION, newTimeline)
    }

    static async findById(timelineId: IdType): Promise<Timeline>{
        const timeline = await DatabaseManager.findDocumentById(Timeline.COLLECTION, timelineId, Timeline)
        ObjectUtils.throwExceptionIfNotExist(timeline, `The Timeline [${timelineId}] does not exist`)
        return timeline
    }

    static async addElement(requesterUserId: IdType, timelineId: IdType, elementData: TimelineElementDataType): Promise<Timeline>{
        elementData = this.getTimelineElement(elementData)
        const element = new TimelineElement( elementData )
        element.validate()
        const timeline = await this.findById(timelineId)
        timeline.addTimelineElement(element)
        await DatabaseManager.updateDocumentById(Element.COLLECTION, elementData._id, element)
        await DatabaseManager.updateDocumentById(Timeline.COLLECTION, timeline._id, timeline)
        await ProjectController.updateTimes(requesterUserId, timeline.projectId, timeline._id, element.startTime, element.endTime)
        return timeline
    }

    static async updateElement(requesterUserId: IdType, timelineId: IdType, elementData: TimelineElementDataType, throwErrorIfNotExists: boolean): Promise<Timeline>{
        elementData = this.getTimelineElement(elementData)
        const element = new TimelineElement( elementData )
        element.validate()
        const timeline = await this.findById(timelineId)
        timeline.updateTimelineElement(element, throwErrorIfNotExists)
        await DatabaseManager.updateDocumentById(Element.COLLECTION, elementData._id, element)
        await DatabaseManager.updateDocumentById(Timeline.COLLECTION, timeline._id, timeline)
        await ProjectController.updateTimes(requesterUserId, timeline.projectId, timeline._id, element.startTime, element.endTime)
        return timeline
    }

    static async deleteElement(timelineId: IdType, elementId: IdType, throwErrorIfNotExists: boolean): Promise<Timeline>{
        elementId = ObjectUtils.getIdAsObjectId(elementId)
        const timeline = await this.findById(timelineId)
        timeline.deleteTimelineElement(elementId, throwErrorIfNotExists)
        await DatabaseManager.updateDocumentById(Timeline.COLLECTION, timeline._id, timeline)
        return timeline
    }

    static async delete(timelineId: IdType): Promise<void>{
        await DatabaseManager.deleteDocument(Timeline.COLLECTION, timelineId)
    }

    private static getTimelineElement(elementData: any): TimelineElementDataType{
        return {
            _id: ObjectUtils.getIdAsObjectId(elementData._id),
            endTime: elementData.endTime,
            startTime: elementData.startTime,
            title: elementData.title
        }
    }

}