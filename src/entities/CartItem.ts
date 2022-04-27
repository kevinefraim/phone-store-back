import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Phone, Cart, User } from "../entities";

@Entity()
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Phone, (phone) => phone.item)
  @JoinColumn()
  phone: Phone;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Cart, (cart) => cart.id, { onDelete: "CASCADE" })
  @JoinColumn()
  cart: Cart;

  @Column({ default: 1 })
  quantity: Number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
