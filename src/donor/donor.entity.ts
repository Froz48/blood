import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash } from "bcrypt";


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


    @BeforeInsert()
    async hashPassword(){
        this.password = await hash(this.password, 10);
    }


}