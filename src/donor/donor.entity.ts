import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash } from "bcrypt";


@Entity({name: 'donor'})
export class donorEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default : false})
    isHonorable: boolean

    @Column()
    password : string

    @BeforeInsert()
    async hashPassword(){
        this.password = await hash(this.password, 10);
    }

    @Column()
    login: string
}