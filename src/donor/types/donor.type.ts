import { donorEntity } from "../donor.entity";

export type donorType = Omit<donorEntity, 'hashPassword'>;