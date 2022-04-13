import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { Phone } from "./Phone";
import { User } from "./User";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Phone, (phone) => phone.id)
  @JoinColumn()
  phone: Phone;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column({ default: 1 })
  quantity: Number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
