import { TokenSaga } from "./token/tokenSagaCombine";
import { ProfileSaga } from "./profile/profileSagaCombine";

export const authSaga = [
    ...TokenSaga,
    ...ProfileSaga
];
