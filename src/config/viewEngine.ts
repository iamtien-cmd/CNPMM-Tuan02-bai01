import express, { Application } from 'express';

export const configViewEngine = (app: Application): void => {
    app.use(express.static("./src/public")); // Thiết lập thư mục tĩnh chứa images, css,..
    app.set("view engine", "ejs");           // thiết lập viewEngine
    app.set("views", "./views");             // thư mục chứa views
};
