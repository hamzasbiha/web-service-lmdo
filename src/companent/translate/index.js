import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        Boutique: "Shop",
        Chien: "Dog",
        Chats: "Cats",
        Oiseaux: "Bird",
        Compte: "Profile",
        Deconnexion: "Log out",
        Pannier: "Cart",
        fetPord: "Access to our new products and promotions.",
        Feed_Your_Pet: "Feed Your Pet",
        Market: "Market",
        Sort_By_Price: "Sort By Price",
        highest_first: "highest first",
        Filter_By: "filter by price",
        Lowest_first: "Lowest first",
        highest_first: "highest first",
        Apply: "Apply",
        Reset_FIlter: "Reset FIlter",
        Contact_Us: "Contact Us",
        Nom: "Name",
        Pass: "Password",
        Login:"Login",
      },
    },
    fr: {
      translation: {
        Boutique: "Boutique",
        Chien: "Chien",
        Chats: "Chats",
        Oiseaux: "Oiseaux",
        Compte: "Compte",
        Deconnexion: "Deconnexion",
        Pannier: "Pannier",
        fetPord: "Accès à nos nouveaux produits et promotions.",
        Feed_Your_Pet: "Nourrir votre animal",
        Market: "",
        Sort_By_Price: "Trier par prix",
        highest_first: "Le plus élevé d'abord",
        Filter_By: "filtrer par prix",
        Lowest_first: "Le plus bas",
        highest_first: "Le plus élevé",
        Apply: "Appliquer",
        Reset_FIlter: "Réinitialiser le filtre",
        Contact_Us: "Contactez-nous",
        Nom: "Nom",
        Pass: "mot de passe",
        Login:"Connexion",
      },
    },
  },
});

export default i18n;
