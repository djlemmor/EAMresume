import { VueCookieNext } from 'vue-cookie-next';
import { USER_UID } from '@/common/constants';

export function isLoggin(): boolean {
    const useruid = VueCookieNext.getCookie(USER_UID);
    if (useruid === null) return false;
    return true;
}

export function getUserUID(): string {
    return VueCookieNext.getCookie(USER_UID);
}

export function saveUserUID(uid: string): void {
    VueCookieNext.setCookie(USER_UID, uid);
}

export function removeUserUID(): void {
    VueCookieNext.removeCookie(USER_UID);
}