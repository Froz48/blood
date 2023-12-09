import { donorType } from "./donor.type";

export interface donorResponseInterface {
    donor: donorType & {token : string}
}