
//in ddd everything is strictly organized and layer do not leak each other 
//infrastructure related 
export class AlarmItem{
    constructor(
        public id: string,
        public name: string,
        public type: string
    ) {}
}