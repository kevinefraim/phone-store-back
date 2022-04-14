import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Phone } from "./Phone";

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Phone, (phone) => phone.brand)
  phones: Phone[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: string;
}
