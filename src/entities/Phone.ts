import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Brand, CartItem } from "../entities";
import { Image } from "./Image";

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Brand, (brand) => brand.phones, { onDelete: "CASCADE" })
  @JoinColumn()
  brand: Brand;

  @Column()
  description: string;

  @Column()
  price: number;

  @OneToOne(() => Image, (image) => image.phone)
  @JoinColumn()
  image: Image;

  @Column()
  stock: number;

  @OneToMany(() => CartItem, (item) => item.id)
  item: CartItem[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
