"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var cors_1 = require("cors");
var express_1 = require("express");
var cookie_parser_1 = require("cookie-parser");
var helmet_1 = require("helmet");
var morgan_1 = require("morgan");
var cookie_session_1 = require("cookie-session");
var passport_1 = require("passport");
var constants_1 = require("@globals/constants");
var passport_2 = require("@utils/passport");
var upload_1 = require("@utils/upload");
dotenv_1["default"].config();
(0, passport_2.initializePassport)();
(0, upload_1.initializeMulter)();
var app = (0, express_1["default"])();
//------------------------- ROUTERS -------------------------
var auth_1 = require("@routes/auth");
var otp_1 = require("@routes/otp");
var anime_1 = require("@routes/anime");
var studio_1 = require("@routes/studio");
var animeSeason_1 = require("@routes/animeSeason");
var va_1 = require("@routes/va");
var user_1 = require("@routes/user");
var genre_1 = require("@routes/genre");
//-------------------------END OF IMPORTS------------------------
app
    .use((0, cors_1["default"])({
    origin: process.env.CLIENT,
    credentials: true
}))
    .use((0, helmet_1["default"])())
    .use((0, morgan_1["default"])(process.env.NODE_ENV === "development" ? "dev" : "short"))
    .use((0, cookie_parser_1["default"])())
    .use(express_1["default"].json())
    .use(express_1["default"].urlencoded({ extended: true }))
    .use((0, cookie_session_1["default"])({
    maxAge: constants_1.COOKIE_MAX_AGE,
    keys: [process.env.SECRET]
}))
    .use(passport_1["default"].initialize())
    .use(passport_1["default"].session());
//-------------------------END OF MIDDLEWARES------------------------
app.use("".concat(constants_1.ROOT, "/auth"), auth_1["default"]);
app.use("".concat(constants_1.ROOT, "/otp"), otp_1["default"]);
app.use("".concat(constants_1.ROOT, "/anime"), anime_1["default"]);
app.use("".concat(constants_1.ROOT, "/studio"), studio_1["default"]);
app.use("".concat(constants_1.ROOT, "/anime_season"), animeSeason_1["default"]);
app.use("".concat(constants_1.ROOT, "/va"), va_1["default"]);
app.use("".concat(constants_1.ROOT, "/user"), user_1["default"]);
app.use("".concat(constants_1.ROOT, "/genre"), genre_1["default"]);
//-------------------------END OF ROUTERS------------------------
app.get("/", function (_, res) {
    res.json({ status: true });
});
//-------------------------END OF ROUTES------------------------
app.listen(process.env.PORT, function () {
    console.log("Server running on port:".concat(process.env.PORT, " on mode:").concat(process.env.NODE_ENV));
});
