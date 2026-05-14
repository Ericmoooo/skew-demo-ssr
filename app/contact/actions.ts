"use server";

const BUILD_LABEL = process.env.NEXT_PUBLIC_BUILD_LABEL ?? "dev";

export interface ContactResult {
  success: boolean;
  message: string;
  build: string;
  // Build A returns 'ticketId', Build B renames to 'caseRef'. Stale form
  // submissions calling this action against the wrong build either 404
  // (because the action id changed) or return a payload the form cannot
  // interpret.
  ticketId?: string;
  caseRef?: string;
}

export async function submitContactForm(
  prevState: ContactResult | null,
  formData: FormData
): Promise<ContactResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return {
      success: false,
      message: "Missing required fields",
      build: BUILD_LABEL,
    };
  }

  // Simulated server-side processing.
  await new Promise((resolve) => setTimeout(resolve, 300));

  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  if (BUILD_LABEL === "B") {
    return {
      success: true,
      message: `Thanks ${name}! Your case has been logged.`,
      build: BUILD_LABEL,
      caseRef: id,
    };
  }

  return {
    success: true,
    message: `Thanks ${name}! We received your message.`,
    build: BUILD_LABEL,
    ticketId: id,
  };
}
