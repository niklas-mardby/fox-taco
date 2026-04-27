import { useState, useEffect } from "react";
import ContactList from "./components/ContactList.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Birthdays from "./components/Birthdays.jsx";
import ConfirmDialog from "./components/ConfirmDialog.jsx";
import styles from "./App.module.css";

const API = "/api/contacts";

export default function App() {
	const [contacts, setContacts] = useState([]);
	const [view, setView] = useState("list");
	const [editing, setEditing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [confirmId, setConfirmId] = useState(null);

	const fetchContacts = async () => {
		try {
			const res = await fetch(API);
			const data = await res.json();
			setContacts(data);
		} catch {
			setError("Kunde inte hämta kontakter. Är servern igång?");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchContacts();
	}, []);

	const handleSave = async (formData) => {
		const isEditing = editing !== null;
		const url = isEditing ? `${API}/${editing.id}` : API;
		const method = isEditing ? "PUT" : "POST";

		const res = await fetch(url, {
			method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		if (!res.ok) {
			const data = await res.json();
			throw new Error(data.error ?? "Något gick fel.");
		}

		await fetchContacts();
		setEditing(null);
		setView("list");
	};

	const handleDeleteRequest = (id) => setConfirmId(id);

	const handleDeleteConfirm = async () => {
		await fetch(`${API}/${confirmId}`, { method: "DELETE" });
		setConfirmId(null);
		await fetchContacts();
	};

	const handleDeleteCancel = () => setConfirmId(null);

	const handleEdit = (contact) => {
		setEditing(contact);
		setView("form");
	};

	const handleNew = () => {
		setEditing(null);
		setView("form");
	};

	const handleCancel = () => {
		setEditing(null);
		setView("list");
	};

	return (
		<div className={styles.app}>
			<header className={styles.header}>
				<div className={styles.logo}>
					<span className={styles.logoEmoji}>🦊🌮</span>
					<span className={styles.logoText}>Fox Taco</span>
				</div>
				<nav className={styles.nav}>
					<button
						className={`${styles.navBtn} ${view === "list" ? styles.active : ""}`}
						onClick={() => setView("list")}
					>
						Kontakter
					</button>
					<button
						className={`${styles.navBtn} ${view === "birthdays" ? styles.active : ""}`}
						onClick={() => setView("birthdays")}
					>
						🌮 Födelsedagar
					</button>
				</nav>
			</header>

			<main className={styles.main}>
				{error && <p className={styles.error}>{error}</p>}

				{view === "list" && (
					<ContactList
						contacts={contacts}
						loading={loading}
						onNew={handleNew}
						onEdit={handleEdit}
						onDelete={handleDeleteRequest}
					/>
				)}

				{view === "form" && (
					<ContactForm
						contact={editing}
						onSave={handleSave}
						onCancel={handleCancel}
					/>
				)}

				{view === "birthdays" && <Birthdays contacts={contacts} />}

				{confirmId !== null && (
					<ConfirmDialog
						message="Vill du ta bort kontakten? Det går inte att ångra."
						onConfirm={handleDeleteConfirm}
						onCancel={handleDeleteCancel}
					/>
				)}
			</main>
		</div>
	);
}
