
//value object mean it's defination originate from domain driven design (DDD_)
//it's an immutable object 

export class AlarmSeverity {
    constructor(readonly value: 'critical' | 'high' | 'medium' | 'low') { }

    equals(severity: AlarmSeverity) {
        return this.value === severity.value
    }

    toJSON() {
        return this.value;
    }
}