import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class MaterializedAlarmView {
    @Prop({ type: String })
    id: string;

    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    severity: string;

    @Prop({ type: String })
    triggeredAt: string;

    @Prop({ type: Boolean })
    isAcknowledged: boolean;

    @Prop(
        raw([
            {
                id: String,
                name: String,
                type: {
                    type: String
                }
            }
        ]),
    )
    items: Array<{
        id: string;
        name: string;
        type: string
    }>;//materialized views  schema embedded  the item attribute

}

export const MaterializedAlarmViewSchema = SchemaFactory.createForClass(MaterializedAlarmView);