import { Alarm } from "src/alarm/domain/alarm";

//this is the port which define the here defined two method

//here both class and method are abstract 
//after use of abstract we could use interfaces 
export abstract class AlarmRepository{
    abstract findAll():Promise<Alarm[]>;
    abstract save(alarm:Alarm):Promise<Alarm>;
}