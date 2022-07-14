import { IonInput, IonLabel } from "@ionic/react";
import styles from "./CustomField.module.scss";

const CustomField = ({ field, data, errors }) => {
  const error = errors && errors.filter((e) => e.id === field.id)[0];
  const errorMessage =
    error && errors.filter((e) => e.id === field.id)[0].message;

  const checkClass = () => {
    if (errorMessage) {
      return styles.customInputWarning;
    } else {
      return styles.customInput;
    }
  };

  return (
    <div className={styles.field}>
      <IonLabel className={styles.fieldLabel}>
        {field.label}

        {error && (
          <p className="animate__animated animate__bounceInRight">
            {errorMessage}
          </p>
        )}
      </IonLabel>

      <IonInput
        className={checkClass()}
        {...field.input.props}
        {...field.input.state}
      />
    </div>
  );
};

export default CustomField;
