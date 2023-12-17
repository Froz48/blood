import { donorEntity } from "@app/donor/donor.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'donation'})
export class donationEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date

    @ManyToOne(()=> donorEntity, (donor)=>donor.donations)
    donor: donorEntity
}
