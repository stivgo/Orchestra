import Page from './page';

export default interface Section {

    _id?: string,
    name: string,
    number: number,
    startTime: number,
    endTime: number,
    pages: Page[]

}
