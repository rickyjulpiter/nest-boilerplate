import {
  Column,
  DataType,
  DeletedAt,
  Model,
  Table,
} from 'sequelize-typescript';

@Table
export class Otp extends Model {
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
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  otp: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expiredAt: string;

  @Column({
    defaultValue: true,
    allowNull: true,
  })
  status: boolean;

  @DeletedAt
  deletedAt: Date;
}
