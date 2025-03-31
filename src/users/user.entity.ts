import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from 'typeorm';
import { Pin } from '../pins/pin.entity';
import {Upload} from "../uploads/upload.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Pin, (pin) => pin.user)
    pins!: Pin[];

    @OneToMany(() => Upload, (upload) => upload.user)
    uploads: Upload[];
}