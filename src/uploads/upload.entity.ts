import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Upload {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'Untitled Upload' })
    title: string;

    @Column()
    filename: string;

    @Column()
    mimetype: string;

    @Column()
    size: number;

    @ManyToOne(() => User, (user) => user.uploads, { onDelete: 'CASCADE' })
    user: User;
}
