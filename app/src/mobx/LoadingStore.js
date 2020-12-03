import {action, observable} from 'mobx'
import {strings} from "../config/i18n/i18n";
import DialogUtil from "../util/DialogUtil";

export default class LoadingStore {

    @observable loading = false

    @action showLoading() {
        this.loading = true
    }

    @action hideLoading() {
        this.loading = false
    }
}

export const getMessage = (code, defaultValue) => {
    return strings(`error_code.${code}`, {defaultValue});
};

export const showMessage = (message, title, onClickOk) => {
    title = title || strings('common.title');
    DialogUtil.showMessageDialog(title, message, strings('button.ok'), onClickOk);
}

export const showConfirm = ({message, title, confirmText, confirmReject, onConfirmClick, onRejectClick}) => {
    title = title || strings('common.title');
    message = message || strings('common.message');
    confirmText = confirmText || strings('button.ok');
    confirmReject = confirmReject || strings('button.cancel');
    DialogUtil.showConfirmDialog(title, message, confirmText, confirmReject, onConfirmClick, onRejectClick);
}