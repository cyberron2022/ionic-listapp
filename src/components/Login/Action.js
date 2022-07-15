import { IonCol, IonRouterLink, IonRow } from "@ionic/react";

export const Action = (props) => (
  <IonRow className="ion-text-right ">
    <IonCol size="11">
      <p className="custom-link-label">
        {props.message}
        <IonRouterLink className="custom-link" routerLink={props.link}>
          {" "}
          {props.text} &rarr;
        </IonRouterLink>
      </p>
    </IonCol>
    <IonCol size="1"></IonCol>
  </IonRow>
);
