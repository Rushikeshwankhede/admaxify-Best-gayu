
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Handle function invocation
Deno.serve(async (req) => {
  const { user_id } = await req.json();
  
  const supabaseClient = Deno.env.get('SUPABASE_CLIENT_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseClient || !supabaseKey) {
    return new Response(
      JSON.stringify({ error: 'Server configuration error' }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    );
  }

  try {
    const response = await fetch(`${supabaseClient}/auth/v1/admin/users/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(
        JSON.stringify({ error: `Failed to delete user: ${errorData.message || response.statusText}` }),
        { headers: { 'Content-Type': 'application/json' }, status: response.status }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: `Error deleting user: ${error.message}` }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
