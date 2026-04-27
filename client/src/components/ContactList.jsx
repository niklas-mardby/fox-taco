import styles from "./ContactList.module.css";

export default function ContactList({
	contacts,
	loading,
	onNew,
	onEdit,
	onDelete,
}) {
	if (loading) return <p className={styles.loading}>Laddar kontakter...</p>;

	return (
		<div>
			<div className={styles.header}>
				<div>
					<h1 className={styles.title}>Kontakter</h1>
					<p className={styles.count}>
						{contacts.length === 0
							? "Inga kontakter ännu"
							: `${contacts.length} ${contacts.length === 1 ? "kompis" : "kompisar"}`}
					</p>
				</div>
				<button className={styles.newBtn} onClick={onNew}>
					+ Ny kontakt
				</button>
			</div>

			{contacts.length === 0 ? (
				<div className={styles.empty}>
					<span className={styles.emptyEmoji}>🦊</span>
					<p>Inga kontakter ännu. Lägg till din första kompis!</p>
				</div>
			) : (
				<ul className={styles.list}>
					{contacts.map((contact) => (
						<li key={contact.id} className={styles.card}>
							<span className={styles.emoji}>{contact.emoji}</span>
							<div className={styles.info}>
								<strong className={styles.name}>{contact.name}</strong>
								<div className={styles.details}>
									{contact.phone && <span>📱 {contact.phone}</span>}
									{contact.email && <span>✉️ {contact.email}</span>}
									{contact.birthday && (
										<span>🎂 {contact.birthday}</span>
									)}
								</div>
							</div>
							<div className={styles.actions}>
								<button
									className={styles.editBtn}
									onClick={() => onEdit(contact)}
								>
									Redigera
								</button>
								<button
									className={styles.deleteBtn}
									onClick={() => onDelete(contact.id)}
								>
									Ta bort
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
