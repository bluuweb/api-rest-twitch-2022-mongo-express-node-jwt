import { Router } from "express";
import { body } from "express-validator";
import { login, register } from "../controllers/auth.controller.js";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = Router();

router.post(
    "/register",
    [
        body("email", "Formato de email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
        body("password", "Formato de password incorrecta").custom(
            (value, { req }) => {
                if (value !== req.body.repassword) {
                    throw new Error("No coinciden las contraseñas");
                }
                return value;
            }
        ),
    ],
    validationResultExpress,
    register
);
router.post(
    "/login",
    [
        body("email", "Formato de email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    ],
    validationResultExpress,
    login
);

export default router;
