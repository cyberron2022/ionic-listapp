import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

const Modal = (MyModal: any) => {
  console.log("Modal:", MyModal);
  //console.log(props)
  return (
    <IonModal handle={false} id="popup-modal" isOpen={MyModal.showModal}>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>My Modal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Invalid Credentials</p>
        <IonButton color="light" onClick={() => MyModal.closeModal()}>
          Close
        </IonButton>
      </IonContent>
    </IonModal>
  );
};

export default Modal;
