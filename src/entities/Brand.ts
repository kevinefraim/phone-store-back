import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Phone } from "../entities";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Phone, (phone) => phone.brand, { cascade: true })
  phones: Phone[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
