import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient('https://fhcanpvmtqpvdnkjlziq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoY2FucHZtdHFwdmRua2psemlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY2ODAyNTAsImV4cCI6MTk4MjI1NjI1MH0.vpjLhqtKuYVMtASou7xKIeQd4cwv-Jlh0ESf-kjdofQ');

export async function signInWithGithub() {
	await supabaseClient.auth.signInWithOAuth({
		provider: "github",
	});
}

export default supabaseClient;
