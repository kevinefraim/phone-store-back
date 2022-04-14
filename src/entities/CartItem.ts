import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Phone } from "./Phone";
import { User } from "./User";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Phone, (phone) => phone.item)
  @JoinColumn()
  phone: Phone;

  @ManyToOne(() => User, (user) => user.cartItem)
  @JoinColumn()
  user: User;

  @Column({ default: 1 })
  quantity: Number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
