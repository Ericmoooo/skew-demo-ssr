import Link from "next/link";

const BUILD_LABEL = process.env.NEXT_PUBLIC_BUILD_LABEL ?? "dev";

interface Item {
  id: string;
  // Build A uses 'name', Build B uses 'displayName'. This is the kind of
  // field rename that produces RSC payload drift between builds: the prefetched
  // payload carries old shape, the rendered page expects new shape.
  name?: string;
  displayName?: string;
  category: string;
  price: number;
}

async function getItems(): Promise<Item[]> {
  // Simulate a server-side data fetch. Field shape depends on the build.
  const base = [
    { id: "alpha", category: "Electronics", price: 49.99 },
    { id: "beta", category: "Books", price: 14.5 },
    { id: "gamma", category: "Tools", price: 89.0 },
    { id: "delta", category: "Apparel", price: 29.99 },
  ];

  if (BUILD_LABEL === "B") {
    return base.map((item, i) => ({
      ...item,
      displayName: ["Wireless Headphones", "Design Patterns", "Cordless Drill", "Cotton T-Shirt"][i],
    }));
  }

  return base.map((item, i) => ({
    ...item,
    name: ["Headphones", "Patterns", "Drill", "T-Shirt"][i],
  }));
}

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <>
      <h1>Items</h1>
      <p style={{ color: "#666" }}>
        These items are server-rendered (RSC). Click any item to navigate to its
        detail page (next/link with prefetch). After a redeploy, the prefetched
        RSC payload from the stale build will not match the new build's expected
        shape, producing visible field drift or runtime errors.
      </p>
      <p style={{ background: "#fffbe6", border: "1px solid #ffe58f", padding: "0.75rem", borderRadius: 4 }}>
        <strong>Build {BUILD_LABEL} field convention:</strong>{" "}
        {BUILD_LABEL === "B" ? <code>displayName</code> : <code>name</code>}
      </p>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: 8,
              marginBottom: "0.75rem",
            }}
          >
            <Link
              href={`/items/${item.id}`}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <strong>{item.name ?? item.displayName ?? "(no name field)"}</strong>
              <span style={{ float: "right", color: "#666" }}>${item.price.toFixed(2)}</span>
              <div style={{ color: "#999", fontSize: 14, marginTop: 4 }}>
                {item.category}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
