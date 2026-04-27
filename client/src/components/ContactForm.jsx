import { useState } from "react";
import styles from "./ContactForm.module.css";

const EMOJIS = [
	"🧑",
	"👩",
	"👨",
	"🧔",
	"👱",
	"🧕",
	"👳",
	"🎅",
	"🧙",
	"🦊",
	"🐱",
	"🐶",
	"🐸",
	"🦋",
	"⭐",
];

export default function ContactForm({ contact, onSave, onCancel }) {
	const [form, setForm] = useState({
		name: contact?.name ?? "",
		phone: contact?.phone ?? "",
		email: contact?.email ?? "",
		birthday: contact?.birthday ?? "",
		emoji: contact?.emoji ?? "🧑",
	});
	const [error, setError] = useState("");
	const [saving, setSaving] = useState(false);

	const handleChange = (e) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		if (!form.name.trim()) {
			setError("Namn krävs.");
			return;
		}
		setSaving(true);
		try {
			await onSave({ ...form, name: form.name.trim() });
		} catch (err) {
			setError(err.message);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div>
			<div className={styles.header}>
				<h1 className={styles.title}>
					{contact ? "Redigera kontakt" : "Ny kontakt"}
				</h1>
			</div>

			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.emojiPicker}>
					<label>Emoji</label>
					<div className={styles.emojiGrid}>
						{EMOJIS.map((e) => (
							<button
								key={e}
								type="button"
								className={`${styles.emojiBtn} ${form.emoji === e ? styles.selected : ""}`}
								onClick={() =>
									setForm((prev) => ({ ...prev, emoji: e }))
								}
							>
								{e}
							</button>
						))}
					</div>
				</div>

				<div className={styles.field}>
					<label htmlFor="name">Namn *</label>
					<input
						id="name"
						name="name"
						value={form.name}
						onChange={handleChange}
						placeholder="Förnamn Efternamn"
						autoFocus
					/>
				</div>

				<div className={styles.row}>
					<div className={styles.field}>
						<label htmlFor="phone">Telefon</label>
						<input
							id="phone"
							name="phone"
							type="tel"
							value={form.phone}
							onChange={handleChange}
							placeholder="070-000 00 00"
						/>
					</div>
					<div className={styles.field}>
						<label htmlFor="email">E-post</label>
						<input
							id="email"
							name="email"
							type="email"
							value={form.email}
							onChange={handleChange}
							placeholder="namn@exempel.se"
						/>
					</div>
				</div>

				<div className={styles.field}>
					<label htmlFor="birthday">Födelsedag</label>
					<input
						id="birthday"
						name="birthday"
						type="date"
						value={form.birthday}
						onChange={handleChange}
					/>
				</div>

				{error && <p className={styles.error}>{error}</p>}

				<div className={styles.buttons}>
					<button
						type="button"
						className={styles.cancelBtn}
						onClick={onCancel}
					>
						Avbryt
					</button>
					<button
						type="submit"
						className={styles.saveBtn}
						disabled={saving}
					>
						{saving
							? "Sparar..."
							: contact
								? "Spara ändringar"
								: "Lägg till"}
					</button>
				</div>
			</form>
		</div>
	);
}
