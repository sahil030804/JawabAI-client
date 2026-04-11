import { z } from 'zod';

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (international format)
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

// Login form validation
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(emailRegex, 'Please enter a valid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Signup form validation
export const signupSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(emailRegex, 'Please enter a valid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password cannot be more than 50 characters'),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot be more than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'First name can only contain letters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot be more than 50 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Last name can only contain letters'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(phoneRegex, 'Please enter a valid phone number (e.g.: +919876543210)'),
});

// Email validation for checking email existence
export const emailCheckSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .regex(emailRegex, 'Please enter a valid email'),
});

// Type exports for use in components
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type EmailCheckData = z.infer<typeof emailCheckSchema>;

// Validation functions
export const validateLogin = (data: unknown) => {
  return loginSchema.safeParse(data);
};

export const validateSignup = (data: unknown) => {
  return signupSchema.safeParse(data);
};

export const validateEmail = (data: unknown) => {
  return emailCheckSchema.safeParse(data);
};
