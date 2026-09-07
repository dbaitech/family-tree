import styles from "./PersonSidePanel.module.css";
import type { BalkanNode } from "@/types/types";

interface PersonSidePanelProps {
  person: BalkanNode | null;
  onClose: () => void;
}

interface FieldProps {
  label: string;
  value?: string | null;
}

function Field({ label, value }: FieldProps) {
  if (!value) return null;

  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  );
}

export default function PersonSidePanel({
  person,
  onClose,
}: PersonSidePanelProps) {
  if (!person) return null;

  return (
    <div className={styles.panel}>
      <header className={styles.header}>
        <button onClick={onClose} className={styles.backButton}>
          ←
        </button>

        <div className={styles.profile}>
          <div className={styles.avatar}>{person.name.charAt(0)}</div>

          <h1 className={styles.name}>{person.name}</h1>

          {person.maiden_name && (
            <p className={styles.subtitle}>née {person.maiden_name}</p>
          )}
        </div>
      </header>

      <main className={styles.content}>
        <section>
          <h2 className={styles.sectionTitle}>Biography</h2>

          <div className={styles.grid}>
            <Field label="Birth Date" value={person.birth_date} />

            <Field label="Birth Location" value={person.birth_location} />

            {!person.is_living && (
              <>
                <Field label="Death Date" value={person.death_date} />

                <Field label="Death Location" value={person.death_location} />
              </>
            )}
          </div>
        </section>

        {person.bio && (
          <section>
            <h2 className={styles.sectionTitle}>Biography</h2>

            <div className={styles.card}>
              <p className={styles.bio}>{person.bio}</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
