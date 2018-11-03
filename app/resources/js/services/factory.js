import Vue from "vue";
import {EventEmitter} from "tooleks";

import config from "../config";
import store from "../store";
import CookiesManager from "./CookiesManager";
import LocalStorageManager from "./LocalStorageManager";
import AlertService from "./AlertService";
import ApiHandler from "./api/ApiHandler";
import ApiService from "./api/ApiService";
import AuthManager from "./AuthManager";
import LoginManager from "./LoginManager";
import BrowserReCaptcha from "./recaptcha/BrowserReCaptcha";
import DummyReCaptcha from "./recaptcha/DummyReCaptcha";
import PhotoManager from "./PhotoManager";
import SubscriptionManager from "./SubscriptionManager";
import TagManager from "./TagManager";

/** @type {Object} */
export function getConfig() {
    return config;
}

export function getStore() {
    return store;
}

/** @type {EventEmitter} */
const eventEmitter = new EventEmitter;

/** @return {EventEmitter} */
export function getEventEmitter() {
    return eventEmitter;
}

/** @type {CookiesManager} */
const cookiesManager = new CookiesManager;

/** @return {CookiesManager} */
export function getCookies() {
    return cookiesManager;
}

/** @type {LocalStorageManager} */
const localStorageManager = new LocalStorageManager;

/** @return {LocalStorageManager} */
export function getLocalStorage() {
    return localStorageManager;
}

/** @type {AlertService} */
const alertService = new AlertService;

/** @return {AlertService} */
export function getAlert() {
    return alertService;
}

/** @type {ApiHandler} */
const apiHandler = new ApiHandler(config.url.api, getAlert());
/** @type {ApiService} */
const apiService = new ApiService(config.url.api, apiHandler.onData, apiHandler.onError);

/** @return {ApiService} */
export function getApi() {
    return apiService;
}

/** @type {AuthManager} */
const authManager = new AuthManager(getStore(), getLocalStorage());

/** @return {AuthManager} */
export function getAuth() {
    return authManager;
}

/** @type {LoginManager} */
const loginManager = new LoginManager(getApi(), getCookies(), getAuth());

/** @return {LoginManager} */
export function getLogin() {
    return loginManager;
}

/** @return {BrowserReCaptcha|DummyReCaptcha} */
export function getReCaptcha(element, siteKey, onVerified) {
    // Provide Recaptcha service only in a browser environment,
    // and if the site key value is provided.
    if (!Vue.$isServer && siteKey) {
        return new BrowserReCaptcha(element, siteKey, onVerified);
    }
    return new DummyReCaptcha(onVerified);
}

/** @type {PhotoManager} */
const photoManager = new PhotoManager(getApi());

/** @return {PhotoManager} */
export function getPhotoManager() {
    return photoManager;
}

/** @type {SubscriptionManager} */
const subscriptionManager = new SubscriptionManager(getApi());

/** @return {SubscriptionManager} */
export function getSubscriptionManager() {
    return subscriptionManager;
}

/** @type {TagManager} */
const tagManager = new TagManager(getApi());

/** @return {TagManager} */
export function getTagManager() {
    return tagManager;
}
