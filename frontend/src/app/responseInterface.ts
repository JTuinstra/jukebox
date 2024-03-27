import {SweetAlertIcon} from "sweetalert2";


export interface ResponseInterface {
  type: SweetAlertIcon;
  message: string;
  data: any;
  access_token: string;
  fullMessage: string;
}
