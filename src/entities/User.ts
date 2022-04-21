import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CartItem } from "../entities";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => CartItem, (cartItem) => cartItem.user)
  cartItem: CartItem[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
