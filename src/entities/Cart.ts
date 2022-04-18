import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CartItem } from "./CartItem";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, (item) => item.id)
  item: CartItem[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
