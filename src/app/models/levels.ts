
export interface IlevelMenu {
    score?:number
    current?: Boolean // Le dernier niveau dévérouillé
    world:number
    level:number
}

export interface IlevelsMenu {
    worldOne : Array<IlevelMenu>
    worldTwo : Array<IlevelMenu>
    worldThree : Array<IlevelMenu>
}