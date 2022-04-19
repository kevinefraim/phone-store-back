import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CartItem } from "../entities";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, (item) => item.id, { cascade: true })
  item: CartItem[];

  @Column({ default: 0 })
  total: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
