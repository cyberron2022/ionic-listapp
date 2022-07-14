import {
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import menu from "../../menu";
import styles from "./Menu.module.scss";
const Menu: React.FC = () => {
  return (
    <IonMenu side="start" type="overlay" swipeGesture={true} contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle> MENU </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {menu.map((item: any, index) => (
          <IonMenuToggle key={index} auto-hide="false">
            <IonButtons slot="start">
              <IonIcon icon={item.icon} slot="icon-only"></IonIcon>
            </IonButtons>
            <IonItem button routerLink={`${item.link}`} routerDirection="none">
              <IonLabel>{item.title}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        ))}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle className={styles.copyrightLabel}>
            My First Project v1.0 Copyright 2022
          </IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonMenu>
  );
};

export default Menu;
