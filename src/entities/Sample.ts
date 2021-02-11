import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "samples"})
export class Sample {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column("varchar")
  public name!: string;

}
