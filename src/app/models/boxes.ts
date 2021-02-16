
export interface IBoxe {

    isEmpty : Boolean,
    color : String,
    classes : Array<string>, // Clesses 
    elements : Array<any>,
    player ?: {
        direction : String,
        classes? : Array<String>
    },
    win?:Boolean,
    star?:Boolean

}
export interface IInfos {
    conditions:Array<string>,
    instructions:Array<string>,
    tutorial:Array<{ tag:string, body:string }>,
}
export interface IBoxes {
    
    infos:IInfos,
    boxes : Array<Array<IBoxe>>
}
