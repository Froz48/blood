import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hash } from "bcrypt";
import { donationEntity } from "@app/donation/donation.entity";


@Entity({name: 'donor'})
export class donorEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({select: false})
    password : string
    
    @Column({default : false})
    isHonorable: boolean

    @Column({default : 'unknown'})
    bloodType: string

    @Column({default: 'unknown'})
    city: string

    @Column({default: 0})
    donationCount: number

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    lastDonationDate: Date

    @BeforeInsert()
    async hashPassword(){
        this.password = await hash(this.password, 10);
    }

    @OneToMany(()=>donationEntity, (donation)=> donation.donor)    
    donations: donationEntity[]
}