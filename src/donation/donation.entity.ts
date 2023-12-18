import { donorEntity } from "@app/donor/donor.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'donation'})
export class donationEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date

    @Column({default: 'blood'})
    donationType: string

    /*
    @Column({default: 'blood'})
    documentId: number
    */

    @ManyToOne(()=> donorEntity, (donor)=>donor.donations)
    donor: donorEntity
}
