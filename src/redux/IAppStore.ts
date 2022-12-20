import { IProfileTypes } from './ducks/auth/profile/types';
import { ITokenTypes } from './ducks/auth/token/types';
import { IErrorTypes } from './ducks/component/types';
import { IWebConfig } from './ducks/webConfig/types';
// import { IProfileTypes } from './ducks/auth/profile/types';
// import { IOrdersTypes } from './ducks/pay/orders/types';
import { IWalletsTypes } from './ducks/pay/wallet/types';
import { IWalletDetailTypes } from './ducks/pay/walletDetail/types';
import { IOrdersTypes } from './ducks/pay/order/types';
import { IOrderDetailTypes } from './ducks/pay/orderDetail/types';
import { ICategoryTypes } from './ducks/categorias/types';
import { IDocumentosTypes } from './ducks/documents/types';
import { ICabecalhosTypes } from './ducks/cabecalho/types';
import { IAllDocumentosTypes } from './ducks/allDocuments/types';
import { IVehiclesTypes } from './ducks/vehicles/types';

export interface AppStore {
  token: ITokenTypes;
  profile: ITokenTypes;
  webConfig: IWebConfig;
  // orders: IOrdersTypes;
  wallet: IWalletsTypes;
  order: IOrdersTypes;
  orderDetail: IOrderDetailTypes;
  walletDetail: IWalletDetailTypes;
  categoria: ICategoryTypes;
  documents: IDocumentosTypes;
  vehicles: IVehiclesTypes;
  alldocuments: IAllDocumentosTypes;
  cabecalho: ICabecalhosTypes;
  componentError: IErrorTypes;
}
