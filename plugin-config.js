const APP_ID_DEV = '3074457351840249299'; //THIS IS THE PANDEMIC PLUGIN (APP) ID. Needed to store metadata.
const APP_ID_PROD = '3074457352082479119'; //THIS IS THE PANDEMIC PLUGIN (APP) ID. Needed to store metadata.
const IS_DEV_ENV = document.location.hostname === "localhost";
const APP_ID = !IS_DEV_ENV ? APP_ID_PROD : APP_ID_DEV; //THIS IS THE PANDEMIC PLUGIN (APP) ID. Needed to store metadata.
const RESOURCES_HOST = "https://i-ze.github.io/miro-pandemic/";