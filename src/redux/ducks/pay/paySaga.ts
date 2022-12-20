import { orderSaga } from './order/orderSagaCombine';
import { orderDetailSaga } from './orderDetail/orderDetailSagaCombine';
import { walletSaga } from './wallet/walletSagaCombine';
import { CategorySaga } from '../categorias/categorySagaCombine';
import { walletDetailSaga } from './walletDetail/walletDetailCombine';

export const paySaga = [
    ...walletSaga,
    ...CategorySaga,
    ...walletDetailSaga,
    ...orderSaga,
    ...orderDetailSaga
]