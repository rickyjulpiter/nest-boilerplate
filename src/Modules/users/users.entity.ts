import {
  Column,
  DataType,
  DeletedAt,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table
export class Users extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Unique(true)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    defaultValue: true,
    allowNull: true,
  })
  subscription: boolean;

  @Column({
    defaultValue: false,
    allowNull: true,
  })
  status: boolean;

  @DeletedAt
  deletedAt: Date;
}
