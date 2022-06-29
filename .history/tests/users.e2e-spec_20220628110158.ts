import { App } from "../src/app";
import { boot } from "../src/main";

let application: App;

beforeAll( async() => {
    const { app } = await boot;
    application = app
})