import {Friend} from './friend';
import {Coords} from './coords';

export interface User {
    uid: string;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    phoneNumber: string;
    friends: Friend[];
    coords: Coords;
}
