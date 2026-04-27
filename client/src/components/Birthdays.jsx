import styles from "./Birthdays.module.css";

const getDaysUntilBirthday = (birthdayStr) => {
	if (!birthdayStr) return null;
	const today = new Date();
	const birthday = new Date(birthdayStr);
	const next = new Date(
		today.getFullYear(),
		birthday.getMonth(),
		birthday.getDate(),
	);
	if (next < today) next.setFullYear(today.getFullYear() + 1);
	const diff = Math.round((next - today) / (1000 * 60 * 60 * 24));
	return diff;
};

const formatDate = (dateStr) => {
	if (!dateStr) return "";
	const d = new Date(dateStr);
	return d.toLocaleDateString("sv-SE", { day: "numeric", month: "long" });
};

const getAge = (birthdayStr) => {
	if (!birthdayStr) return null;
	const today = new Date();
	const birthday = new Date(birthdayStr);
	let age = today.getFullYear() - birthday.getFullYear();
	const hasPassed =
		today.getMonth() > birthday.getMonth() ||
		(today.getMonth() === birthday.getMonth() &&
			today.getDate() >= birthday.getDate());
	if (!hasPassed) age -= 1;
	return age;
};

export default function Birthdays({ contacts }) {
	const withBirthdays = contacts
		.filter((c) => c.birthday)
		.map((c) => ({ ...c, daysUntil: getDaysUntilBirthday(c.birthday) }))
		.sort((a, b) => a.daysUntil - b.daysUntil);

	const today = withBirthdays.filter((c) => c.daysUntil === 0);
	const upcoming = withBirthdays.filter(
		(c) => c.daysUntil > 0 && c.daysUntil <= 30,
	);
	const later = withBirthdays.filter((c) => c.daysUntil > 30);

	return (
		<div>
			<div className={styles.header}>
				<h1 className={styles.title}>Födelsedagar 🎂</h1>
				<p className={styles.subtitle}>
					{withBirthdays.length === 0
						? "Inga sparade födelsedagar"
						: `${withBirthdays.length} av ${contacts.length} kompisar har sparad födelsedag`}
				</p>
			</div>

			{today.length > 0 && (
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>🎉 Idag!</h2>
					<ul className={styles.list}>
						{today.map((c) => (
							<li
								key={c.id}
								className={`${styles.card} ${styles.today}`}
							>
								<span className={styles.emoji}>{c.emoji}</span>
								<div className={styles.info}>
									<strong>{c.name}</strong>
									<span className={styles.meta}>
										Fyller {getAge(c.birthday) + 1} år idag! 🎈
									</span>
								</div>
							</li>
						))}
					</ul>
				</section>
			)}

			{upcoming.length > 0 && (
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Inom 30 dagar</h2>
					<ul className={styles.list}>
						{upcoming.map((c) => (
							<li key={c.id} className={styles.card}>
								<span className={styles.emoji}>{c.emoji}</span>
								<div className={styles.info}>
									<strong>{c.name}</strong>
									<span className={styles.meta}>
										{formatDate(c.birthday)} – om {c.daysUntil}{" "}
										{c.daysUntil === 1 ? "dag" : "dagar"}
										{getAge(c.birthday) !== null &&
											` (fyller ${getAge(c.birthday) + 1})`}
									</span>
								</div>
								<span className={styles.badge}>{c.daysUntil}d</span>
							</li>
						))}
					</ul>
				</section>
			)}

			{later.length > 0 && (
				<section className={styles.section}>
					<h2 className={styles.sectionTitle}>Senare</h2>
					<ul className={styles.list}>
						{later.map((c) => (
							<li
								key={c.id}
								className={`${styles.card} ${styles.later}`}
							>
								<span className={styles.emoji}>{c.emoji}</span>
								<div className={styles.info}>
									<strong>{c.name}</strong>
									<span className={styles.meta}>
										{formatDate(c.birthday)}
										{getAge(c.birthday) !== null &&
											` (fyller ${getAge(c.birthday) + 1})`}
									</span>
								</div>
								<span className={styles.badgeGray}>{c.daysUntil}d</span>
							</li>
						))}
					</ul>
				</section>
			)}

			{withBirthdays.length === 0 && (
				<div className={styles.empty}>
					<span>🎂</span>
					<p>Inga kontakter har sparad födelsedag ännu.</p>
				</div>
			)}
		</div>
	);
}
