import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'facility'})
export class facilityEntity{
    @PrimaryGeneratedColumn()
    id: number

    /*
    @OneToMany(()=>bloodEntity, (storedBlood)=>storedBlood.type)
    storedBlood: bloodEntity[]

    @OneToMany(()=>bloodEntity, (neededBlood)=>neededBlood.type)
    neededBlood: bloodEntity[]
    */
    @Column()
    neededBlood: string

    @Column()
    city: string

    @Column({default:''})
    address: string


}