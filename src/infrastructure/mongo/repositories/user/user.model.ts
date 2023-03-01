import { IUser } from '@/domain/models/user/user.model';
import { Schema, model, Model } from 'mongoose';

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'client'],
        message: '{VALUE} no es un rol válido',
        default: 'client',
      },
      required: true,
    },
    login: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModel: Model<IUser> = model('user', UserSchema);

export default userModel;
