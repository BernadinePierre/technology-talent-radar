import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NOTIFY_EMAIL = "bernadine.pierrejob@gmail.com";

function escapeCsv(val: string): string {
  if (val.includes('"') || val.includes(",") || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify user
    const authClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await authClient.auth.getUser();
    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const { type, message } = await req.json();
    const userName = user.user_metadata?.display_name || user.user_metadata?.full_name || user.email || user.id;

    // Fetch all feedback with service role (bypasses RLS)
    const adminClient = createClient(supabaseUrl, serviceRoleKey);
    const { data: allFeedback } = await adminClient
      .from("feedback")
      .select("id, type, message, created_at, user_id")
      .order("created_at", { ascending: false });

    // Build CSV
    const csvHeader = "id,type,message,created_at,user_id";
    const csvRows = (allFeedback || []).map((row: any) =>
      [row.id, row.type, escapeCsv(row.message), row.created_at, row.user_id].join(",")
    );
    const csvContent = [csvHeader, ...csvRows].join("\n");
    const csvBase64 = btoa(unescape(encodeURIComponent(csvContent)));

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Feedback on Tech Talent Radar</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr><td style="padding: 8px; font-weight: bold; color: #555;">Type</td><td style="padding: 8px;">${type}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #555;">From</td><td style="padding: 8px;">${userName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #555;">Date</td><td style="padding: 8px;">${new Date().toLocaleString()}</td></tr>
        </table>
        <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-top: 8px;">
          <p style="margin: 0; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="margin-top: 16px; color: #888; font-size: 13px;">A full CSV export of all feedback is attached.</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Tech Talent Radar <onboarding@resend.dev>",
        to: [NOTIFY_EMAIL],
        subject: `[Tech Talent Radar] New ${type} feedback`,
        html: emailHtml,
        attachments: [
          {
            filename: "feedback_export.csv",
            content: csvBase64,
          },
        ],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Resend API error [${res.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending feedback notification:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
