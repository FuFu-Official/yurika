import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const API_BASE = "https://api.bgm.tv";
const CONFIG_PATH = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/config.ts",
);
const OUTPUT_ANIME = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/data/bangumi-anime-data.json",
);
const OUTPUT_BOOK = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/data/bangumi-book-data.json",
);
const OUTPUT_GAME = path.join(
	path.dirname(fileURLToPath(import.meta.url)),
	"../src/data/bangumi-game-data.json",
);

async function getUserIdFromConfig() {
	try {
		const configContent = await fs.readFile(CONFIG_PATH, "utf-8");
		const match = configContent.match(
			/bangumi:\s*\{[\s\S]*?userId:\s*["']([^"']+)["']/,
		);

		if (match && match[1]) {
			const userId = match[1];
			if (
				userId === "your-bangumi-id" ||
				userId === "your-user-id" ||
				!userId
			) {
				console.warn(
					"Warning: userId in src/config.ts appears to be a default value.",
				);
				return userId;
			}
			return userId;
		}
		throw new Error("Could not find bangumi.userId in config.ts");
	} catch (error) {
		console.error("✘ Failed to read Bangumi ID from config.ts");
		throw error;
	}
}

async function getAnimeModeFromConfig() {
	try {
		const configContent = await fs.readFile(CONFIG_PATH, "utf-8");
		const match = configContent.match(
			/anime:\s*\{[\s\S]*?mode:\s*["']([^"']+)["']/,
		);

		if (match && match[1]) {
			return match[1];
		}
		return "bangumi";
	} catch (error) {
		return "bangumi";
	}
}

async function getBookModeFromConfig() {
	try {
		const configContent = await fs.readFile(CONFIG_PATH, "utf-8");
		const match = configContent.match(
			/book:\s*\{[\s\S]*?mode:\s*["']([^"']+)["']/,
		);

		if (match && match[1]) {
			return match[1];
		}
		return "bangumi";
	} catch (error) {
		return "bangumi";
	}
}

async function getGameModeFromConfig() {
	try {
		const configContent = await fs.readFile(CONFIG_PATH, "utf-8");
		const match = configContent.match(
			/game:\s*\{[\s\S]*?mode:\s*["']([^"']+)["']/,
		);

		if (match && match[1]) {
			return match[1];
		}
		return "bangumi";
	} catch (error) {
		return "bangumi";
	}
}

// 模拟延迟防止 API 限制
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchSubjectDetail(subjectId) {
	try {
		const response = await fetch(`${API_BASE}/v0/subjects/${subjectId}`);
		if (!response.ok) return null;
		return await response.json();
	} catch (error) {
		return null;
	}
}

function getStudioFromInfobox(infobox) {
	if (!Array.isArray(infobox)) return "Unknown";

	const targetKeys = ["动画制作", "制作", "製作", "开发"];

	for (const key of targetKeys) {
		const item = infobox.find((i) => i.key === key);
		if (item) {
			if (typeof item.value === "string") {
				return item.value;
			}
			if (Array.isArray(item.value)) {
				const validItem = item.value.find((v) => v.v);
				if (validItem) return validItem.v;
			}
		}
	}
	return "Unknown";
}

async function fetchCollection(userId, type, subjectType = 2) {
	let allData = [];
	let offset = 0;
	const limit = 50;
	let hasMore = true;

	console.log(`Fetching type: ${type}...`);

	while (hasMore) {
		const url = `${API_BASE}/v0/users/${userId}/collections?subject_type=${subjectType}&type=${type}&limit=${limit}&offset=${offset}`;
		try {
			const response = await fetch(url);

			if (!response.ok) {
				if (response.status === 404) {
					console.log(
						`   User ${userId} does not exist or has no data of this type.`,
					);
					return [];
				}
				throw new Error(`API Error ${response.status}`);
			}

			const data = await response.json();

			if (data.data && data.data.length > 0) {
				allData = [...allData, ...data.data];
				process.stdout.write(
					`   Fetched ${allData.length} records...\r`,
				);
			}

			if (!data.data || data.data.length < limit) {
				hasMore = false;
			} else {
				offset += limit;
				await delay(300);
			}
		} catch (e) {
			console.error(`\nFetch failed (Type ${type}):`, e.message);
			hasMore = false;
		}
	}
	console.log("");
	return allData;
}

async function processData(items, status) {
	const results = [];
	let count = 0;
	const total = items.length;

	for (const item of items) {
		count++;
		process.stdout.write(
			`[${status}] Processing progress: ${count}/${total} (${item.subject_id})\r`,
		);

		const subjectDetail = await fetchSubjectDetail(item.subject_id);
		await delay(150);

		const year = item.subject?.date
			? item.subject.date.slice(0, 4)
			: "Unknown";

		const rating = item.rate
			? Number.parseFloat(item.rate.toFixed(1))
			: item.subject?.score
				? Number.parseFloat(item.subject.score.toFixed(1))
				: 0;

		const progress = item.ep_status || 0;
		const totalEpisodes = item.subject?.eps || progress;

		const studio = subjectDetail
			? getStudioFromInfobox(subjectDetail.infobox)
			: "Unknown";

		const description = (
			subjectDetail?.summary ||
			item.subject?.short_summary ||
			item.subject?.name_cn ||
			""
		).trimStart();

		results.push({
			title:
				item.subject?.name_cn || item.subject?.name || "Unknown Title",
			status: status,
			rating: rating,
			cover: item.subject?.images?.medium || "/assets/anime/default.webp",
			description: description,
			episodes: `${totalEpisodes} episodes`,
			year: year,
			genre: item.subject?.tags
				? item.subject.tags.slice(0, 3).map((tag) => tag.name)
				: ["Unknown"],
			studio: studio,
			link: item.subject?.id
				? `https://bgm.tv/subject/${item.subject.id}`
				: "#",
			progress: progress,
			totalEpisodes: totalEpisodes,
			startDate: item.subject?.date || "",
			endDate: item.subject?.date || "",
		});
	}
	console.log(`\n✓ Completed ${status} list processing`);
	return results;
}

function getFieldFromInfobox(infobox, keys = []) {
	if (!Array.isArray(infobox)) return "";
	for (const key of keys) {
		const found = infobox.find((i) => i.key === key);
		if (found) {
			if (typeof found.value === "string") return found.value;
			if (Array.isArray(found.value)) {
				const v = found.value.find((x) => x.v);
				if (v) return v.v;
			}
		}
	}
	return "";
}

async function processBookData(items, status) {
	const results = [];
	let count = 0;
	const total = items.length;
	for (const item of items) {
		count++;
		process.stdout.write(
			`[book:${status}] Processing progress: ${count}/${total} (${item.subject_id})\r`,
		);
		const subjectDetail = await fetchSubjectDetail(item.subject_id);
		await delay(150);

		const year = item.subject?.date ? item.subject.date.slice(0, 4) : "";
		const rating = item.rate
			? Number.parseFloat(item.rate.toFixed(1))
			: item.subject?.score
				? Number.parseFloat(item.subject.score.toFixed(1))
				: 0;
		const progress = item.progress || 0;
		const totalChapters = item.subject?.volumes || 1;
		const description = (
			subjectDetail?.summary ||
			item.subject?.short_summary ||
			item.subject?.name_cn ||
			""
		).trimStart();

		const author =
			getFieldFromInfobox(subjectDetail?.infobox, [
				"作者",
				"作 者",
				"Author",
			]) ||
			item.subject?.author ||
			"";
		const publisher =
			getFieldFromInfobox(subjectDetail?.infobox, [
				"出版社",
				"出版社/出品",
				"Publisher",
			]) || "";

		results.push({
			title: item.subject?.name_cn || item.subject?.name || "Unknown",
			status: status,
			rating: rating,
			cover: item.subject?.images?.medium || "/assets/book/default.webp",
			description: description,
			year: year,
			genre: item.subject?.tags
				? item.subject.tags.slice(0, 3).map((t) => t.name)
				: ["Unknown"],
			author: author,
			publisher: publisher,
			link: item.subject?.id
				? `https://bgm.tv/subject/${item.subject.id}`
				: "#",
			progress: progress,
			totalChapters: totalChapters,
		});
	}
	console.log(`\n✓ Completed book ${items.length} items`);
	return results;
}

async function processGameData(items, status) {
	const results = [];
	let count = 0;
	const total = items.length;
	for (const item of items) {
		count++;
		process.stdout.write(
			`[game:${status}] Processing progress: ${count}/${total} (${item.subject_id})\r`,
		);
		const subjectDetail = await fetchSubjectDetail(item.subject_id);
		await delay(150);

		const year = item.subject?.date ? item.subject.date.slice(0, 4) : "";
		const rating = item.rate
			? Number.parseFloat(item.rate.toFixed(1))
			: item.subject?.score
				? Number.parseFloat(item.subject.score.toFixed(1))
				: 0;
		const progress = item.progress || 0;
		const totalProgress = item.progress || 0;
		const description = (
			subjectDetail?.summary ||
			item.subject?.short_summary ||
			item.subject?.name_cn ||
			""
		).trimStart();

		const developer =
			getFieldFromInfobox(subjectDetail?.infobox, [
				"开发",
				"开发商",
				"Developer",
			]) || "";
		const platform =
			getFieldFromInfobox(subjectDetail?.infobox, ["平台", "Platform"]) ||
			item.subject?.platform ||
			"";

		results.push({
			title: item.subject?.name_cn || item.subject?.name || "Unknown",
			status: status,
			rating: rating,
			cover: item.subject?.images?.medium || "/assets/game/default.webp",
			description: description,
			year: year,
			genre: item.subject?.tags
				? item.subject.tags.slice(0, 3).map((t) => t.name)
				: ["Unknown"],
			developer: developer,
			platform: platform,
			link: item.subject?.id
				? `https://bgm.tv/subject/${item.subject.id}`
				: "#",
			progress: progress,
			totalProgress: totalProgress,
		});
	}
	console.log(`\n✓ Completed game ${items.length} items`);
	return results;
}

async function main() {
	console.log("Initializing Bangumi data update script...");

	const animeMode = await getAnimeModeFromConfig();
	const bookMode = await getBookModeFromConfig();
	const gameMode = await getGameModeFromConfig();

	const USER_ID = await getUserIdFromConfig();
	console.log(`Read User ID: ${USER_ID}`);

	const collections = [
		{ type: 3, status: "watching" },
		{ type: 1, status: "planned" },
		{ type: 2, status: "completed" },
		{ type: 4, status: "onhold" },
		{ type: 5, status: "dropped" },
	];

	// ensure output dir
	const outDir = path.join(
		path.dirname(fileURLToPath(import.meta.url)),
		"../src/data",
	);
	try {
		await fs.access(outDir);
	} catch {
		await fs.mkdir(outDir, { recursive: true });
	}

	// 1) Anime
	if (animeMode === "bangumi") {
		console.log("Updating anime collection from Bangumi...");
		let finalAnimeList = [];
		for (const c of collections) {
			const rawData = await fetchCollection(USER_ID, c.type, 2);
			if (rawData.length > 0) {
				const processed = await processData(rawData, c.status);
				finalAnimeList = [...finalAnimeList, ...processed];
			}
		}
		await fs.writeFile(
			OUTPUT_ANIME,
			JSON.stringify(finalAnimeList, null, 2),
		);
		console.log(`\nUpdate complete! Anime saved to: ${OUTPUT_ANIME}`);
		console.log(`Total collected: ${finalAnimeList.length} anime series`);
	} else {
		console.log(`Anime mode is "${animeMode}", skipping anime update.`);
	}

	// 2) Book
	if (bookMode === "bangumi") {
		console.log("Updating book collection from Bangumi...");
		let finalBookList = [];
		for (const c of collections) {
			// subject_type for book: 1 (Bangumi types: 2=anime,4=game,1=book)
			const rawData = await fetchCollection(USER_ID, c.type, 1);
			if (rawData.length > 0) {
				const processed = await processBookData(
					rawData,
					mapBookStatus(c.status),
				);
				finalBookList = [...finalBookList, ...processed];
			}
		}
		await fs.writeFile(OUTPUT_BOOK, JSON.stringify(finalBookList, null, 2));
		console.log(`\nUpdate complete! Books saved to: ${OUTPUT_BOOK}`);
		console.log(`Total collected: ${finalBookList.length} books`);
	} else {
		console.log(`Book mode is "${bookMode}", skipping book update.`);
	}

	// 3) Game
	if (gameMode === "bangumi") {
		console.log("Updating game collection from Bangumi...");
		let finalGameList = [];
		for (const c of collections) {
			// subject_type for game: 4
			const rawData = await fetchCollection(USER_ID, c.type, 4);
			if (rawData.length > 0) {
				const processed = await processGameData(
					rawData,
					mapGameStatus(c.status),
				);
				finalGameList = [...finalGameList, ...processed];
			}
		}
		await fs.writeFile(OUTPUT_GAME, JSON.stringify(finalGameList, null, 2));
		console.log(`\nUpdate complete! Games saved to: ${OUTPUT_GAME}`);
		console.log(`Total collected: ${finalGameList.length} games`);
	} else {
		console.log(`Game mode is "${gameMode}", skipping game update.`);
	}
}

function mapBookStatus(status) {
	// Map anime-like statuses to book-specific ones
	switch (status) {
		case "watching":
			return "reading";
		default:
			return status;
	}
}

function mapGameStatus(status) {
	// Map anime-like statuses to game-specific ones
	switch (status) {
		case "watching":
			return "playing";
		default:
			return status;
	}
}

main().catch((err) => {
	console.error("\n✘ Script execution error:");
	console.error(err);
	process.exit(1);
});
