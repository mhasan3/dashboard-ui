import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

// Define outside the load function so the adapter can be cached
const schema = z.object({
	name: z.string().default('Hello world!'),
	email: z.email()
});

export const load = async () => {
	const form = await superValidate(zod4(schema));

	// Always return { form } in load functions
	return { form };
};