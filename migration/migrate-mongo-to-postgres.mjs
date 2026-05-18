import { MongoClient } from "mongodb";
import pg from "pg";
import crypto from "node:crypto";

const { Pool } = pg;

process.env.MONGODB_URL="mongodb+srv://deniskatarasenko6:QAcolOohodf9gVMF@cluster0.ruroqdm.mongodb.net/prisma?retryWrites=true&w=majority&appName=Cluster0"
process.env.MONGODB_DB_NAME="prisma"
process.env.POSTGRES_URL="postgresql://nextnative:nextnative@localhost:5432/nextnative_dev?schema=public"

const REQUIRED_ENV = ["MONGODB_URL", "MONGODB_DB_NAME", "POSTGRES_URL"];

function assertEnv() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required env vars: ${missing.join(", ")}`);
  }
}

function mapId(value) {
  if (!value) return crypto.randomUUID();
  const chars = crypto.createHash("sha256").update(String(value)).digest("hex").slice(0, 32).split("");
  chars[12] = "4";
  chars[16] = "a";
  const hex = chars.join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

async function run() {
  console.log(process.env.MONGODB_URL)
  assertEnv();

  const dryRun = process.argv.includes("--dry-run");
  const mongo = new MongoClient(process.env.MONGODB_URL);
  const pgPool = new Pool({ connectionString: process.env.POSTGRES_URL });

  const counts = {
    purchase: 0,
    blogPost: 0,
    globalNumber: 0,
  };

  try {
    await mongo.connect();
    const mongoDb = mongo.db(process.env.MONGODB_DB_NAME);

    const purchases = await mongoDb.collection("Purchase").find({}).toArray();
    const blogPosts = await mongoDb.collection("BlogPost").find({}).toArray();
    const globalNumbers = await mongoDb.collection("GlobalNumber").find({}).toArray();

    counts.purchase = purchases.length;
    counts.blogPost = blogPosts.length;
    counts.globalNumber = globalNumbers.length;

    if (dryRun) {
      console.log("[dry-run] extracted counts:", counts);
      return;
    }

    const client = await pgPool.connect();
    try {
      await client.query("BEGIN");

      for (const doc of purchases) {
        await client.query(
          `INSERT INTO "Purchase" ("id","paymentId","githubUsername","isInvited","email","createdAt","updatedAt")
           VALUES ($1,$2,$3,$4,$5,$6,$7)
           ON CONFLICT ("paymentId") DO UPDATE SET
             "githubUsername" = EXCLUDED."githubUsername",
             "isInvited" = EXCLUDED."isInvited",
             "email" = EXCLUDED."email",
             "updatedAt" = EXCLUDED."updatedAt"`,
          [
            mapId(doc._id),
            doc.paymentId,
            doc.githubUsername ?? null,
            !!doc.isInvited,
            doc.email ?? null,
            doc.createdAt ?? new Date(),
            doc.updatedAt ?? new Date(),
          ]
        );
      }

      for (const doc of blogPosts) {
        await client.query(
          `INSERT INTO "BlogPost" ("id","slug","title","description","contentMarkdown","contentHtml","image","tags","indexed","createdAt","updatedAt")
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
           ON CONFLICT ("slug") DO UPDATE SET
             "title" = EXCLUDED."title",
             "description" = EXCLUDED."description",
             "contentMarkdown" = EXCLUDED."contentMarkdown",
             "contentHtml" = EXCLUDED."contentHtml",
             "image" = EXCLUDED."image",
             "tags" = EXCLUDED."tags",
             "indexed" = EXCLUDED."indexed",
             "updatedAt" = EXCLUDED."updatedAt"`,
          [
            mapId(doc._id),
            doc.slug,
            doc.title,
            doc.description,
            doc.contentMarkdown,
            doc.contentHtml,
            doc.image ?? null,
            Array.isArray(doc.tags) ? doc.tags : [],
            typeof doc.indexed === "boolean" ? doc.indexed : null,
            doc.createdAt ?? new Date(),
            doc.updatedAt ?? new Date(),
          ]
        );
      }

      for (const doc of globalNumbers) {
        await client.query(
          `INSERT INTO "GlobalNumber" ("id","title","value","createdAt","updatedAt")
           VALUES ($1,$2,$3,$4,$5)
           ON CONFLICT ("title") DO UPDATE SET
             "value" = EXCLUDED."value",
             "updatedAt" = EXCLUDED."updatedAt"`,
          [
            mapId(doc._id),
            doc.title,
            Number.isFinite(doc.value) ? doc.value : 0,
            doc.createdAt ?? new Date(),
            doc.updatedAt ?? new Date(),
          ]
        );
      }

      await client.query("COMMIT");
      console.log("Migrated:", counts);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } finally {
    await mongo.close();
    await pgPool.end();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
