import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Pin {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    imageUrl?: string;

    @ManyToOne(() => User, (user) => user.pins, { onDelete: 'CASCADE' })
    user!: User;
}
