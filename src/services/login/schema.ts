import { z } from 'zod';
import { PASSWORD_SIZE } from '@/utils/contants/auth';

export const loginSchema = z.object({
    email: z
        .string()
        .email({ message: 'It should have a valid email format' }),
    password: z.string().min(PASSWORD_SIZE, {
        message: `Password must be at least ${PASSWORD_SIZE} characters`,
    }),
});
