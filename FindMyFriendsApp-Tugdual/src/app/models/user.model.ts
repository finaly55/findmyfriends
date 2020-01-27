import {LocationModel} from './location.model';

export class UserModel {
    location: LocationModel;
    uid: string;

    constructor(public email: string,
                public pseudo: string,
                public phone: string) {
    }
}
