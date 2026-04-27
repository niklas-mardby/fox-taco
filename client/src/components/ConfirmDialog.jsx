import styles from "./ConfirmDialog.module.css";

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
	return (
		<div className={styles.overlay}>
			<div className={styles.dialog}>
				<p className={styles.message}>{message}</p>
				<div className={styles.buttons}>
					<button className={styles.cancelBtn} onClick={onCancel}>
						Avbryt
					</button>
					<button className={styles.confirmBtn} onClick={onConfirm}>
						Ta bort
					</button>
				</div>
			</div>
		</div>
	);
}
