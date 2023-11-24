import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'city'})
export class cityEntity{
    @PrimaryColumn()
    city: string;
}
