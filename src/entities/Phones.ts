import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Phones {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  image: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
