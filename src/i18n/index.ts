import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

import pt_BR from "./pt-BR.json";
import en_US from "./en-US.json";

const resources = {
    en_US: {
        translation: en_US
    },
    en: {
        translation: en_US
    },
    pt_BR: {
        translation: pt_BR
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "pt_BR",
        debug: false,
        interpolation: {
            format: function (value, format, lng) {
                if (value) {
                    if (format === "uppercase") return value.toUpperCase();
                    if (format === "lowercase") return value.toLowerCase();
                }
                return value;
            }
        }
    });

export default i18n;
