// server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { readFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const app = express();
const PORT = process.env.PORT ?? 3000;
const ENV = process.env.NODE_ENV ?? "development";
const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:5173";
const FILE = join(import.meta.dirname, "contacts.json");

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());

class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

const fileExists = async (path) => {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
};

const readContacts = async () =>
	(await fileExists(FILE)) ? JSON.parse(await readFile(FILE, "utf-8")) : [];

const writeContacts = async (contacts) =>
	writeFile(FILE, JSON.stringify(contacts, null, 2), "utf-8");

// GET /api/contacts
app.get("/api/contacts", async (req, res, next) => {
	try {
		const contacts = await readContacts();
		res.json(contacts);
	} catch (err) {
		next(err);
	}
});

// GET /api/contacts/:id
app.get("/api/contacts/:id", async (req, res, next) => {
	try {
		const contacts = await readContacts();
		const contact = contacts.find((c) => c.id === Number(req.params.id));
		if (!contact) throw new AppError("Kontakten hittades inte.", 404);
		res.json(contact);
	} catch (err) {
		next(err);
	}
});

// POST /api/contacts
app.post("/api/contacts", async (req, res, next) => {
	try {
		const { name, phone, email, birthday, emoji } = req.body;
		if (!name) throw new AppError("name krävs.", 400);

		const contacts = await readContacts();
		const id = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
		const contact = {
			id,
			name,
			phone: phone ?? "",
			email: email ?? "",
			birthday: birthday ?? "",
			emoji: emoji ?? "🧑",
			created: new Date().toISOString(),
		};

		await writeContacts([...contacts, contact]);
		res.status(201).json(contact);
	} catch (err) {
		next(err);
	}
});

// PUT /api/contacts/:id
app.put("/api/contacts/:id", async (req, res, next) => {
	try {
		const contacts = await readContacts();
		const index = contacts.findIndex((c) => c.id === Number(req.params.id));
		if (index === -1) throw new AppError("Kontakten hittades inte.", 404);

		const { name, phone, email, birthday, emoji } = req.body;
		if (!name) throw new AppError("name krävs.", 400);

		contacts[index] = {
			...contacts[index],
			name,
			phone: phone ?? "",
			email: email ?? "",
			birthday: birthday ?? "",
			emoji: emoji ?? contacts[index].emoji,
		};

		await writeContacts(contacts);
		res.json(contacts[index]);
	} catch (err) {
		next(err);
	}
});

// DELETE /api/contacts/:id
app.delete("/api/contacts/:id", async (req, res, next) => {
	try {
		const contacts = await readContacts();
		const index = contacts.findIndex((c) => c.id === Number(req.params.id));
		if (index === -1) throw new AppError("Kontakten hittades inte.", 404);
		const [deleted] = contacts.splice(index, 1);
		await writeContacts(contacts);
		res.json(deleted);
	} catch (err) {
		next(err);
	}
});

app.use((req, res) => {
	res.status(404).json({ error: "Sidan hittades inte." });
});

const getErrorMessage = (err, env) => {
	if (err.statusCode) return err.message;
	if (env === "development") return err.message;
	return "Internt serverfel.";
};

app.use((err, req, res, next) => {
	const statusCode = err.statusCode ?? 500;
	const message = getErrorMessage(err, ENV);
	if (!err.statusCode) console.error(err);
	res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
	console.log(
		`🦊🌮 Fox Taco API körs på http://localhost:${PORT} i ${ENV}-läge`,
	);
});
