import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CartItem } from "./CartItem";

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
  birth_date: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => CartItem, (cartItem) => cartItem.id)
  cartItem: CartItem[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
